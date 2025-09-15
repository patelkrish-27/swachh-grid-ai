'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  variant = 'default',
  className 
}: StatsCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return 'border-success/20 bg-success/5';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      case 'danger':
        return 'border-danger/20 bg-danger/5';
      default:
        return 'border-primary/20 bg-primary/5';
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case 'success':
        return 'text-success bg-success/10';
      case 'warning':
        return 'text-warning bg-warning/10';
      case 'danger':
        return 'text-danger bg-danger/10';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-card animate-fade-in",
      getVariantStyles(),
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground">
              {value}
            </p>
            {change && (
              <div className={cn(
                "flex items-center text-xs",
                change.type === 'increase' ? 'text-success' : 'text-danger'
              )}>
                <span>
                  {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
                </span>
                <span className="ml-1 text-muted-foreground">
                  from last month
                </span>
              </div>
            )}
          </div>
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            getIconStyles()
          )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}