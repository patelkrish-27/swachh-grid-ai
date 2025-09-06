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
  Eye,
  SlidersHorizontal,
  X,
  ChevronUp,
  ChevronDown
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { formatDistanceToNow } from "date-fns";

const mockBins = [
  { id: "BIN001", location: "Main Street & 1st Ave", status: "critical", fillLevel: 85, batteryLevel: 78, temperature: 24, lastUpdated: "2025-09-06T12:45:00Z", wasteType: "Mixed" },
  { id: "BIN002", location: "City Park East", status: "normal", fillLevel: 45, batteryLevel: 92, temperature: 22, lastUpdated: "2025-09-06T12:42:00Z", wasteType: "Wet" },
  { id: "BIN003", location: "Shopping Mall", status: "warning", fillLevel: 70, batteryLevel: 65, temperature: 26, lastUpdated: "2025-09-06T12:50:00Z", wasteType: "Dry" },
  { id: "BIN004", location: "University Campus", status: "normal", fillLevel: 20, batteryLevel: 88, temperature: 23, lastUpdated: "2025-09-06T12:40:00Z", wasteType: "Wet" },
  { id: "BIN005", location: "Bus Terminal", status: "critical", fillLevel: 90, batteryLevel: 43, temperature: 28, lastUpdated: "2025-09-06T12:48:00Z", wasteType: "Mixed" },
  { id: "BIN006", location: "Industrial Area", status: "warning", fillLevel: 65, batteryLevel: 55, temperature: 29, lastUpdated: "2025-09-06T12:44:00Z", wasteType: "Dry" },
  { id: "BIN007", location: "Residential Block A", status: "normal", fillLevel: 35, batteryLevel: 80, temperature: 25, lastUpdated: "2025-09-06T12:46:00Z", wasteType: "Wet" },
  { id: "BIN008", location: "Railway Station", status: "critical", fillLevel: 88, batteryLevel: 50, temperature: 27, lastUpdated: "2025-09-06T12:41:00Z", wasteType: "Mixed" },
  { id: "BIN009", location: "Market Street", status: "normal", fillLevel: 40, batteryLevel: 85, temperature: 24, lastUpdated: "2025-09-06T12:43:00Z", wasteType: "Dry" },
  { id: "BIN010", location: "Hospital Zone", status: "warning", fillLevel: 75, batteryLevel: 60, temperature: 26, lastUpdated: "2025-09-06T12:47:00Z", wasteType: "Wet" }
];

const BinManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [wasteTypeFilter, setWasteTypeFilter] = useState("all");
  const [fillLevelRange, setFillLevelRange] = useState([0, 100]);
  const [batteryRange, setBatteryRange] = useState([0, 100]);
  const [sortConfig, setSortConfig] = useState<{key: string, direction: 'asc' | 'desc'} | null>(null);
  const [showFiltersModal, setShowFiltersModal] = useState(false);

  const filteredBins = mockBins.filter(bin => {
    const matchesSearch = bin.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bin.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || bin.status === statusFilter;
    const matchesWasteType = wasteTypeFilter === "all" || bin.wasteType === wasteTypeFilter;
    const matchesFillLevel = bin.fillLevel >= fillLevelRange[0] && bin.fillLevel <= fillLevelRange[1];
    const matchesBattery = bin.batteryLevel >= batteryRange[0] && bin.batteryLevel <= batteryRange[1];
    
    return matchesSearch && matchesStatus && matchesWasteType && matchesFillLevel && matchesBattery;
  });

  const sortedBins = sortConfig 
    ? [...filteredBins].sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortConfig.direction === 'asc' 
            ? aValue - bValue
            : bValue - aValue;
        }
        
        return 0;
      })
    : filteredBins;

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const resetFilters = () => {
    setWasteTypeFilter("all");
    setFillLevelRange([0, 100]);
    setBatteryRange([0, 100]);
  };

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
              <span>Smart Bins ({sortedBins.length})</span>
              <Dialog open={showFiltersModal} onOpenChange={setShowFiltersModal}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Advanced Filters</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Waste Type</label>
                      <Select value={wasteTypeFilter} onValueChange={setWasteTypeFilter}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select waste type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="Mixed">Mixed</SelectItem>
                          <SelectItem value="Wet">Wet</SelectItem>
                          <SelectItem value="Dry">Dry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Fill Level: {fillLevelRange[0]}% - {fillLevelRange[1]}%
                      </label>
                      <Slider
                        value={fillLevelRange}
                        onValueChange={setFillLevelRange}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Battery Level: {batteryRange[0]}% - {batteryRange[1]}%
                      </label>
                      <Slider
                        value={batteryRange}
                        onValueChange={setBatteryRange}
                        max={100}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={resetFilters} className="flex-1">
                        Reset
                      </Button>
                      <Button onClick={() => setShowFiltersModal(false)} className="flex-1">
                        Apply
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('id')}>
                      <div className="flex items-center space-x-1">
                        <span>Bin ID</span>
                        {sortConfig?.key === 'id' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('fillLevel')}>
                      <div className="flex items-center space-x-1">
                        <span>Fill Level</span>
                        {sortConfig?.key === 'fillLevel' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('batteryLevel')}>
                      <div className="flex items-center space-x-1">
                        <span>Battery</span>
                        {sortConfig?.key === 'batteryLevel' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => handleSort('temperature')}>
                      <div className="flex items-center space-x-1">
                        <span>Temperature</span>
                        {sortConfig?.key === 'temperature' && (
                          sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </TableHead>
                    <TableHead>Waste Type</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedBins.map((bin) => (
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
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {bin.wasteType}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDistanceToNow(new Date(bin.lastUpdated), { addSuffix: true })}
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