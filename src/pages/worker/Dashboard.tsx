'use client';

import React from 'react';
import { StatsCard } from '@/components/shared/StatsCard';
import { Trash2, CheckSquare, MessageSquare, MapPin } from 'lucide-react';

export default function WorkerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Worker Dashboard</h1>
        <p className="text-muted-foreground">Your daily tasks and assigned region</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Assigned Bins"
          value="45"
          icon={Trash2}
          variant="default"
        />
        <StatsCard
          title="Urgent Tasks"
          value="3"
          icon={CheckSquare}
          variant="warning"
        />
        <StatsCard
          title="Pending Complaints"
          value="7"
          icon={MessageSquare}
          variant="danger"
        />
        <StatsCard
          title="Today's Collections"
          value="12"
          icon={MapPin}
          variant="success"
        />
      </div>

      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Worker Management Portal
        </h2>
        <p className="text-muted-foreground mt-2">
          Task management and route optimization coming soon!
        </p>
      </div>
    </div>
  );
}