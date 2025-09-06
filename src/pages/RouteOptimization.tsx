import { useState } from "react";
import { 
  Route, 
  MapPin, 
  Truck, 
  Clock,
  Fuel,
  Download,
  Play,
  RotateCcw,
  Target
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RouteOptimization = () => {
  const [startLocation, setStartLocation] = useState("Municipal Depot");
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedRoute, setOptimizedRoute] = useState(null);

  const mockRoute = {
    id: "ROUTE_001",
    totalDistance: "32.4 km",
    estimatedTime: "2h 45m",
    fuelCost: "$45.60",
    emissions: "12.4 kg CO2",
    stops: [
      { id: "DEPOT", name: "Municipal Depot", type: "start", fillLevel: null, eta: "09:00" },
      { id: "BIN001", name: "Main Street & 1st Ave", type: "pickup", fillLevel: 85, eta: "09:15" },
      { id: "BIN005", name: "Bus Terminal", type: "pickup", fillLevel: 90, eta: "09:35" },
      { id: "BIN003", name: "Shopping Mall", type: "pickup", fillLevel: 70, eta: "09:55" },
      { id: "BIN007", name: "Hospital Complex", type: "pickup", fillLevel: 78, eta: "10:20" },
      { id: "LANDFILL", name: "Central Landfill", type: "disposal", fillLevel: null, eta: "11:00" },
      { id: "BIN012", name: "Sports Stadium", type: "pickup", fillLevel: 82, eta: "11:45" },
      { id: "DEPOT", name: "Municipal Depot", type: "end", fillLevel: null, eta: "12:30" }
    ]
  };

  const handleOptimizeRoute = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setOptimizedRoute(mockRoute);
      setIsOptimizing(false);
    }, 2000);
  };

  const getStopIcon = (type: string) => {
    switch (type) {
      case "start":
      case "end":
        return <Target className="w-4 h-4" />;
      case "pickup":
        return <MapPin className="w-4 h-4" />;
      case "disposal":
        return <Truck className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getStopColor = (type: string) => {
    switch (type) {
      case "start":
        return "bg-success";
      case "end":
        return "bg-info";
      case "pickup":
        return "bg-warning";
      case "disposal":
        return "bg-alert";
      default:
        return "bg-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              AI Route Optimization
            </h1>
            <p className="text-muted-foreground">
              Generate optimal collection routes using AI-powered algorithms
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Routes
            </Button>
            <Button size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Route Configuration */}
          <div className="lg:col-span-1">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Route className="w-5 h-5 text-primary" />
                  <span>Route Configuration</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Start Location */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Start Location</label>
                  <Input
                    value={startLocation}
                    onChange={(e) => setStartLocation(e.target.value)}
                    placeholder="Enter starting point"
                  />
                </div>

                {/* Route Parameters */}
                <div className="space-y-4">
                  <h4 className="font-medium">Optimization Parameters</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Priority Fill Level</span>
                      <Badge variant="outline">≥ 70%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Max Route Duration</span>
                      <Badge variant="outline">4 hours</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Truck Capacity</span>
                      <Badge variant="outline">8 tons</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Available Trucks</span>
                      <Badge variant="outline">5 active</Badge>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <Button 
                  onClick={handleOptimizeRoute}
                  disabled={isOptimizing}
                  className="w-full"
                >
                  {isOptimizing ? (
                    <>
                      <RotateCcw className="w-4 h-4 mr-2 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Generate Optimal Route
                    </>
                  )}
                </Button>

                {/* Route Metrics */}
                {optimizedRoute && (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <h4 className="font-medium">Route Metrics</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-accent/20 rounded-lg">
                        <div className="text-lg font-bold text-primary">{mockRoute.totalDistance}</div>
                        <div className="text-xs text-muted-foreground">Total Distance</div>
                      </div>
                      <div className="text-center p-3 bg-accent/20 rounded-lg">
                        <div className="text-lg font-bold text-primary">{mockRoute.estimatedTime}</div>
                        <div className="text-xs text-muted-foreground">Est. Time</div>
                      </div>
                      <div className="text-center p-3 bg-accent/20 rounded-lg">
                        <div className="text-lg font-bold text-success">{mockRoute.fuelCost}</div>
                        <div className="text-xs text-muted-foreground">Fuel Cost</div>
                      </div>
                      <div className="text-center p-3 bg-accent/20 rounded-lg">
                        <div className="text-lg font-bold text-info">{mockRoute.emissions}</div>
                        <div className="text-xs text-muted-foreground">CO2 Saved</div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Route Visualization */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Route Visualization</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="map" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="map">Map View</TabsTrigger>
                    <TabsTrigger value="list">List View</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="map" className="space-y-4">
                    {/* Map Placeholder */}
                    <div className="w-full h-[500px] bg-gradient-to-br from-muted/20 to-accent/20 rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-info/10 via-transparent to-primary/10">
                        {/* Grid Pattern */}
                        <svg className="absolute inset-0 w-full h-full opacity-10">
                          <defs>
                            <pattern id="route-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1"/>
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#route-grid)" />
                        </svg>

                        {optimizedRoute && (
                          <>
                            {/* Route Line */}
                            <svg className="absolute inset-0 w-full h-full">
                              <path
                                d="M 100 100 L 300 150 L 500 200 L 700 250 L 900 300 L 800 400 L 600 450 L 400 400 L 200 350 L 100 300"
                                stroke="hsl(var(--primary))"
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray="5,5"
                                className="animate-pulse-slow"
                              />
                            </svg>

                            {/* Route Stops */}
                            {mockRoute.stops.map((stop, index) => (
                              <div
                                key={stop.id}
                                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                                style={{
                                  left: `${15 + index * 12}%`,
                                  top: `${20 + (index % 3) * 15}%`
                                }}
                              >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${getStopColor(stop.type)} shadow-lg`}>
                                  {getStopIcon(stop.type)}
                                </div>
                                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-card px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap">
                                  <div className="font-medium">{stop.name}</div>
                                  <div className="text-muted-foreground">{stop.eta}</div>
                                </div>
                              </div>
                            ))}
                          </>
                        )}

                        {!optimizedRoute && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <Route className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                              <h3 className="text-lg font-medium mb-2">No Route Generated</h3>
                              <p className="text-muted-foreground">
                                Click "Generate Optimal Route" to see the visualization
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="list" className="space-y-4">
                    {optimizedRoute ? (
                      <div className="space-y-3">
                        {mockRoute.stops.map((stop, index) => (
                          <div key={stop.id} className="flex items-center space-x-4 p-4 bg-accent/20 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${getStopColor(stop.type)}`}>
                                {index + 1}
                              </div>
                              <div className={`w-6 h-6 rounded flex items-center justify-center ${getStopColor(stop.type)}`}>
                                {getStopIcon(stop.type)}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{stop.name}</div>
                              <div className="text-sm text-muted-foreground capitalize">{stop.type}</div>
                            </div>
                            {stop.fillLevel && (
                              <Badge variant="outline">
                                {stop.fillLevel}% full
                              </Badge>
                            )}
                            <div className="text-sm font-medium">
                              {stop.eta}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Route className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Route Generated</h3>
                        <p className="text-muted-foreground">
                          Generate an optimal route to see the step-by-step directions
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimization;