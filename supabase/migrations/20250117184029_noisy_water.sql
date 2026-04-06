/*
  # Create notifications table

  1. New Tables
    - `notifications`
      - `id` (uuid, primary key)
      - `recipient_name` (text)
      - `recipient_email` (text)
      - `recipient_phone` (text)
      - `type` (text)
      - `status` (text)
      - `appointment_date` (date)
      - `appointment_time` (text)
      - `created_at` (timestamptz)
      - `processed_at` (timestamptz)

  2. Security
    - Enable RLS on `notifications` table
    - Add policies for authenticated users
*/

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_name text NOT NULL,
  recipient_email text NOT NULL,
  recipient_phone text NOT NULL,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  appointment_date date,
  appointment_time text,
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz,
  error_message text
);

-- Enable RLS
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert access for all users"
  ON notifications FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users"
  ON notifications FOR SELECT
  TO authenticated
  USING (true);