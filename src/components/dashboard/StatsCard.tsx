import { useState, useEffect } from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  change?: number;
  changeLabel?: string;
  variant?: "default" | "alert" | "warning" | "success";
  suffix?: string;
}

const StatsCard = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeLabel,
  variant = "default",
  suffix = ""
}: StatsCardProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (typeof value === "number") {
      const timer = setTimeout(() => setAnimatedValue(value), 100);
      return () => clearTimeout(timer);
    }
  }, [value]);

  const getVariantStyles = () => {
    switch (variant) {
      case "alert":
        return "border-alert/20 bg-alert/5";
      case "warning":
        return "border-warning/20 bg-warning/5";
      case "success":
        return "border-success/20 bg-success/5";
      default:
        return "border-border";
    }
  };

  const getIconStyles = () => {
    switch (variant) {
      case "alert":
        return "text-alert bg-alert/10";
      case "warning":
        return "text-warning bg-warning/10";
      case "success":
        return "text-success bg-success/10";
      default:
        return "text-primary bg-primary/10";
    }
  };

  return (
    <Card className={`glass-card hover-lift ${getVariantStyles()}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-3xl font-bold text-foreground animate-counter">
                {typeof value === "number" ? animatedValue.toLocaleString() : value}
                {suffix}
              </h3>
              {change !== undefined && (
                <span
                  className={`text-sm font-medium ${
                    change >= 0 ? "text-success" : "text-alert"
                  }`}
                >
                  {change >= 0 ? "+" : ""}{change}%
                </span>
              )}
            </div>
            {changeLabel && (
              <p className="text-xs text-muted-foreground mt-1">
                {changeLabel}
              </p>
            )}
          </div>
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getIconStyles()}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;