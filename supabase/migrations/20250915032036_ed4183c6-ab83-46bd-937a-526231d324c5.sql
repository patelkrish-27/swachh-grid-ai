-- Create users table with role-based access
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT CHECK (role IN ('admin', 'citizen', 'worker')) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create citizens profile table
CREATE TABLE public.citizens (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  area TEXT,
  points INTEGER DEFAULT 0,
  reports_submitted INTEGER DEFAULT 0,
  issues_resolved INTEGER DEFAULT 0,
  avatar_url TEXT,
  preferences JSONB DEFAULT '{"theme": "light", "notifications": true}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workers table
CREATE TABLE public.workers (
  id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
  worker_id TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  assigned_region TEXT NOT NULL,
  contact TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bins table
CREATE TABLE public.bins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bin_id TEXT UNIQUE NOT NULL,
  location TEXT NOT NULL,
  region TEXT NOT NULL,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  fill_level INTEGER DEFAULT 0 CHECK (fill_level >= 0 AND fill_level <= 100),
  battery INTEGER DEFAULT 100 CHECK (battery >= 0 AND battery <= 100),
  temperature DECIMAL(5, 2),
  waste_type TEXT CHECK (waste_type IN ('Wet', 'Dry', 'Mixed', 'Hazardous')) DEFAULT 'Mixed',
  status TEXT DEFAULT 'Normal' CHECK (status IN ('Normal', 'Warning', 'Critical', 'Collected')),
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create reports table
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id TEXT UNIQUE NOT NULL,
  citizen_id UUID REFERENCES public.citizens(id),
  type TEXT CHECK (type IN ('BIN_OVERFLOW', 'DAMAGED_BIN', 'MISSING_BIN', 'PUBLIC_LITTERING', 'OTHER')) NOT NULL,
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'RESOLVED')),
  severity TEXT CHECK (severity IN ('LOW', 'MEDIUM', 'HIGH')) NOT NULL,
  description TEXT,
  location TEXT NOT NULL,
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  photo_urls TEXT[],
  points_awarded INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE,
  resolved_by UUID REFERENCES public.workers(id)
);

-- Create urgent_tasks table
CREATE TABLE public.urgent_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id TEXT UNIQUE NOT NULL,
  worker_id UUID REFERENCES public.workers(id),
  bin_id UUID REFERENCES public.bins(id),
  description TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH')) DEFAULT 'MEDIUM',
  status TEXT DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'DONE')),
  lat DECIMAL(10, 8),
  lng DECIMAL(11, 8),
  created_by UUID REFERENCES public.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Create alerts table
CREATE TABLE public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bin_id UUID REFERENCES public.bins(id),
  alert_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'ACTIVE' CHECK (status IN ('ACTIVE', 'RESOLVED')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Create routes table
CREATE TABLE public.routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  region TEXT NOT NULL,
  route_data JSONB NOT NULL,
  optimization_method TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leaderboard view
CREATE VIEW public.leaderboard AS
SELECT 
  c.name,
  c.area,
  c.points,
  c.reports_submitted,
  c.issues_resolved,
  RANK() OVER (ORDER BY c.points DESC) as rank
FROM public.citizens c
ORDER BY c.points DESC;

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.citizens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.urgent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;

-- Create security definer function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_id UUID)
RETURNS TEXT
LANGUAGE SQL
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.users WHERE id = user_id;
$$;

-- RLS Policies for users table
CREATE POLICY "Users can view their own record" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own record" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for citizens table
CREATE POLICY "Citizens can view their own profile" ON public.citizens
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Citizens can update their own profile" ON public.citizens
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all citizen profiles" ON public.citizens
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Citizens can create their own profile" ON public.citizens
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for workers table
CREATE POLICY "Workers can view their own profile" ON public.workers
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can manage all workers" ON public.workers
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for bins table
CREATE POLICY "All authenticated users can view bins" ON public.bins
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage bins" ON public.bins
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Workers can update bins in their region" ON public.bins
  FOR UPDATE USING (
    public.get_user_role(auth.uid()) = 'worker' AND 
    region IN (SELECT assigned_region FROM public.workers WHERE id = auth.uid())
  );

-- RLS Policies for reports table
CREATE POLICY "Citizens can view their own reports" ON public.reports
  FOR SELECT USING (citizen_id = auth.uid());

CREATE POLICY "Citizens can create reports" ON public.reports
  FOR INSERT WITH CHECK (citizen_id = auth.uid());

CREATE POLICY "Admins can view all reports" ON public.reports
  FOR SELECT USING (public.get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Workers can view and update reports" ON public.reports
  FOR ALL USING (public.get_user_role(auth.uid()) IN ('admin', 'worker'));

-- RLS Policies for urgent_tasks table
CREATE POLICY "Workers can view their assigned tasks" ON public.urgent_tasks
  FOR SELECT USING (worker_id = auth.uid());

CREATE POLICY "Workers can update their assigned tasks" ON public.urgent_tasks
  FOR UPDATE USING (worker_id = auth.uid());

CREATE POLICY "Admins can manage all tasks" ON public.urgent_tasks
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for alerts table
CREATE POLICY "All authenticated users can view alerts" ON public.alerts
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage alerts" ON public.alerts
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- RLS Policies for routes table
CREATE POLICY "All authenticated users can view routes" ON public.routes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage routes" ON public.routes
  FOR ALL USING (public.get_user_role(auth.uid()) = 'admin');

-- Function to generate tracking IDs
CREATE OR REPLACE FUNCTION public.generate_tracking_id()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN 'SG' || UPPER(SUBSTRING(gen_random_uuid()::text FROM 1 FOR 8));
END;
$$;

-- Function to generate task IDs
CREATE OR REPLACE FUNCTION public.generate_task_id()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN 'TASK' || UPPER(SUBSTRING(gen_random_uuid()::text FROM 1 FOR 6));
END;
$$;

-- Trigger to auto-generate tracking ID for reports
CREATE OR REPLACE FUNCTION public.set_tracking_id()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.tracking_id IS NULL THEN
    NEW.tracking_id := public.generate_tracking_id();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_tracking_id_trigger
  BEFORE INSERT ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.set_tracking_id();

-- Trigger to auto-generate task ID for urgent_tasks
CREATE OR REPLACE FUNCTION public.set_task_id()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.task_id IS NULL THEN
    NEW.task_id := public.generate_task_id();
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_task_id_trigger
  BEFORE INSERT ON public.urgent_tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.set_task_id();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers
CREATE TRIGGER update_citizens_updated_at
  BEFORE UPDATE ON public.citizens
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_workers_updated_at
  BEFORE UPDATE ON public.workers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update citizen points and stats when report is resolved
CREATE OR REPLACE FUNCTION public.update_citizen_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
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

CREATE TRIGGER update_citizen_stats_trigger
  AFTER UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.update_citizen_stats();

-- Function to auto-update reports_submitted when new report is created
CREATE OR REPLACE FUNCTION public.increment_reports_submitted()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE public.citizens 
  SET reports_submitted = reports_submitted + 1
  WHERE id = NEW.citizen_id;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER increment_reports_submitted_trigger
  AFTER INSERT ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.increment_reports_submitted();