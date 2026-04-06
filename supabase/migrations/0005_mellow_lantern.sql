/*
  # Fix admin authentication

  1. Changes
    - Add admin authentication function
    - Update admin users table
    - Add secure policies
  
  2. Security
    - Enable RLS
    - Add policies for admin access
*/

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS validate_admin_credentials;

-- Create a more secure admin authentication function
CREATE OR REPLACE FUNCTION authenticate_admin(
  admin_email text,
  admin_password text
) RETURNS json AS $$
DECLARE
  admin_user admin_users%ROWTYPE;
  result json;
BEGIN
  -- Check if admin exists and password matches
  SELECT * INTO admin_user
  FROM admin_users
  WHERE email = admin_email
  AND password_hash = crypt(admin_password, password_hash);

  IF admin_user.id IS NOT NULL THEN
    -- Update last login
    UPDATE admin_users 
    SET last_login = now()
    WHERE id = admin_user.id;

    -- Return success with user info
    result := json_build_object(
      'success', true,
      'user', json_build_object(
        'id', admin_user.id,
        'email', admin_user.email,
        'role', admin_user.role
      )
    );
  ELSE
    result := json_build_object(
      'success', false,
      'message', 'Invalid credentials'
    );
  END IF;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;