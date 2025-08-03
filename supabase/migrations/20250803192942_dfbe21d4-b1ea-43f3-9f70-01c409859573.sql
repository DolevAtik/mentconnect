-- Fix remaining function search_path issues for security
-- Update remaining functions that need SECURITY DEFINER and SET search_path

-- Update validate_text_length function to use SECURITY DEFINER and SET search_path
CREATE OR REPLACE FUNCTION public.validate_text_length(input_text text, max_length integer)
RETURNS boolean
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN input_text IS NULL OR length(input_text) <= max_length;
END;
$$;

-- Update sanitize_content function to use SECURITY DEFINER and SET search_path
CREATE OR REPLACE FUNCTION public.sanitize_content(input_text text)
RETURNS text
LANGUAGE plpgsql
IMMUTABLE
SECURITY DEFINER
SET search_path = ''
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

-- Update check_rate_limit function to use SECURITY DEFINER and SET search_path
CREATE OR REPLACE FUNCTION public.check_rate_limit(_user_id uuid, _operation_type text, _max_operations integer, _window_minutes integer)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
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

-- Update log_security_event function to use SECURITY DEFINER and SET search_path
CREATE OR REPLACE FUNCTION public.log_security_event(_user_id uuid, _event_type text, _event_details jsonb DEFAULT NULL::jsonb, _ip_address inet DEFAULT NULL::inet, _user_agent text DEFAULT NULL::text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.security_audit_log (user_id, event_type, event_details, ip_address, user_agent)
  VALUES (_user_id, _event_type, _event_details, _ip_address, _user_agent);
END;
$$;