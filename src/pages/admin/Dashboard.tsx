'use client';

import React from 'react';
import { StatsCard } from '@/components/shared/StatsCard';
import { Trash2, AlertTriangle, TrendingUp, MapPin } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of the waste management system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Bins"
          value="1,234"
          icon={Trash2}
          variant="default"
          change={{ value: 5, type: 'increase' }}
        />
        <StatsCard
          title="Average Fill Level"
          value="67%"
          icon={TrendingUp}
          variant="warning"
          change={{ value: 2, type: 'increase' }}
        />
        <StatsCard
          title="Active Alerts"
          value="23"
          icon={AlertTriangle}
          variant="danger"
          change={{ value: 8, type: 'decrease' }}
        />
        <StatsCard
          title="Route Efficiency"
          value="89%"
          icon={MapPin}
          variant="success"
          change={{ value: 12, type: 'increase' }}
        />
      </div>

      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-muted-foreground">
          SwachhGrid Admin Dashboard
        </h2>
        <p className="text-muted-foreground mt-2">
          Complete implementation with maps, charts, and real-time data coming soon!
        </p>
      </div>
    </div>
  );
}