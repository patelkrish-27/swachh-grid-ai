import { useState } from "react";
import { 
  BarChart3, 
  Download, 
  Calendar,
  TrendingUp,
  TrendingDown,
  MapPin,
  Clock,
  Trash2,
  Fuel
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Reports = () => {
  const [dateRange, setDateRange] = useState("last-30-days");
  const [reportType, setReportType] = useState("overview");

  const overviewMetrics = [
    {
      title: "Total Collections",
      value: "1,247",
      change: 12.5,
      icon: Trash2,
      trend: "up"
    },
    {
      title: "Average Fill Level",
      value: "68%",
      change: -3.2,
      icon: BarChart3,
      trend: "down"
    },
    {
      title: "Route Efficiency",
      value: "94.2%",
      change: 5.8,
      icon: MapPin,
      trend: "up"
    },
    {
      title: "Fuel Savings",
      value: "$2,340",
      change: 18.3,
      icon: Fuel,
      trend: "up"
    }
  ];

  const zoneData = [
    { zone: "Zone A - Downtown", collections: 342, efficiency: 96.2, avgFill: 72 },
    { zone: "Zone B - Residential", collections: 198, efficiency: 91.5, avgFill: 65 },
    { zone: "Zone C - Commercial", collections: 267, efficiency: 94.8, avgFill: 78 },
    { zone: "Zone D - Industrial", collections: 156, efficiency: 89.3, avgFill: 82 },
    { zone: "Zone E - Suburban", collections: 124, efficiency: 93.1, avgFill: 58 }
  ];

  const timeSeriesData = [
    { date: "Week 1", collections: 285, efficiency: 92.1 },
    { date: "Week 2", collections: 312, efficiency: 94.3 },
    { date: "Week 3", collections: 298, efficiency: 93.7 },
    { date: "Week 4", collections: 352, efficiency: 95.2 }
  ];

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Analytics & Reports
            </h1>
            <p className="text-muted-foreground">
              Comprehensive insights and performance analytics
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="last-year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewMetrics.map((metric, index) => {
            const Icon = metric.icon;
            const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown;
            
            return (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        {metric.title}
                      </p>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-2xl font-bold">{metric.value}</h3>
                        <div className={`flex items-center space-x-1 text-sm ${
                          metric.trend === "up" ? "text-success" : "text-alert"
                        }`}>
                          <TrendIcon className="w-3 h-3" />
                          <span>{metric.change}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Reports */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Detailed Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="zones" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="zones">Zone Performance</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
              </TabsList>
              
              <TabsContent value="zones" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Zone-wise Performance</h3>
                  
                  {zoneData.map((zone, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-accent/20 rounded-lg">
                      <div>
                        <div className="font-medium">{zone.zone}</div>
                        <div className="text-sm text-muted-foreground">Collection Zone</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-primary">{zone.collections}</div>
                        <div className="text-xs text-muted-foreground">Collections</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-success">{zone.efficiency}%</div>
                        <div className="text-xs text-muted-foreground">Efficiency</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-info">{zone.avgFill}%</div>
                        <div className="text-xs text-muted-foreground">Avg Fill</div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="trends" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Performance Trends</h3>
                  
                  {/* Chart Placeholder */}
                  <div className="h-80 bg-gradient-to-r from-primary/10 to-success/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 flex items-end justify-around p-8">
                      {timeSeriesData.map((data, index) => (
                        <div key={index} className="flex flex-col items-center space-y-2">
                          <div 
                            className="w-12 bg-primary rounded-t"
                            style={{ height: `${data.efficiency}%` }}
                          />
                          <div className="text-xs font-medium">{data.date}</div>
                          <div className="text-xs text-muted-foreground">{data.collections}</div>
                        </div>
                      ))}
                    </div>
                    <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3">
                      <h4 className="font-medium text-sm mb-2">Collection Efficiency</h4>
                      <div className="text-xs text-muted-foreground">Weekly comparison</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="efficiency" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Route Optimization Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Distance Saved</span>
                          <span className="font-medium text-success">342 km</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Time Saved</span>
                          <span className="font-medium text-success">28 hours</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Fuel Saved</span>
                          <span className="font-medium text-success">$2,340</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">CO2 Reduced</span>
                          <span className="font-medium text-success">89 kg</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Predictive Analytics</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Next Week Prediction</span>
                          <span className="font-medium text-warning">+15% volume</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">High-Risk Bins</span>
                          <span className="font-medium text-alert">7 identified</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Optimal Collection Time</span>
                          <span className="font-medium text-info">8:00 AM</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Efficiency Score</span>
                          <span className="font-medium text-success">94.2%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;