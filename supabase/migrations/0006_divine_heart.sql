/*
  # Admin System Setup

  1. New Tables
    - admin_users: Stores admin account information with role-based access
    - admin_sessions: Tracks admin login sessions
  
  2. Security
    - Enable RLS on all tables
    - Add secure policies for admin access
    - Create secure authentication functions
*/

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create admin roles enum
CREATE TYPE admin_role AS ENUM ('super_admin', 'admin', 'editor');

-- Create admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  role admin_role NOT NULL DEFAULT 'admin',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_login timestamptz
);

-- Create admin sessions table
CREATE TABLE IF NOT EXISTS admin_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES admin_users(id),
  token text NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Create admin authentication function
CREATE OR REPLACE FUNCTION admin_authenticate(
  p_email text,
  p_password text
) RETURNS json AS $$
DECLARE
  v_admin admin_users%ROWTYPE;
  v_token text;
BEGIN
  -- Check if admin exists and is active
  SELECT * INTO v_admin
  FROM admin_users
  WHERE email = p_email 
  AND is_active = true;

  IF v_admin.id IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'message', 'Invalid credentials'
    );
  END IF;

  -- Verify password
  IF v_admin.password_hash != crypt(p_password, v_admin.password_hash) THEN
    RETURN json_build_object(
      'success', false,
      'message', 'Invalid credentials'
    );
  END IF;

  -- Generate session token
  v_token := encode(gen_random_bytes(32), 'hex');

  -- Create new session
  INSERT INTO admin_sessions (
    admin_id,
    token,
    expires_at
  ) VALUES (
    v_admin.id,
    v_token,
    now() + interval '24 hours'
  );

  -- Update last login
  UPDATE admin_users 
  SET 
    last_login = now(),
    updated_at = now()
  WHERE id = v_admin.id;

  RETURN json_build_object(
    'success', true,
    'user', json_build_object(
      'id', v_admin.id,
      'email', v_admin.email,
      'role', v_admin.role
    ),
    'token', v_token,
    'expires_at', (now() + interval '24 hours')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to verify admin session
CREATE OR REPLACE FUNCTION verify_admin_session(p_token text)
RETURNS json AS $$
DECLARE
  v_session admin_sessions%ROWTYPE;
  v_admin admin_users%ROWTYPE;
BEGIN
  -- Get valid session
  SELECT * INTO v_session
  FROM admin_sessions
  WHERE token = p_token
  AND expires_at > now();

  IF v_session.id IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'message', 'Invalid or expired session'
    );
  END IF;

  -- Get admin user
  SELECT * INTO v_admin
  FROM admin_users
  WHERE id = v_session.admin_id
  AND is_active = true;

  IF v_admin.id IS NULL THEN
    RETURN json_build_object(
      'success', false,
      'message', 'Admin account not found or inactive'
    );
  END IF;

  RETURN json_build_object(
    'success', true,
    'user', json_build_object(
      'id', v_admin.id,
      'email', v_admin.email,
      'role', v_admin.role
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert default super admin
INSERT INTO admin_users (
  email,
  password_hash,
  role
) VALUES (
  'admin@eduhorizon.com',
  crypt('admin123', gen_salt('bf')),
  'super_admin'
) ON CONFLICT (email) DO NOTHING;

-- Create RLS policies
CREATE POLICY "Admins can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = email);

CREATE POLICY "Admins can read own sessions"
  ON admin_sessions
  FOR SELECT
  TO authenticated
  USING (admin_id IN (
    SELECT id FROM admin_users 
    WHERE email = auth.jwt() ->> 'email'
  ));