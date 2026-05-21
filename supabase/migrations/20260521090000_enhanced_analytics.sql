-- Enhanced DSA Launchpad Database Schema
-- This migration adds improved tracking and analytics capabilities

-- Login Activity Log Table for better analytics
CREATE TABLE IF NOT EXISTS public.login_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  logged_in_at timestamptz NOT NULL DEFAULT now(),
  ip_address text,
  user_agent text
);

ALTER TABLE public.login_activity ENABLE ROW LEVEL SECURITY;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_login_activity_user_id ON public.login_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_login_activity_logged_in_at ON public.login_activity(logged_in_at DESC);

-- Session feedback - for each module students can rate
CREATE TABLE IF NOT EXISTS public.module_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  day int NOT NULL CHECK (day BETWEEN 1 AND 25),
  rating int CHECK (rating BETWEEN 1 AND 5),
  feedback_text text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, day)
);

ALTER TABLE public.module_feedback ENABLE ROW LEVEL SECURITY;
CREATE INDEX IF NOT EXISTS idx_module_feedback_user_day ON public.module_feedback(user_id, day);

-- Student metadata for preferences and tracking
CREATE TABLE IF NOT EXISTS public.student_metadata (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  preferred_pace text DEFAULT 'normal', -- 'slow', 'normal', 'fast'
  timezone text DEFAULT 'UTC',
  preferred_language text DEFAULT 'en',
  newsletter_opt_in boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.student_metadata ENABLE ROW LEVEL SECURITY;

-- RLS Policies for login_activity
CREATE POLICY "users_read_own_login_activity" ON public.login_activity 
  FOR SELECT TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "admins_read_all_login_activity" ON public.login_activity 
  FOR SELECT TO authenticated 
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for module_feedback
CREATE POLICY "users_manage_own_feedback" ON public.module_feedback 
  FOR ALL TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "admins_read_all_feedback" ON public.module_feedback 
  FOR SELECT TO authenticated 
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for student_metadata
CREATE POLICY "users_manage_own_metadata" ON public.student_metadata 
  FOR ALL TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "admins_read_all_metadata" ON public.student_metadata 
  FOR SELECT TO authenticated 
  USING (public.has_role(auth.uid(), 'admin'));

-- Function to update student metadata timestamp
CREATE OR REPLACE FUNCTION update_student_metadata_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for student_metadata
DROP TRIGGER IF EXISTS update_student_metadata_updated_at_trigger ON public.student_metadata;
CREATE TRIGGER update_student_metadata_updated_at_trigger
  BEFORE UPDATE ON public.student_metadata
  FOR EACH ROW
  EXECUTE FUNCTION update_student_metadata_updated_at();
