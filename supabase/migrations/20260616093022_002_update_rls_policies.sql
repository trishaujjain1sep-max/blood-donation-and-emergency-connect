-- Update users table to work with custom auth
-- We'll use a simple approach since we're not using Supabase Auth
-- Make the tables have public read access for this demo app

-- Drop existing policies and create new ones for anonymous access
DROP POLICY IF EXISTS "select_users_authenticated" ON users;
DROP POLICY IF EXISTS "insert_users_authenticated" ON users;
DROP POLICY IF EXISTS "update_users_authenticated" ON users;
DROP POLICY IF EXISTS "delete_users_authenticated" ON users;

DROP POLICY IF EXISTS "select_donors_public" ON donors;
DROP POLICY IF EXISTS "insert_donors_authenticated" ON donors;
DROP POLICY IF EXISTS "update_donors_authenticated" ON donors;
DROP POLICY IF EXISTS "delete_donors_authenticated" ON donors;

DROP POLICY IF EXISTS "select_hospitals_public" ON hospitals;
DROP POLICY IF EXISTS "insert_hospitals_authenticated" ON hospitals;
DROP POLICY IF EXISTS "update_hospitals_authenticated" ON hospitals;
DROP POLICY IF EXISTS "delete_hospitals_authenticated" ON hospitals;

-- Create policies for anonymous access (for demo purposes)
CREATE POLICY "allow_all_users" ON users FOR ALL USING (true);
CREATE POLICY "allow_all_donors" ON donors FOR ALL USING (true);
CREATE POLICY "allow_all_hospitals" ON hospitals FOR ALL USING (true);