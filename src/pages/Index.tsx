import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, MapPin, Users, BarChart3, Truck, Shield, Leaf, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
              <Recycle className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">SwachhGrid</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="outline" className="border-primary/20 hover:bg-primary/10">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-primary hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Smart Waste Management for a Cleaner Future
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Revolutionizing waste collection with real-time monitoring, intelligent routing, 
            and community engagement for a sustainable tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90">
                Join as Citizen
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10">
                Access Portal
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Smart Solutions for Modern Cities</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform brings together citizens, workers, and administrators 
            for efficient waste management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card/50 backdrop-blur border-primary/20 hover:shadow-elegant transition-all">
            <CardHeader>
              <MapPin className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Real-time Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Monitor bin levels and collection routes in real-time with our smart sensors.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/20 hover:shadow-elegant transition-all">
            <CardHeader>
              <Truck className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Route Optimization</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                AI-powered routing reduces fuel consumption and improves collection efficiency.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/20 hover:shadow-elegant transition-all">
            <CardHeader>
              <Users className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Community Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Citizens can report issues, track impact, and participate in sustainability goals.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-primary/20 hover:shadow-elegant transition-all">
            <CardHeader>
              <BarChart3 className="w-12 h-12 text-primary mb-4" />
              <CardTitle>Data Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Comprehensive insights and reporting for data-driven decision making.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* User Types Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-subtle">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Built for Everyone</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Different interfaces and tools for every stakeholder in the waste management ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="text-center hover:shadow-elegant transition-all">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle>Citizens</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-6">
                Report issues, track your environmental impact, and participate in community challenges.
              </CardDescription>
              <Link to="/signup">
                <Button className="w-full bg-gradient-primary hover:opacity-90">
                  Join as Citizen
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-elegant transition-all">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle>Workers</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-6">
                Manage tasks, optimize routes, and maintain efficient collection operations.
              </CardDescription>
              <Link to="/auth">
                <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10">
                  Worker Portal
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-elegant transition-all">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <CardTitle>Administrators</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-6">
                Oversee operations, analyze data, and manage city-wide waste collection systems.
              </CardDescription>
              <Link to="/auth">
                <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/10">
                  Admin Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Impact Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-3xl font-bold mb-4">Making a Real Impact</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of users already making their cities cleaner and more sustainable.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">50K+</div>
            <div className="text-sm text-muted-foreground">Active Citizens</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">1.2M</div>
            <div className="text-sm text-muted-foreground">Tons Collected</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">85%</div>
            <div className="text-sm text-muted-foreground">Route Efficiency</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">200+</div>
            <div className="text-sm text-muted-foreground">Cities Served</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-12 border-t border-border/20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <Recycle className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">SwachhGrid</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span className="flex items-center space-x-2">
              <Leaf className="w-4 h-4" />
              <span>Sustainable Future</span>
            </span>
            <span className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Smart Technology</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
