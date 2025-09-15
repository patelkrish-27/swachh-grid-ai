'use client';

import React from 'react';

export default function WorkerTasks() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
        <p className="text-muted-foreground">Urgent tasks assigned by admin</p>
      </div>

      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-muted-foreground">
          Task Management System
        </h2>
        <p className="text-muted-foreground mt-2">
          Task tracking and completion workflow coming soon!
        </p>
      </div>
    </div>
  );
}