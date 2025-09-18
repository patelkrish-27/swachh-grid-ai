import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Recycle, Users, Truck, Shield, ArrowLeft } from 'lucide-react';

export default function AuthSelection() {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-6">
            <Recycle className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Choose Your Role</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your role to access the appropriate dashboard and features designed for your needs.
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="hover:shadow-elegant transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-emerald-500" />
              </div>
              <CardTitle className="text-2xl">Citizen Portal</CardTitle>
              <CardDescription>
                For residents who want to report issues, track their environmental impact, and participate in community initiatives.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="text-sm text-muted-foreground">✓ Report waste issues</div>
                <div className="text-sm text-muted-foreground">✓ Track your impact</div>
                <div className="text-sm text-muted-foreground">✓ Join leaderboards</div>
                <div className="text-sm text-muted-foreground">✓ Community challenges</div>
              </div>
              <Link to="/login?role=citizen">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                  Login as Citizen
                </Button>
              </Link>
              <div className="mt-3 text-sm text-muted-foreground">
                New citizen?{' '}
                <Link to="/signup" className="text-emerald-500 hover:underline">
                  Register here
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-500" />
              </div>
              <CardTitle className="text-2xl">Worker Portal</CardTitle>
              <CardDescription>
                For waste collection workers and field operators who manage daily collection tasks and routes.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="text-sm text-muted-foreground">✓ Manage collection tasks</div>
                <div className="text-sm text-muted-foreground">✓ Optimized routes</div>
                <div className="text-sm text-muted-foreground">✓ Real-time updates</div>
                <div className="text-sm text-muted-foreground">✓ Performance tracking</div>
              </div>
              <Link to="/login?role=worker">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  Login as Worker
                </Button>
              </Link>
              <div className="mt-3 text-sm text-muted-foreground">
                Contact admin for worker access
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-elegant transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
              <CardTitle className="text-2xl">Admin Dashboard</CardTitle>
              <CardDescription>
                For administrators and managers who oversee operations, analyze data, and manage the entire system.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="text-sm text-muted-foreground">✓ System overview</div>
                <div className="text-sm text-muted-foreground">✓ Manage users</div>
                <div className="text-sm text-muted-foreground">✓ Analytics & reports</div>
                <div className="text-sm text-muted-foreground">✓ Configuration control</div>
              </div>
              <Link to="/login?role=admin">
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                  Login as Admin
                </Button>
              </Link>
              <div className="mt-3 text-sm text-muted-foreground">
                Authorized personnel only
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Need help choosing? <Link to="/" className="text-primary hover:underline">Learn more about our platform</Link>
          </p>
        </div>
      </div>
    </div>
  );
}