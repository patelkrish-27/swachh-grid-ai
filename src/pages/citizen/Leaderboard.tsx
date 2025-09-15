'use client';

import React from 'react';

export default function Leaderboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Leaderboard</h1>
        <p className="text-muted-foreground">Community rankings and achievements</p>
      </div>

      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Community Leaderboard
        </h2>
        <p className="text-muted-foreground mt-2">
          Rankings, badges, and community features coming soon!
        </p>
      </div>
    </div>
  );
}