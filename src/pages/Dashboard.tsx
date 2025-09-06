import { useState } from "react";
import { 
  Trash2, 
  AlertTriangle, 
  TrendingUp, 
  MapPin,
  Activity,
  Users,
  Truck,
  BarChart3
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import MapComponent from "@/components/dashboard/MapComponent";
import AlertsSidebar from "@/components/dashboard/AlertsSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [alertsCollapsed, setAlertsCollapsed] = useState(false);

  const statsData = [
    {
      title: "Total Smart Bins",
      value: 1248,
      icon: Trash2,
      change: 3.2,
      changeLabel: "vs last month",
      variant: "default" as const
    },
    {
      title: "Bins Over 80% Full", 
      value: 23,
      icon: AlertTriangle,
      change: -12.5,
      changeLabel: "vs yesterday",
      variant: "alert" as const
    },
    {
      title: "Collection Efficiency",
      value: "94.2",
      suffix: "%",
      icon: TrendingUp,
      change: 5.3,
      changeLabel: "vs last week", 
      variant: "success" as const
    },
    {
      title: "Active Trucks",
      value: 28,
      icon: Truck,
      change: 0,
      changeLabel: "all operational",
      variant: "default" as const
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Collection completed",
      location: "Zone A - Downtown",
      time: "5 min ago",
      type: "success"
    },
    {
      id: 2,
      action: "High fill level alert",
      location: "BIN001 - Main Street",
      time: "12 min ago", 
      type: "warning"
    },
    {
      id: 3,
      action: "Route optimized",
      location: "Zone C - Residential",
      time: "25 min ago",
      type: "info"
    },
    {
      id: 4,
      action: "Citizen report received",
      location: "Park Avenue",
      time: "1 hour ago",
      type: "info"
    }
  ];

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className={`container mx-auto px-4 transition-all duration-300 ${
        alertsCollapsed ? "mr-0" : "mr-80"
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Smart Waste Management Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time monitoring and AI-powered insights for efficient waste collection
            </p>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
            <Button size="sm">
              <Activity className="w-4 h-4 mr-2" />
              Live Data
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Live Bin Status Map</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Full Screen
                    </Button>
                    <Button variant="ghost" size="sm">
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <MapComponent />
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === "success" ? "bg-success" :
                        activity.type === "warning" ? "bg-warning" : "bg-info"
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.location}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Optimize Routes</h3>
              <p className="text-sm text-muted-foreground">
                Generate AI-powered optimal collection routes
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-success/10 text-success rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Citizen Reports</h3>
              <p className="text-sm text-muted-foreground">
                View and manage community waste reports
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-info/10 text-info rounded-xl flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Analytics Hub</h3>
              <p className="text-sm text-muted-foreground">
                Access detailed reports and insights
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alerts Sidebar */}
      <AlertsSidebar 
        isCollapsed={alertsCollapsed}
        onToggle={() => setAlertsCollapsed(!alertsCollapsed)}
      />
    </div>
  );
};

export default Dashboard;