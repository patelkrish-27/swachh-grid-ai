'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User, Citizen, Worker, AuthContextType } from '@/types';
import { authService } from '@/lib/auth';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [citizen, setCitizen] = useState<Citizen | null>(null);
  const [worker, setWorker] = useState<Worker | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          await fetchUserData(session.user);
        } else {
          setUser(null);
          setCitizen(null);
          setWorker(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserData(session.user);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserData = async (supabaseUser: SupabaseUser) => {
    try {
      // Get user record from users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (userError) {
        console.error('Error fetching user:', userError);
        setLoading(false);
        return;
      }

      setUser(userData as User);

      // Fetch role-specific data
      if (userData.role === 'citizen') {
        const { data: citizenData, error: citizenError } = await supabase
          .from('citizens')
          .select('*')
          .eq('id', userData.id)
          .single();

        if (!citizenError && citizenData) {
          setCitizen(citizenData as Citizen);
        }
      } else if (userData.role === 'worker') {
        const { data: workerData, error: workerError } = await supabase
          .from('workers')
          .select('*')
          .eq('id', userData.id)
          .single();

        if (!workerError && workerData) {
          setWorker(workerData as Worker);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const result = await authService.signIn(email, password);
    if (result.error) {
      setLoading(false);
    }
    return result;
  };

  const signUp = async (email: string, password: string, role: string, additionalData?: any) => {
    setLoading(true);
    const result = await authService.signUp(email, password, role as any, additionalData);
    if (result.error) {
      setLoading(false);
    }
    return result;
  };

  const signOut = async () => {
    setLoading(true);
    await authService.signOut();
    setUser(null);
    setCitizen(null);
    setWorker(null);
    setSession(null);
    setLoading(false);
  };

  const resetPassword = async (email: string) => {
    return await authService.resetPassword(email);
  };

  const value = {
    user,
    citizen,
    worker,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}