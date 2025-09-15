'use client';

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Home, 
  Trash2, 
  Route, 
  BarChart3, 
  Users, 
  Settings,
  FileText,
  Trophy,
  MapPin,
  CheckSquare,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  Recycle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const adminNavItems = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
  { path: '/admin/bins', label: 'Bin Management', icon: Trash2 },
  { path: '/admin/routes', label: 'Route Optimization', icon: Route },
  { path: '/admin/reports', label: 'Analytics & Reports', icon: BarChart3 },
  { path: '/admin/citizens', label: 'Citizen Issues', icon: Users },
  { path: '/admin/workers', label: 'Worker Management', icon: Settings },
];

const citizenNavItems = [
  { path: '/citizen/dashboard', label: 'Dashboard', icon: Home },
  { path: '/citizen/reports', label: 'My Reports', icon: FileText },
  { path: '/citizen/leaderboard', label: 'Leaderboard', icon: Trophy },
  { path: '/citizen/profile', label: 'Profile', icon: Settings },
];

const workerNavItems = [
  { path: '/worker/dashboard', label: 'Dashboard', icon: Home },
  { path: '/worker/bins', label: 'My Bins', icon: Trash2 },
  { path: '/worker/tasks', label: 'Tasks', icon: CheckSquare },
  { path: '/worker/complaints', label: 'Complaints', icon: MessageSquare },
  { path: '/worker/profile', label: 'Profile', icon: Settings },
];

export function Sidebar() {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  if (!user) return null;

  const getNavItems = () => {
    switch (user.role) {
      case 'admin':
        return adminNavItems;
      case 'citizen':
        return citizenNavItems;
      case 'worker':
        return workerNavItems;
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Recycle className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">SwachhGrid</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center p-3 rounded-lg transition-all duration-200 group",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )
                }
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-colors",
                  collapsed ? "mx-auto" : "mr-3"
                )} />
                {!collapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* User Role Badge */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              user.role === 'admin' && "bg-danger",
              user.role === 'citizen' && "bg-success",
              user.role === 'worker' && "bg-warning"
            )} />
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {user.role}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}