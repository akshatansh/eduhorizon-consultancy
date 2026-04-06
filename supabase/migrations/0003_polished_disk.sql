/*
  # Admin Authentication Setup

  1. Changes
    - Create pgcrypto extension for password hashing
    - Add password_hash column with default value
    - Create admin credentials validation function
    - Add initial admin user
*/

-- Enable pgcrypto extension for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Add password_hash column with a temporary default
ALTER TABLE admin_users 
ADD COLUMN IF NOT EXISTS password_hash text;

-- Update existing rows with a temporary password hash
UPDATE admin_users 
SET password_hash = crypt('changeme123', gen_salt('bf'))
WHERE password_hash IS NULL;

-- Now make the column required
ALTER TABLE admin_users 
ALTER COLUMN password_hash SET NOT NULL;

-- Create function to validate admin credentials
CREATE OR REPLACE FUNCTION validate_admin_credentials(
  admin_email text,
  admin_password text
) RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE email = admin_email 
    AND password_hash = crypt(admin_password, password_hash)
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert initial admin user if not exists
INSERT INTO admin_users (email, password_hash)
SELECT 'admin@eduhorizon.com', crypt('admin123', gen_salt('bf'))
WHERE NOT EXISTS (
  SELECT 1 FROM admin_users WHERE email = 'admin@eduhorizon.com'
);