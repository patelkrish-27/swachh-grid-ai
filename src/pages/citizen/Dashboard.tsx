'use client';

import React from 'react';
import { StatsCard } from '@/components/shared/StatsCard';
import { Trophy, FileText, CheckCircle } from 'lucide-react';

export default function CitizenDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Citizen Dashboard</h1>
        <p className="text-muted-foreground">Your impact on making the city cleaner</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Points Earned"
          value="1,250"
          icon={Trophy}
          variant="success"
        />
        <StatsCard
          title="Reports Submitted"
          value="45"
          icon={FileText}
          variant="default"
        />
        <StatsCard
          title="Issues Resolved"
          value="38"
          icon={CheckCircle}
          variant="success"
        />
      </div>

      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Citizen Portal
        </h2>
        <p className="text-muted-foreground mt-2">
          Report submission, tracking, and gamification features coming soon!
        </p>
      </div>
    </div>
  );
}