import { useState, useEffect } from "react";
import { 
  Route, 
  MapPin, 
  Truck, 
  Clock,
  Fuel,
  Download,
  Play,
  RotateCcw,
  Target,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GoogleMap from "@/components/maps/GoogleMap";
import { vadodaraRoutesData, generateRealTimeData, Stop } from "@/data/vadodaraRoutes";
import { formatDistanceToNow } from "date-fns";

const RouteOptimization = () => {
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [routeData, setRouteData] = useState(vadodaraRoutesData);
  const [optimizedStops, setOptimizedStops] = useState<Stop[]>([]);
  const [isRealTimeMode, setIsRealTimeMode] = useState(false);

  // Get current stops based on selected area
  const getCurrentStops = () => {
    if (selectedArea === "All Areas") {
      return routeData.flatMap(route => route.stops);
    }
    const route = routeData.find(r => r.area === selectedArea);
    return route ? route.stops : [];
  };

  // Real-time data simulation
  useEffect(() => {
    if (isRealTimeMode) {
      const interval = setInterval(() => {
        setRouteData(generateRealTimeData());
      }, 5000); // Update every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isRealTimeMode]);

  const handleOptimizeRoute = (stops: Stop[]) => {
    setOptimizedStops(stops);
  };

  const toggleRealTimeMode = () => {
    setIsRealTimeMode(!isRealTimeMode);
    if (!isRealTimeMode) {
      setRouteData(generateRealTimeData());
    }
  };

  const currentStops = getCurrentStops();
  const eligibleStops = currentStops.filter(stop => (stop.fillLevel || 0) >= 50);
  
  const routeMetrics = {
    totalDistance: "28.6 km",
    estimatedTime: "2h 15m", 
    fuelCost: "$38.20",
    emissions: "10.2 kg CO2"
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
            <Button 
              onClick={toggleRealTimeMode}
              variant={isRealTimeMode ? "default" : "outline"}
              size="sm"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRealTimeMode ? 'animate-spin' : ''}`} />
              {isRealTimeMode ? 'Real-Time ON' : 'Enable Real-Time'}
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
                {/* Area Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Select Area</label>
                  <Select value={selectedArea} onValueChange={setSelectedArea}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All Areas">All Areas</SelectItem>
                      <SelectItem value="Dandia Bazar">Dandia Bazar</SelectItem>
                      <SelectItem value="Raopura">Raopura</SelectItem>
                      <SelectItem value="Karelibaug">Karelibaug</SelectItem>
                      <SelectItem value="Pratapnagar">Pratapnagar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Route Parameters */}
                <div className="space-y-4">
                  <h4 className="font-medium">Optimization Parameters</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Total Bins</span>
                      <Badge variant="outline">{currentStops.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Need Collection (≥50%)</span>
                      <Badge variant="outline">{eligibleStops.length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Critical Bins (≥80%)</span>
                      <Badge variant="outline">{currentStops.filter(s => (s.fillLevel || 0) >= 80).length}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Selected Area</span>
                      <Badge variant="outline">{selectedArea}</Badge>
                    </div>
                  </div>
                </div>

                {/* AI Route Info */}
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="text-sm font-medium text-primary mb-1">AI Route Optimization</div>
                  <div className="text-xs text-muted-foreground">
                    Automatically skips bins with fill level &lt; 50%
                  </div>
                </div>

                {/* Route Metrics */}
                {optimizedStops.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-border">
                    <h4 className="font-medium">Route Metrics</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-accent/20 rounded-lg">
                        <div className="text-lg font-bold text-primary">{routeMetrics.totalDistance}</div>
                        <div className="text-xs text-muted-foreground">Total Distance</div>
                      </div>
                      <div className="text-center p-3 bg-accent/20 rounded-lg">
                        <div className="text-lg font-bold text-primary">{routeMetrics.estimatedTime}</div>
                        <div className="text-xs text-muted-foreground">Est. Time</div>
                      </div>
                      <div className="text-center p-3 bg-accent/20 rounded-lg">
                        <div className="text-lg font-bold text-success">{routeMetrics.fuelCost}</div>
                        <div className="text-xs text-muted-foreground">Fuel Cost</div>
                      </div>
                      <div className="text-center p-3 bg-accent/20 rounded-lg">
                        <div className="text-lg font-bold text-info">{routeMetrics.emissions}</div>
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
                    <div className="w-full h-[500px]">
                      <GoogleMap
                        stops={currentStops}
                        selectedArea={selectedArea}
                        onOptimizeRoute={handleOptimizeRoute}
                      />
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="list" className="space-y-4">
                    {optimizedStops.length > 0 ? (
                      <div className="space-y-3">
                        {optimizedStops.map((stop, index) => (
                          <div key={stop.id} className="flex items-center space-x-4 p-4 bg-accent/20 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold bg-primary">
                                {index + 1}
                              </div>
                              <div className="w-6 h-6 rounded flex items-center justify-center bg-primary">
                                <MapPin className="w-4 h-4 text-white" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="font-medium">{stop.name}</div>
                              <div className="text-sm text-muted-foreground">Bin ID: {stop.id}</div>
                            </div>
                            <Badge 
                              className={
                                (stop.fillLevel || 0) >= 80 ? "bg-alert text-white" :
                                (stop.fillLevel || 0) >= 50 ? "bg-warning text-white" : "bg-success text-white"
                              }
                            >
                              {stop.fillLevel}% full
                            </Badge>
                            <div className="text-sm font-medium">
                              {stop.lastCleaned ? formatDistanceToNow(new Date(stop.lastCleaned), { addSuffix: true }) : 'Unknown'}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Route className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Optimized Route</h3>
                        <p className="text-muted-foreground">
                          Select an area and click on the map to generate an optimal route
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