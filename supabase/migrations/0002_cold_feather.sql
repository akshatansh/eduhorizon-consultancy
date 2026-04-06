/*
  # Admin Database Setup

  1. New Tables
    - `admin_users` - Store admin credentials and permissions
    - `admin_audit_logs` - Track admin actions
  
  2. Security
    - Enable RLS on all tables
    - Add policies for admin access
    - Add policies for viewing inquiries and messages
*/

-- Create admin users table
CREATE TABLE admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text NOT NULL DEFAULT 'admin',
  created_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Create admin audit logs
CREATE TABLE admin_audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES admin_users(id),
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Admin policies
CREATE POLICY "Admins can read all admin users"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users));

CREATE POLICY "Admins can read all audit logs"
  ON admin_audit_logs
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users));

-- Update existing table policies to allow admin read access
CREATE POLICY "Admins can read all popup inquiries"
  ON popup_inquiries
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users));

CREATE POLICY "Admins can read all contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users));