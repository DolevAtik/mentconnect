-- Fix function search_path issues for security
-- Update all functions that need SECURITY DEFINER and SET search_path

-- Update handle_new_user function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, first_name, last_name, display_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'first_name')
  );
  RETURN NEW;
END;
$$;

-- Update update_updated_at_column function  
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Update validate_profile_content function
CREATE OR REPLACE FUNCTION public.validate_profile_content()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
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

-- Update validate_message_content function
CREATE OR REPLACE FUNCTION public.validate_message_content()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
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

-- Update auto_assign_user_role function
CREATE OR REPLACE FUNCTION public.auto_assign_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Insert role based on user_type from profiles, but only if no role exists yet
  IF NOT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = NEW.user_id) THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, NEW.user_type::public.app_role);
  END IF;
  RETURN NEW;
END;
$$;

-- Update check_user_type_update function
CREATE OR REPLACE FUNCTION public.check_user_type_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Allow admins to change user_type
  IF public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RETURN NEW;
  END IF;
  
  -- Prevent regular users from changing their user_type
  IF OLD.user_type IS DISTINCT FROM NEW.user_type THEN
    RAISE EXCEPTION 'Only administrators can change user types';
  END IF;
  
  RETURN NEW;
END;
$$;