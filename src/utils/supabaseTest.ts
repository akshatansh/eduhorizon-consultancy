import { supabase } from './supabase';

export const testSupabaseConnection = async () => {
  try {
    // First check if we have valid Supabase credentials
    if (!supabase.auth) {
      return {
        success: false,
        message: 'Supabase client not properly initialized',
        error: 'Missing or invalid Supabase configuration'
      };
    }

    // Test connection by checking auth status (this doesn't require RLS permissions)
    const { error } = await supabase.auth.getSession();

    // Handle specific error cases
    if (error) {
      if (error.message.includes('fetch')) {
        return {
          success: false,
          message: 'Please connect to Supabase first',
          error: 'Database connection not established'
        };
      }

      return {
        success: false,
        message: 'Failed to connect to Supabase',
        error: error.message
      };
    }

    return {
      success: true,
      message: 'Successfully connected to Supabase'
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return {
      success: false,
      message: 'Please make sure you have clicked "Connect to Supabase" and completed the setup',
      error: errorMessage
    };
  }
};