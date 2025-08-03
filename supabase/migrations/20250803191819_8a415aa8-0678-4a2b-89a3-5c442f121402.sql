-- Phase 2: Enhanced Security Features

-- Add input validation functions
CREATE OR REPLACE FUNCTION public.validate_text_length(input_text TEXT, max_length INTEGER)
RETURNS BOOLEAN
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  RETURN input_text IS NULL OR length(input_text) <= max_length;
END;
$$;

-- Add content sanitization function
CREATE OR REPLACE FUNCTION public.sanitize_content(input_text TEXT)
RETURNS TEXT
LANGUAGE plpgsql
IMMUTABLE
AS $$
BEGIN
  IF input_text IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Basic sanitization - remove potential XSS patterns
  input_text := regexp_replace(input_text, '<script[^>]*>.*?</script>', '', 'gi');
  input_text := regexp_replace(input_text, '<iframe[^>]*>.*?</iframe>', '', 'gi');
  input_text := regexp_replace(input_text, 'javascript:', '', 'gi');
  input_text := regexp_replace(input_text, 'on\w+\s*=', '', 'gi');
  
  RETURN input_text;
END;
$$;

-- Add content validation triggers for key tables
CREATE OR REPLACE FUNCTION public.validate_profile_content()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Validate text field lengths
  IF NOT public.validate_text_length(NEW.bio, 1000) THEN
    RAISE EXCEPTION 'Bio exceeds maximum length of 1000 characters';
  END IF;
  
  IF NOT public.validate_text_length(NEW.display_name, 100) THEN
    RAISE EXCEPTION 'Display name exceeds maximum length of 100 characters';
  END IF;
  
  IF NOT public.validate_text_length(NEW.title, 200) THEN
    RAISE EXCEPTION 'Title exceeds maximum length of 200 characters';
  END IF;
  
  -- Sanitize content fields
  NEW.bio := public.sanitize_content(NEW.bio);
  NEW.display_name := public.sanitize_content(NEW.display_name);
  NEW.title := public.sanitize_content(NEW.title);
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_profile_content_trigger
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_profile_content();

-- Add validation for messages
CREATE OR REPLACE FUNCTION public.validate_message_content()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  -- Validate message length
  IF NOT public.validate_text_length(NEW.content, 2000) THEN
    RAISE EXCEPTION 'Message exceeds maximum length of 2000 characters';
  END IF;
  
  -- Sanitize message content
  NEW.content := public.sanitize_content(NEW.content);
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_message_content_trigger
  BEFORE INSERT OR UPDATE ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_message_content();

-- Add rate limiting table for sensitive operations
CREATE TABLE public.rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  operation_type TEXT NOT NULL,
  operation_count INTEGER DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, operation_type, window_start)
);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own rate limits"
ON public.rate_limits
FOR SELECT
USING (auth.uid() = user_id);

-- Rate limiting function
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  _user_id UUID,
  _operation_type TEXT,
  _max_operations INTEGER,
  _window_minutes INTEGER
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_count INTEGER;
  window_start TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Calculate window start time
  window_start := date_trunc('minute', now()) - (_window_minutes || ' minutes')::INTERVAL;
  
  -- Count operations in the current window
  SELECT COALESCE(SUM(operation_count), 0)
  INTO current_count
  FROM public.rate_limits
  WHERE user_id = _user_id
    AND operation_type = _operation_type
    AND window_start >= window_start;
  
  -- Check if limit exceeded
  IF current_count >= _max_operations THEN
    RETURN FALSE;
  END IF;
  
  -- Increment counter
  INSERT INTO public.rate_limits (user_id, operation_type, window_start)
  VALUES (_user_id, _operation_type, date_trunc('minute', now()))
  ON CONFLICT (user_id, operation_type, window_start)
  DO UPDATE SET operation_count = rate_limits.operation_count + 1;
  
  RETURN TRUE;
END;
$$;

-- Add audit log table for security events
CREATE TABLE public.security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  event_type TEXT NOT NULL,
  event_details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only admins can view audit logs"
ON public.security_audit_log
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Function to log security events
CREATE OR REPLACE FUNCTION public.log_security_event(
  _user_id UUID,
  _event_type TEXT,
  _event_details JSONB DEFAULT NULL,
  _ip_address INET DEFAULT NULL,
  _user_agent TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.security_audit_log (user_id, event_type, event_details, ip_address, user_agent)
  VALUES (_user_id, _event_type, _event_details, _ip_address, _user_agent);
END;
$$;