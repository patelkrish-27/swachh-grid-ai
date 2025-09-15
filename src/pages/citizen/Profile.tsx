'use client';

import React from 'react';

export default function CitizenProfile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Profile Management
        </h2>
        <p className="text-muted-foreground mt-2">
          Profile editing and preferences coming soon!
        </p>
      </div>
    </div>
  );
}