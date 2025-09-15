'use client';

import React from 'react';

export default function WorkerBins() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">My Bins</h1>
        <p className="text-muted-foreground">Bins assigned to your region</p>
      </div>

      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Bin Collection System
        </h2>
        <p className="text-muted-foreground mt-2">
          Bin status monitoring and collection workflow coming soon!
        </p>
      </div>
    </div>
  );
}