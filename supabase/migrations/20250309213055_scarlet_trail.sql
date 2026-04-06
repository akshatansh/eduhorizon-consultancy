/*
  # Create admin authentication function and sample user

  1. Changes
    - Create function for admin authentication
    - Add sample admin user with proper password hash
    - Email: admin@eduhorizon.com
    - Password: Admin@123

  2. Security
    - Password is stored using pgcrypto for secure hashing
    - Function validates credentials securely
*/

-- Enable pgcrypto extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Drop the existing function if it exists
DROP FUNCTION IF EXISTS authenticate_admin(text, text);

-- Create function to authenticate admin users
CREATE FUNCTION authenticate_admin(
  admin_email TEXT,
  admin_password TEXT
) RETURNS jsonb AS $$
DECLARE
  admin_user RECORD;
BEGIN
  -- Get admin user
  SELECT * INTO admin_user
  FROM admin_users
  WHERE email = admin_email;

  -- Check if user exists and password matches
  IF admin_user IS NULL OR 
     admin_user.password_hash != crypt(admin_password, admin_user.password_hash) THEN
    RETURN jsonb_build_object(
      'success', false,
      'message', 'Invalid credentials'
    );
  END IF;

  RETURN jsonb_build_object(
    'success', true,
    'message', 'Authentication successful',
    'user', jsonb_build_object(
      'id', admin_user.id,
      'email', admin_user.email,
      'role', admin_user.role
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert sample admin user with properly hashed password
INSERT INTO admin_users (email, password_hash, role)
VALUES (
  'admin@eduhorizon.com',
  crypt('Admin@123', gen_salt('bf')),
  'admin'
)
ON CONFLICT (email) 
DO UPDATE SET 
  password_hash = crypt('Admin@123', gen_salt('bf')),
  role = 'admin';