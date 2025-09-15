-- Fix security issues by setting proper search_path for all functions

-- Fix generate_tracking_id function
CREATE OR REPLACE FUNCTION public.generate_tracking_id()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN 'SG' || UPPER(SUBSTRING(gen_random_uuid()::text FROM 1 FOR 8));
END;
$$;

-- Fix generate_task_id function
CREATE OR REPLACE FUNCTION public.generate_task_id()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN 'TASK' || UPPER(SUBSTRING(gen_random_uuid()::text FROM 1 FOR 6));
END;
$$;

-- Fix set_tracking_id function
CREATE OR REPLACE FUNCTION public.set_tracking_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.tracking_id IS NULL THEN
    NEW.tracking_id := public.generate_tracking_id();
  END IF;
  RETURN NEW;
END;
$$;

-- Fix set_task_id function
CREATE OR REPLACE FUNCTION public.set_task_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.task_id IS NULL THEN
    NEW.task_id := public.generate_task_id();
  END IF;
  RETURN NEW;
END;
$$;

-- Fix update_updated_at_column function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix update_citizen_stats function
CREATE OR REPLACE FUNCTION public.update_citizen_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If report status changed to RESOLVED and points not already awarded
  IF OLD.status != 'RESOLVED' AND NEW.status = 'RESOLVED' AND NEW.points_awarded > 0 THEN
    UPDATE public.citizens 
    SET 
      points = points + NEW.points_awarded,
      issues_resolved = issues_resolved + 1
    WHERE id = NEW.citizen_id;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Fix increment_reports_submitted function
CREATE OR REPLACE FUNCTION public.increment_reports_submitted()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.citizens 
  SET reports_submitted = reports_submitted + 1
  WHERE id = NEW.citizen_id;
  
  RETURN NEW;
END;
$$;

-- Replace the leaderboard view to fix security definer issue
DROP VIEW IF EXISTS public.leaderboard;

-- Create a function instead of a view to avoid security definer issues
CREATE OR REPLACE FUNCTION public.get_leaderboard()
RETURNS TABLE (
  name TEXT,
  area TEXT,
  points INTEGER,
  reports_submitted INTEGER,
  issues_resolved INTEGER,
  rank BIGINT
)
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    c.name,
    c.area,
    c.points,
    c.reports_submitted,
    c.issues_resolved,
    RANK() OVER (ORDER BY c.points DESC) as rank
  FROM public.citizens c
  ORDER BY c.points DESC;
$$;