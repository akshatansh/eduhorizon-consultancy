/*
  # Create consultation bookings system

  1. New Tables
    - `consultation_bookings`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `phone` (text) 
      - `course` (text)
      - `preferred_date` (date)
      - `preferred_time` (text)
      - `message` (text)
      - `status` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for insert and select
*/

-- Create consultation bookings table
CREATE TABLE consultation_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  course text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time text NOT NULL,
  message text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE consultation_bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable anonymous inserts for consultation bookings"
ON consultation_bookings FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Enable viewing own bookings"
ON consultation_bookings FOR SELECT
TO authenticated
USING (email = auth.jwt() ->> 'email');

-- Create admin policy to view all bookings
CREATE POLICY "Admins can view all bookings"
ON consultation_bookings FOR SELECT
TO authenticated
USING (auth.jwt() ->> 'email' IN (SELECT email FROM admin_users));