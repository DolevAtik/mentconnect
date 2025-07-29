-- Create user profiles table with extended fields for professional profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  first_name TEXT,
  last_name TEXT,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  cover_image_url TEXT,
  phone TEXT,
  location TEXT,
  website TEXT,
  
  -- Professional fields
  title TEXT,
  company TEXT,
  years_experience INTEGER,
  hourly_rate INTEGER,
  specializations TEXT[],
  languages TEXT[],
  
  -- User type and status
  user_type TEXT CHECK (user_type IN ('mentor', 'student', 'both')) DEFAULT 'student',
  is_verified BOOLEAN DEFAULT FALSE,
  is_available BOOLEAN DEFAULT TRUE,
  
  -- Social links
  linkedin_url TEXT,
  github_url TEXT,
  twitter_url TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles
FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Create reviews table for mentor feedback
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate reviews
  UNIQUE(mentor_id, reviewer_id)
);

-- Enable RLS for reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
ON public.reviews
FOR SELECT
USING (true);

CREATE POLICY "Users can create reviews for mentors"
ON public.reviews
FOR INSERT
WITH CHECK (auth.uid() = reviewer_id AND mentor_id != reviewer_id);

-- Create services table for mentor offerings
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentor_id UUID REFERENCES public.profiles(user_id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL,
  duration_minutes INTEGER,
  category TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Services policies
CREATE POLICY "Services are viewable by everyone"
ON public.services
FOR SELECT
USING (is_active = true);

CREATE POLICY "Mentors can manage their own services"
ON public.services
FOR ALL
USING (auth.uid() = mentor_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON public.services
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create indexes for better performance
CREATE INDEX idx_profiles_user_type ON public.profiles(user_type);
CREATE INDEX idx_profiles_is_available ON public.profiles(is_available);
CREATE INDEX idx_reviews_mentor_id ON public.reviews(mentor_id);
CREATE INDEX idx_services_mentor_id ON public.services(mentor_id);
CREATE INDEX idx_services_category ON public.services(category);