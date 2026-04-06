/*
  # Fix Admin User Policies

  1. Changes
    - Remove recursive policies that cause infinite loops
    - Create new, simplified policies for admin access
    - Update existing table policies to use direct email checks
  
  2. Security
    - Maintain security while preventing recursion
    - Use direct email comparison instead of subqueries
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Admins can read all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can read own data" ON admin_users;
DROP POLICY IF EXISTS "Admins can read all popup inquiries" ON popup_inquiries;
DROP POLICY IF EXISTS "Admins can read all contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Admins can read all audit logs" ON admin_audit_logs;
DROP POLICY IF EXISTS "Admins can view all bookings" ON consultation_bookings;

-- Create new, non-recursive policies for admin_users
CREATE POLICY "Allow admin to read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Update policies for popup_inquiries
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

-- Update policies for contact_messages
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

-- Update policies for admin_audit_logs
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

-- Update policies for consultation_bookings
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