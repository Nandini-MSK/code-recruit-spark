
-- Create enum types for interview management
CREATE TYPE interview_status AS ENUM ('scheduled', 'active', 'completed', 'cancelled');
CREATE TYPE interview_type AS ENUM ('technical', 'behavioral', 'mixed');
CREATE TYPE difficulty_level AS ENUM ('easy', 'medium', 'hard');
CREATE TYPE ai_assistance_level AS ENUM ('none', 'basic', 'advanced');

-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  email TEXT,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'candidate',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  PRIMARY KEY (id)
);

-- Create candidates table
CREATE TABLE public.candidates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  avatar_url TEXT,
  skills TEXT[],
  experience_years INTEGER,
  resume_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create problems table
CREATE TABLE public.problems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  difficulty difficulty_level NOT NULL,
  tags TEXT[],
  constraints TEXT,
  sample_input TEXT,
  sample_output TEXT,
  test_cases JSONB,
  created_by UUID REFERENCES auth.users,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interviews table
CREATE TABLE public.interviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recruiter_id UUID REFERENCES auth.users NOT NULL,
  candidate_id UUID REFERENCES public.candidates NOT NULL,
  position_title TEXT NOT NULL,
  interview_type interview_type NOT NULL,
  status interview_status NOT NULL DEFAULT 'scheduled',
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  meeting_url TEXT,
  recording_enabled BOOLEAN DEFAULT false,
  screen_sharing_enabled BOOLEAN DEFAULT true,
  ai_assistance_level ai_assistance_level DEFAULT 'basic',
  notes TEXT,
  feedback JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create interview_problems junction table
CREATE TABLE public.interview_problems (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  interview_id UUID REFERENCES public.interviews ON DELETE CASCADE,
  problem_id UUID REFERENCES public.problems ON DELETE CASCADE,
  order_index INTEGER NOT NULL DEFAULT 0
);

-- Create interview_submissions table
CREATE TABLE public.interview_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  interview_id UUID REFERENCES public.interviews ON DELETE CASCADE,
  problem_id UUID REFERENCES public.problems ON DELETE CASCADE,
  code TEXT NOT NULL,
  language TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  execution_result JSONB,
  version INTEGER NOT NULL DEFAULT 1
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
  
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for candidates (recruiters can view all)
CREATE POLICY "Recruiters can view all candidates" ON public.candidates
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'recruiter'
    )
  );

CREATE POLICY "Recruiters can manage candidates" ON public.candidates
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'recruiter'
    )
  );

-- RLS Policies for problems
CREATE POLICY "Authenticated users can view problems" ON public.problems
  FOR SELECT TO authenticated;

CREATE POLICY "Recruiters can manage problems" ON public.problems
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'recruiter'
    )
  );

-- RLS Policies for interviews
CREATE POLICY "Recruiters can view their interviews" ON public.interviews
  FOR SELECT USING (recruiter_id = auth.uid());

CREATE POLICY "Recruiters can manage their interviews" ON public.interviews
  FOR ALL USING (recruiter_id = auth.uid());

-- RLS Policies for interview_problems
CREATE POLICY "Access interview_problems through interviews" ON public.interview_problems
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.interviews 
      WHERE id = interview_id AND recruiter_id = auth.uid()
    )
  );

-- RLS Policies for interview_submissions
CREATE POLICY "Access submissions through interviews" ON public.interview_submissions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.interviews 
      WHERE id = interview_id AND recruiter_id = auth.uid()
    )
  );

-- Create function to handle new user profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, role)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    COALESCE(new.raw_user_meta_data ->> 'role', 'candidate')
  );
  RETURN new;
END;
$$;

-- Create trigger for new user profiles
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample data
INSERT INTO public.candidates (email, first_name, last_name, skills, experience_years) VALUES
('john.doe@email.com', 'John', 'Doe', ARRAY['JavaScript', 'React', 'Node.js'], 3),
('jane.smith@email.com', 'Jane', 'Smith', ARRAY['Python', 'Django', 'PostgreSQL'], 5),
('mike.wilson@email.com', 'Mike', 'Wilson', ARRAY['Java', 'Spring Boot', 'Microservices'], 7);

INSERT INTO public.problems (title, description, difficulty, tags, constraints, sample_input, sample_output) VALUES
('Two Sum', 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.', 'easy', ARRAY['Array', 'Hash Table'], 'nums.length >= 2', '[2,7,11,15], target = 9', '[0,1]'),
('Valid Parentheses', 'Given a string s containing just the characters ''('', '')'', ''{'', ''}'', ''['' and '']'', determine if the input string is valid.', 'easy', ARRAY['String', 'Stack'], 's.length <= 10^4', '()[]{}', 'true'),
('Longest Substring Without Repeating Characters', 'Given a string s, find the length of the longest substring without repeating characters.', 'medium', ARRAY['String', 'Sliding Window'], 's.length <= 5 * 10^4', 'abcabcbb', '3');
