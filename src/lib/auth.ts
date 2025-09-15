import { supabase } from "@/integrations/supabase/client";
import { User } from "@/types";

export interface AuthResponse {
  user?: User;
  error?: string;
}

export const authService = {
  async signIn(email: string, password: string): Promise<AuthResponse> {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        // Get user role from users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (userError) {
          return { error: 'Failed to fetch user data' };
        }

        return { user: userData as User };
      }

      return { error: 'Sign in failed' };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  async signUp(email: string, password: string, role: 'admin' | 'citizen' | 'worker', additionalData?: any): Promise<AuthResponse> {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        return { error: error.message };
      }

      if (data.user) {
        // Create user record in users table
        const { error: userError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            role
          });

        if (userError) {
          return { error: 'Failed to create user profile' };
        }

        // Create role-specific profile
        if (role === 'citizen' && additionalData) {
          const { error: citizenError } = await supabase
            .from('citizens')
            .insert({
              id: data.user.id,
              name: additionalData.name,
              phone: additionalData.phone,
              area: additionalData.area
            });

          if (citizenError) {
            return { error: 'Failed to create citizen profile' };
          }
        } else if (role === 'worker' && additionalData) {
          const { error: workerError } = await supabase
            .from('workers')
            .insert({
              id: data.user.id,
              worker_id: additionalData.worker_id,
              name: additionalData.name,
              assigned_region: additionalData.assigned_region,
              contact: additionalData.contact,
              created_by: additionalData.created_by
            });

          if (workerError) {
            return { error: 'Failed to create worker profile' };
          }
        }

        return { user: { id: data.user.id, email: data.user.email!, role: role as any, created_at: new Date().toISOString() } };
      }

      return { error: 'Sign up failed' };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  async signOut(): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error: error.message };
      }
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  async resetPassword(email: string): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) {
        return { error: error.message };
      }
      
      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  async getCurrentUser(): Promise<{ user?: User; error?: string }> {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        return { error: error.message };
      }

      if (!user) {
        return {};
      }

      // Get user role from users table
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (userError) {
        return { error: 'Failed to fetch user data' };
      }

      return { user: userData as User };
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  },

  async updatePassword(password: string): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.auth.updateUser({
        password
      });

      if (error) {
        return { error: error.message };
      }

      return {};
    } catch (error) {
      return { error: 'An unexpected error occurred' };
    }
  }
};