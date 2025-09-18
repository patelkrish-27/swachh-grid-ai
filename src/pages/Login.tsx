'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Recycle, Eye, EyeOff, Users, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const [userRole, setUserRole] = useState<string>('');

  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const role = searchParams.get('role') || '';
    setUserRole(role);
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'worker':
          navigate('/worker/dashboard');
          break;
        case 'citizen':
          navigate('/citizen/dashboard');
          break;
        default:
          navigate('/');
      }
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn(email, password);
    
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      toast({
        title: "Welcome back!",
        description: "You have been signed in successfully.",
      });
    }
  };

  const getRoleConfig = () => {
    switch (userRole) {
      case 'citizen':
        return {
          icon: Users,
          color: 'emerald',
          title: 'Citizen Portal',
          description: 'Access your community dashboard',
          bgColor: 'bg-emerald-500',
          borderColor: 'border-emerald-500/20'
        };
      case 'worker':
        return {
          icon: Truck,
          color: 'blue',
          title: 'Worker Portal',
          description: 'Manage your collection tasks',
          bgColor: 'bg-blue-500',
          borderColor: 'border-blue-500/20'
        };
      case 'admin':
        return {
          icon: Shield,
          color: 'purple',
          title: 'Admin Dashboard',
          description: 'System administration portal',
          bgColor: 'bg-purple-500',
          borderColor: 'border-purple-500/20'
        };
      default:
        return {
          icon: Recycle,
          color: 'primary',
          title: 'SwachhGrid',
          description: 'Sign in to your account to continue',
          bgColor: 'bg-gradient-primary',
          borderColor: 'border-primary/20'
        };
    }
  };

  const roleConfig = getRoleConfig();
  const IconComponent = roleConfig.icon;

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className={`w-full max-w-md shadow-elegant ${roleConfig.borderColor}`}>
        <CardHeader className="text-center">
          <Link to="/auth" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to role selection
          </Link>
          <div className={`mx-auto w-16 h-16 ${roleConfig.bgColor} rounded-full flex items-center justify-center mb-4`}>
            <IconComponent className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold">{roleConfig.title}</CardTitle>
          <CardDescription>
            {roleConfig.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className={`w-full ${roleConfig.bgColor} hover:opacity-90 text-white`}
              disabled={loading}
            >
              {loading ? "Signing in..." : `Sign In as ${userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : 'User'}`}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up as citizen
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}