import { useState } from "react";
import { 
  MapPin, 
  Camera, 
  Send, 
  Trophy, 
  Star,
  Upload,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const CitizenPortal = () => {
  const [reportForm, setReportForm] = useState({
    description: "",
    location: "",
    category: "overflow"
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const { toast } = useToast();

  const leaderboard = [
    { rank: 1, name: "Sarah Chen", points: 2450, avatar: "SC", verified: true },
    { rank: 2, name: "Mike Johnson", points: 2180, avatar: "MJ", verified: true },
    { rank: 3, name: "Priya Patel", points: 1920, avatar: "PP", verified: false },
    { rank: 4, name: "Alex Rivera", points: 1750, avatar: "AR", verified: true },
    { rank: 5, name: "Emma Wilson", points: 1680, avatar: "EW", verified: false },
    { rank: 6, name: "David Kim", points: 1540, avatar: "DK", verified: true },
    { rank: 7, name: "Lisa Brown", points: 1420, avatar: "LB", verified: false },
    { rank: 8, name: "You", points: 1380, avatar: "YU", verified: false, isCurrentUser: true }
  ];

  const nearbyBins = [
    { id: "BIN001", location: "Main Street (50m)", fillLevel: 85, status: "critical" },
    { id: "BIN002", location: "Park Avenue (120m)", fillLevel: 45, status: "normal" },
    { id: "BIN003", location: "Library Square (200m)", fillLevel: 70, status: "warning" },
    { id: "BIN004", location: "Bus Stop (300m)", fillLevel: 30, status: "normal" }
  ];

  const categories = [
    { value: "overflow", label: "Bin Overflow" },
    { value: "damaged", label: "Damaged Bin" },
    { value: "missing", label: "Missing Bin" },
    { value: "littering", label: "Public Littering" },
    { value: "other", label: "Other Issue" }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSubmitReport = () => {
    if (!reportForm.description || !reportForm.location) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate report submission
    toast({
      title: "Report Submitted!",
      description: "Thank you for helping keep our city clean. You earned 50 points!",
    });

    setReportForm({ description: "", location: "", category: "overflow" });
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gradient mb-2">
            Citizen Portal
          </h1>
          <p className="text-muted-foreground">
            Help keep our city clean and earn rewards for your contributions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Form */}
          <div className="lg:col-span-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  <span>Report an Issue</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Selection */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Issue Category</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.value}
                        variant={reportForm.category === category.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setReportForm({...reportForm, category: category.value})}
                        className="justify-start"
                      >
                        {category.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Location Input */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Enter location or address"
                      value={reportForm.location}
                      onChange={(e) => setReportForm({...reportForm, location: e.target.value})}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe the issue in detail..."
                    value={reportForm.description}
                    onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                    rows={4}
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Photo (Optional)</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    {selectedImage ? (
                      <div className="space-y-2">
                        <CheckCircle className="w-8 h-8 text-success mx-auto" />
                        <p className="text-sm font-medium">{selectedImage.name}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedImage(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Camera className="w-8 h-8 text-muted-foreground mx-auto" />
                        <p className="text-sm text-muted-foreground">
                          Upload a photo to help us understand the issue better
                        </p>
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="photo-upload"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <label htmlFor="photo-upload" className="cursor-pointer">
                              <Upload className="w-4 h-4 mr-2" />
                              Choose File
                            </label>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <Button onClick={handleSubmitReport} className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Submit Report
                </Button>
              </CardContent>
            </Card>

            {/* Nearby Bins Map */}
            <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Nearby Smart Bins</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {nearbyBins.map((bin) => (
                    <div key={bin.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/20">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          bin.status === "critical" ? "bg-alert" :
                          bin.status === "warning" ? "bg-warning" : "bg-success"
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{bin.id}</p>
                          <p className="text-xs text-muted-foreground">{bin.location}</p>
                        </div>
                      </div>
                      <Badge variant={
                        bin.status === "critical" ? "destructive" :
                        bin.status === "warning" ? "secondary" : "default"
                      }>
                        {bin.fillLevel}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Stats */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  <span>Your Impact</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-1">1,380</div>
                    <div className="text-sm text-muted-foreground">Total Points</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-xl font-semibold">23</div>
                      <div className="text-xs text-muted-foreground">Reports Submitted</div>
                    </div>
                    <div>
                      <div className="text-xl font-semibold">18</div>
                      <div className="text-xs text-muted-foreground">Issues Resolved</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <Star className="w-4 h-4 text-warning fill-current" />
                    <Star className="w-4 h-4 text-muted-foreground" />
                    <Star className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium ml-2">Eco Warrior</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-warning" />
                  <span>Community Leaderboard</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center space-x-3 p-2 rounded-lg ${
                        user.isCurrentUser ? "bg-primary/10 border border-primary/20" : ""
                      }`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        user.rank === 1 ? "bg-warning text-warning-foreground" :
                        user.rank === 2 ? "bg-muted text-muted-foreground" :
                        user.rank === 3 ? "bg-amber-600 text-white" :
                        "bg-accent text-accent-foreground"
                      }`}>
                        {user.rank}
                      </div>
                      <div className={`w-8 h-8 rounded-full ${
                        user.isCurrentUser ? "bg-primary" : "bg-muted"
                      } flex items-center justify-center text-xs font-bold text-white`}>
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">{user.name}</span>
                          {user.verified && (
                            <CheckCircle className="w-3 h-3 text-success" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user.points.toLocaleString()} pts
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenPortal;