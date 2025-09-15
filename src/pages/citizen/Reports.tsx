'use client';

import React from 'react';

export default function CitizenReports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Reports</h1>
        <p className="text-muted-foreground">Track your submitted reports and their status</p>
      </div>

      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Report Tracking System
        </h2>
        <p className="text-muted-foreground mt-2">
          Report history and status tracking coming soon!
        </p>
      </div>
    </div>
  );
}