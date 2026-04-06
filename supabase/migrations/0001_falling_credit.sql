/*
  # Initial schema for EduHorizon forms

  1. New Tables
    - popup_inquiries: Stores popup form submissions
    - contact_messages: Stores contact form messages
  
  2. Security
    - RLS enabled for both tables
    - Anonymous insert policies
*/

-- Create popup inquiries table
CREATE TABLE IF NOT EXISTS popup_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  course text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for popup inquiries
ALTER TABLE popup_inquiries ENABLE ROW LEVEL SECURITY;

-- Create policy for popup inquiries
CREATE POLICY "Enable anonymous inserts for popup inquiries"
ON popup_inquiries FOR INSERT
TO anon
WITH CHECK (true);

-- Create contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS for contact messages
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policy for contact messages
CREATE POLICY "Enable anonymous inserts for contact messages"
ON contact_messages FOR INSERT
TO anon
WITH CHECK (true);