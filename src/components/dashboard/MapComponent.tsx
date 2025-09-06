import { useState } from "react";
import { MapPin, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock bin data
const mockBins = [
  {
    id: "BIN001",
    location: "Main Street & 1st Ave",
    fillLevel: 85,
    status: "critical",
    lastUpdated: "2 min ago",
    position: { top: "20%", left: "30%" }
  },
  {
    id: "BIN002", 
    location: "City Park East",
    fillLevel: 45,
    status: "normal",
    lastUpdated: "5 min ago",
    position: { top: "40%", left: "60%" }
  },
  {
    id: "BIN003",
    location: "Shopping Mall",
    fillLevel: 70,
    status: "warning", 
    lastUpdated: "1 min ago",
    position: { top: "60%", left: "25%" }
  },
  {
    id: "BIN004",
    location: "University Campus",
    fillLevel: 20,
    status: "normal",
    lastUpdated: "3 min ago", 
    position: { top: "30%", left: "75%" }
  },
  {
    id: "BIN005",
    location: "Bus Terminal",
    fillLevel: 90,
    status: "critical",
    lastUpdated: "1 min ago",
    position: { top: "70%", left: "50%" }
  }
];

const MapComponent = () => {
  const [selectedBin, setSelectedBin] = useState<string | null>(null);
  const [quickInfoBin, setQuickInfoBin] = useState<typeof mockBins[0] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-alert";
      case "warning":
        return "bg-warning";
      case "normal":
        return "bg-success";
      default:
        return "bg-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return AlertTriangle;
      case "warning":
        return Clock;
      case "normal":
        return CheckCircle;
      default:
        return MapPin;
    }
  };

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-muted/20 to-accent/20 rounded-lg overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-info/10 via-transparent to-primary/10">
        <div className="w-full h-full relative">
          {/* Grid Pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Bin Markers */}
          {mockBins.map((bin) => {
            const StatusIcon = getStatusIcon(bin.status);
            return (
              <div
                key={bin.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={bin.position}
                onClick={() => setQuickInfoBin(bin)}
              >
                <div
                  className={`map-pin ${
                    bin.status === "critical"
                      ? "map-pin-high"
                      : bin.status === "warning"
                      ? "map-pin-medium"
                      : "map-pin-low"
                  }`}
                >
                  {bin.fillLevel}%
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-xs bg-card px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                  {bin.location}
                </div>
              </div>
            );
          })}

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
            <h4 className="font-semibold text-sm mb-3">Status Legend</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-alert"></div>
                <span>Critical (&gt;80%)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <span>Warning (60-80%)</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span>Normal (&lt;60%)</span>
              </div>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button size="sm" variant="secondary">
              Zoom In
            </Button>
            <Button size="sm" variant="secondary">
              Zoom Out
            </Button>
            <Button size="sm" variant="outline">
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Info Modal */}
      {quickInfoBin && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <Card className="w-96 glass-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Bin Details</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setQuickInfoBin(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{quickInfoBin.id}</span>
                    <Badge className={
                      quickInfoBin.status === "critical" ? "status-high" :
                      quickInfoBin.status === "warning" ? "status-medium" : "status-low"
                    }>
                      {quickInfoBin.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{quickInfoBin.location}</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Fill Level</span>
                    <span className="font-medium">{quickInfoBin.fillLevel}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getStatusColor(quickInfoBin.status)}`}
                      style={{ width: `${quickInfoBin.fillLevel}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Last Updated:</span>
                  <span>{quickInfoBin.lastUpdated}</span>
                </div>

                <div className="flex space-x-2 pt-2">
                  <Button className="flex-1" size="sm">
                    Schedule Collection
                  </Button>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MapComponent;