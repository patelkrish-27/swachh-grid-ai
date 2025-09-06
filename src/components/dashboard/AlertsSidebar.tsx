import { useState } from "react";
import { 
  AlertTriangle, 
  Clock, 
  MapPin, 
  X, 
  CheckCircle,
  Truck,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockAlerts = [
  {
    id: "ALT001",
    type: "critical",
    title: "Bin Overflow",
    description: "BIN001 at Main Street has reached 95% capacity",
    location: "Main Street & 1st Ave",
    time: "2 min ago",
    binId: "BIN001"
  },
  {
    id: "ALT002", 
    type: "warning",
    title: "Collection Overdue",
    description: "BIN005 scheduled collection was missed",
    location: "Bus Terminal",
    time: "15 min ago",
    binId: "BIN005"
  },
  {
    id: "ALT003",
    type: "info",
    title: "Route Optimization",
    description: "New optimal route available for Zone A",
    location: "Zone A",
    time: "1 hour ago",
    binId: null
  },
  {
    id: "ALT004",
    type: "critical",
    title: "Sensor Malfunction",
    description: "BIN007 sensor not responding for 30 minutes",
    location: "Library Square",
    time: "30 min ago", 
    binId: "BIN007"
  },
  {
    id: "ALT005",
    type: "warning",
    title: "High Fill Rate",
    description: "BIN003 filling faster than usual",
    location: "Shopping Mall",
    time: "45 min ago",
    binId: "BIN003"
  }
];

interface AlertsSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const AlertsSidebar = ({ isCollapsed, onToggle }: AlertsSidebarProps) => {
  const [alerts, setAlerts] = useState(mockAlerts);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return AlertTriangle;
      case "warning":
        return Clock;
      case "info":
        return CheckCircle;
      default:
        return AlertTriangle;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "status-high";
      case "warning":
        return "status-medium";
      case "info":
        return "status-info";
      default:
        return "status-high";
    }
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(alerts.filter(alert => alert.id !== alertId));
  };

  const assignTruck = (alertId: string) => {
    // Handle truck assignment logic
    console.log("Assigning truck to alert:", alertId);
  };

  if (isCollapsed) {
    return (
      <div className="fixed right-0 top-20 z-40">
        <Button
          onClick={onToggle}
          size="sm"
          className="rounded-l-lg rounded-r-none"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed right-0 top-16 h-[calc(100vh-4rem)] w-80 bg-card/90 backdrop-blur-lg border-l border-border z-40">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">Active Alerts</h3>
            <Badge variant="destructive" className="text-xs">
              {alerts.length}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {alerts.map((alert) => {
              const AlertIcon = getAlertIcon(alert.type);
              
              return (
                <Card 
                  key={alert.id} 
                  className="glass-card hover-lift cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getAlertColor(alert.type)}`}>
                        <AlertIcon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-sm truncate">
                            {alert.title}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {alert.time}
                          </span>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                          {alert.description}
                        </p>
                        
                        <div className="flex items-center space-x-1 mb-3">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {alert.location}
                          </span>
                        </div>

                        <div className="flex space-x-2">
                          {alert.binId && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs h-6 px-2"
                              onClick={() => assignTruck(alert.id)}
                            >
                              <Truck className="w-3 h-3 mr-1" />
                              Assign
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs h-6 px-2"
                            onClick={() => resolveAlert(alert.id)}
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Resolve
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {alerts.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-success mx-auto mb-3" />
              <h4 className="font-medium mb-1">All Clear!</h4>
              <p className="text-sm text-muted-foreground">
                No active alerts at the moment
              </p>
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};

export default AlertsSidebar;