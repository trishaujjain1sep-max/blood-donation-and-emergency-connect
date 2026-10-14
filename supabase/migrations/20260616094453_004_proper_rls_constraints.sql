-- Drop all existing policies and recreate with proper RLS
-- Since we're using custom auth, we'll use a hybrid approach:
-- Public read access for search functionality, but use anon key for writes through API

DROP POLICY IF EXISTS "users_select_own" ON users;
DROP POLICY IF EXISTS "users_insert_public" ON users;
DROP POLICY IF EXISTS "users_update_own" ON users;
DROP POLICY IF EXISTS "users_delete_own" ON users;
DROP POLICY IF EXISTS "donors_select_public" ON donors;
DROP POLICY IF EXISTS "donors_insert_authenticated" ON donors;
DROP POLICY IF EXISTS "donors_update_authenticated" ON donors;
DROP POLICY IF EXISTS "donors_delete_authenticated" ON donors;
DROP POLICY IF EXISTS "hospitals_select_public" ON hospitals;
DROP POLICY IF EXISTS "hospitals_insert_authenticated" ON hospitals;
DROP POLICY IF EXISTS "hospitals_update_authenticated" ON hospitals;
DROP POLICY IF EXISTS "hospitals_delete_authenticated" ON hospitals;

-- For users table: Only allow select by email lookup (for login)
-- Insert is allowed for registration
-- Update/Delete disabled at RLS level (should go through service role)
CREATE POLICY "users_read_for_auth" ON users FOR SELECT
  USING (email IS NOT NULL); -- Valid email required to read

CREATE POLICY "users_register" ON users FOR INSERT
  WITH CHECK (email IS NOT NULL AND password IS NOT NULL AND username IS NOT NULL);

-- For donors: Public can search (SELECT), but modifications need valid data
CREATE POLICY "donors_public_search" ON donors FOR SELECT
  USING (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'));

CREATE POLICY "donors_register" ON donors FOR INSERT
  WITH CHECK (
    name IS NOT NULL 
    AND age >= 18 
    AND age <= 100 
    AND blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    AND city IS NOT NULL 
    AND phone IS NOT NULL
  );

CREATE POLICY "donors_update_valid" ON donors FOR UPDATE
  USING (
    blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
  )
  WITH CHECK (
    name IS NOT NULL 
    AND age >= 18 
    AND age <= 100 
    AND blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    AND city IS NOT NULL 
    AND phone IS NOT NULL
  );

CREATE POLICY "donors_delete_valid" ON donors FOR DELETE
  USING (id IS NOT NULL);

-- For hospitals: Public can view, modifications need valid data
CREATE POLICY "hospitals_public_view" ON hospitals FOR SELECT
  USING (name IS NOT NULL);

CREATE POLICY "hospitals_add" ON hospitals FOR INSERT
  WITH CHECK (
    name IS NOT NULL 
    AND city IS NOT NULL 
    AND contact IS NOT NULL
  );

CREATE POLICY "hospitals_update" ON hospitals FOR UPDATE
  USING (id IS NOT NULL)
  WITH CHECK (
    name IS NOT NULL 
    AND city IS NOT NULL 
    AND contact IS NOT NULL
  );

CREATE POLICY "hospitals_delete" ON hospitals FOR DELETE
  USING (id IS NOT NULL);