/*
  # Add consultation status enum and update bookings table

  1. Changes
    - Create consultation_status enum type
    - Create temporary column for status conversion
    - Convert existing status data
    - Replace old status column with new enum column
  
  2. Security
    - Maintain existing RLS policies
*/

-- Create consultation status enum type
DO $$ BEGIN
  CREATE TYPE consultation_status AS ENUM (
    'pending',
    'confirmed',
    'completed',
    'cancelled',
    'rescheduled'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Add new status column with enum type
ALTER TABLE consultation_bookings 
ADD COLUMN status_new consultation_status;

-- Update the new status column with converted values
UPDATE consultation_bookings 
SET status_new = CASE 
  WHEN status = 'pending' THEN 'pending'::consultation_status
  WHEN status = 'confirmed' THEN 'confirmed'::consultation_status
  WHEN status = 'completed' THEN 'completed'::consultation_status
  WHEN status = 'cancelled' THEN 'cancelled'::consultation_status
  WHEN status = 'rescheduled' THEN 'rescheduled'::consultation_status
  ELSE 'pending'::consultation_status
END;

-- Drop old status column
ALTER TABLE consultation_bookings 
DROP COLUMN status;

-- Add new status column
ALTER TABLE consultation_bookings 
ALTER COLUMN status_new SET DEFAULT 'pending'::consultation_status;

-- Rename the new column to status
ALTER TABLE consultation_bookings 
ALTER COLUMN status_new SET NOT NULL;

ALTER TABLE consultation_bookings 
RENAME COLUMN status_new TO status;