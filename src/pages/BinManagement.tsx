import { useState } from "react";
import { 
  Search, 
  Filter, 
  MapPin, 
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  Clock,
  Truck,
  Eye
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockBins = [
  {
    id: "BIN001",
    location: "Main Street & 1st Ave",
    fillLevel: 85,
    status: "critical",
    lastUpdated: "2 min ago",
    batteryLevel: 78,
    temperature: 24,
    coordinates: "40.7589, -73.9851"
  },
  {
    id: "BIN002",
    location: "City Park East",
    fillLevel: 45,
    status: "normal", 
    lastUpdated: "5 min ago",
    batteryLevel: 92,
    temperature: 22,
    coordinates: "40.7614, -73.9776"
  },
  {
    id: "BIN003",
    location: "Shopping Mall",
    fillLevel: 70,
    status: "warning",
    lastUpdated: "1 min ago", 
    batteryLevel: 65,
    temperature: 26,
    coordinates: "40.7505, -73.9934"
  },
  {
    id: "BIN004",
    location: "University Campus",
    fillLevel: 20,
    status: "normal",
    lastUpdated: "3 min ago",
    batteryLevel: 88,
    temperature: 23,
    coordinates: "40.7829, -73.9654"
  },
  {
    id: "BIN005",
    location: "Bus Terminal",
    fillLevel: 90,
    status: "critical", 
    lastUpdated: "1 min ago",
    batteryLevel: 43,
    temperature: 28,
    coordinates: "40.7505, -73.9934"
  },
  {
    id: "BIN006",
    location: "Library Square",
    fillLevel: 55,
    status: "normal",
    lastUpdated: "7 min ago",
    batteryLevel: 95,
    temperature: 21,
    coordinates: "40.7542, -73.9840"
  }
];

const BinManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBins = mockBins.filter(bin => {
    const matchesSearch = bin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bin.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bin.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string): "destructive" | "secondary" | "default" | "outline" => {
    const variants: Record<string, "destructive" | "secondary" | "default" | "outline"> = {
      critical: "destructive",
      warning: "secondary", 
      normal: "default"
    };
    return variants[status] || "default";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical":
        return <AlertTriangle className="w-4 h-4" />;
      case "warning":
        return <Clock className="w-4 h-4" />;
      case "normal":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              Smart Bin Management
            </h1>
            <p className="text-muted-foreground">
              Monitor and manage all smart waste bins across the city
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Map View
            </Button>
            <Button size="sm">
              <Truck className="w-4 h-4 mr-2" />
              Schedule Collection
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="glass-card mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by bin ID or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant={statusFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("all")}
                >
                  All Status
                </Button>
                <Button
                  variant={statusFilter === "critical" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("critical")}
                >
                  Critical
                </Button>
                <Button
                  variant={statusFilter === "warning" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("warning")}
                >
                  Warning
                </Button>
                <Button
                  variant={statusFilter === "normal" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setStatusFilter("normal")}
                >
                  Normal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bins Table */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Smart Bins ({filteredBins.length})</span>
              <Button variant="ghost" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bin ID</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Fill Level</TableHead>
                    <TableHead>Battery</TableHead>
                    <TableHead>Temperature</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBins.map((bin) => (
                    <TableRow key={bin.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{bin.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{bin.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(bin.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(bin.status)}
                            <span className="capitalize">{bin.status}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-muted rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                bin.fillLevel >= 80 ? "bg-alert" :
                                bin.fillLevel >= 60 ? "bg-warning" : "bg-success"
                              }`}
                              style={{ width: `${bin.fillLevel}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{bin.fillLevel}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            bin.batteryLevel >= 70 ? "bg-success" :
                            bin.batteryLevel >= 30 ? "bg-warning" : "bg-alert"
                          }`} />
                          <span>{bin.batteryLevel}%</span>
                        </div>
                      </TableCell>
                      <TableCell>{bin.temperature}°C</TableCell>
                      <TableCell className="text-muted-foreground">
                        {bin.lastUpdated}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Truck className="w-4 h-4 mr-2" />
                              Schedule Collection
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MapPin className="w-4 h-4 mr-2" />
                              Show on Map
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BinManagement;