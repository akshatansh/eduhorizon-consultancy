/*
  # Fix Admin User Policies

  1. Changes
    - Remove and recreate policies safely
    - Update policies for all tables
    - Add insert policies for authenticated users
  
  2. Security
    - Maintain security while preventing recursion
    - Use direct email comparison instead of subqueries
    - Allow authenticated users to insert data
*/

-- Drop policies that might exist but aren't needed anymore
DROP POLICY IF EXISTS "Admins can read all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can read all popup inquiries" ON popup_inquiries;
DROP POLICY IF EXISTS "Admins can read all contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admins can read all audit logs" ON admin_audit_logs;
DROP POLICY IF EXISTS "Admins can view all bookings" ON consultation_bookings;
DROP POLICY IF EXISTS "Enable anonymous inserts for popup inquiries" ON popup_inquiries;

-- Update policies for popup_inquiries
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'popup_inquiries' AND policyname = 'Allow admin access to inquiries'
  ) THEN
    CREATE POLICY "Allow admin access to inquiries"
      ON popup_inquiries
      FOR SELECT
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM admin_users 
          WHERE admin_users.email = auth.jwt() ->> 'email'
          AND admin_users.role IN ('admin', 'super_admin')
        )
      );
  END IF;
END $$;

-- Add insert policy for popup_inquiries
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'popup_inquiries' AND policyname = 'Allow all users to insert inquiries'
  ) THEN
    CREATE POLICY "Allow all users to insert inquiries"
      ON popup_inquiries
      FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;
END $$;

-- Update policies for contact_messages
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'contact_messages' AND policyname = 'Allow admin access to messages'
  ) THEN
    CREATE POLICY "Allow admin access to messages"
      ON contact_messages
      FOR SELECT
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM admin_users 
          WHERE admin_users.email = auth.jwt() ->> 'email'
          AND admin_users.role IN ('admin', 'super_admin')
        )
      );
  END IF;
END $$;

-- Update policies for admin_audit_logs
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'admin_audit_logs' AND policyname = 'Allow admin access to audit logs'
  ) THEN
    CREATE POLICY "Allow admin access to audit logs"
      ON admin_audit_logs
      FOR SELECT
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM admin_users 
          WHERE admin_users.email = auth.jwt() ->> 'email'
          AND admin_users.role IN ('admin', 'super_admin')
        )
      );
  END IF;
END $$;

-- Update policies for consultation_bookings
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'consultation_bookings' AND policyname = 'Allow admin access to bookings'
  ) THEN
    CREATE POLICY "Allow admin access to bookings"
      ON consultation_bookings
      FOR SELECT
      TO authenticated
      USING (
        EXISTS (
          SELECT 1 FROM admin_users 
          WHERE admin_users.email = auth.jwt() ->> 'email'
          AND admin_users.role IN ('admin', 'super_admin')
        )
      );
  END IF;
END $$;