/*
  # Fix RLS Policy for Popup Inquiries
  
  1. Changes
    - Drop the incorrect policy that requires authentication for INSERT
    - Create a new policy that allows anonymous users to INSERT
    - This allows the popup form to work without requiring users to be logged in
  
  2. Security
    - Maintains RLS protection
    - Only allows anonymous INSERT operations
    - Admin users can still read all inquiries through their existing policy
*/

-- Drop the existing incorrect policy
DROP POLICY IF EXISTS "Allow all users to insert inquiries" ON popup_inquiries;

-- Create correct policy for anonymous inserts
CREATE POLICY "Enable anonymous inserts for popup inquiries"
  ON popup_inquiries
  FOR INSERT
  TO anon
  WITH CHECK (true);
