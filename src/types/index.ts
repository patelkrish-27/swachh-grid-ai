export interface User {
  id: string;
  email: string;
  role: 'admin' | 'citizen' | 'worker';
  created_at: string;
}

export interface Citizen {
  id: string;
  name: string;
  phone?: string;
  area?: string;
  points: number;
  reports_submitted: number;
  issues_resolved: number;
  avatar_url?: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
  created_at: string;
  updated_at: string;
}

export interface Worker {
  id: string;
  worker_id: string;
  name: string;
  assigned_region: string;
  contact?: string;
  status: 'active' | 'inactive';
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Bin {
  id: string;
  bin_id: string;
  location: string;
  region: string;
  lat?: number;
  lng?: number;
  fill_level: number;
  battery: number;
  temperature?: number;
  waste_type: 'Wet' | 'Dry' | 'Mixed' | 'Hazardous';
  status: 'Normal' | 'Warning' | 'Critical' | 'Collected';
  last_updated: string;
  created_at: string;
}

export interface Report {
  id: string;
  tracking_id: string;
  citizen_id?: string;
  type: 'BIN_OVERFLOW' | 'DAMAGED_BIN' | 'MISSING_BIN' | 'PUBLIC_LITTERING' | 'OTHER';
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED';
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  description?: string;
  location: string;
  lat?: number;
  lng?: number;
  photo_urls?: string[];
  points_awarded: number;
  created_at: string;
  resolved_at?: string;
  resolved_by?: string;
}

export interface UrgentTask {
  id: string;
  task_id: string;
  worker_id?: string;
  bin_id?: string;
  description: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  lat?: number;
  lng?: number;
  created_by?: string;
  created_at: string;
  completed_at?: string;
}

export interface Alert {
  id: string;
  bin_id?: string;
  alert_type: string;
  message: string;
  status: 'ACTIVE' | 'RESOLVED';
  created_at: string;
  resolved_at?: string;
}

export interface Route {
  id: string;
  region: string;
  route_data: any;
  optimization_method?: string;
  created_at: string;
}

export interface LeaderboardEntry {
  name: string;
  area?: string;
  points: number;
  reports_submitted: number;
  issues_resolved: number;
  rank: number;
}

export interface DashboardStats {
  totalBins: number;
  averageFillLevel: number;
  activeAlerts: number;
  routeEfficiency: number;
}

export interface AuthContextType {
  user: User | null;
  citizen: Citizen | null;
  worker: Worker | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (email: string, password: string, role: string, additionalData?: any) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error?: string }>;
}

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: 'bin' | 'task' | 'complaint' | 'worker';
  data: any;
}