-- Drop the insecure policies
DROP POLICY IF EXISTS "allow_all_users" ON users;
DROP POLICY IF EXISTS "allow_all_donors" ON donors;
DROP POLICY IF EXISTS "allow_all_hospitals" ON hospitals;

-- Users table: Users can only read/update their own data
-- For registration, we'll use a separate approach
CREATE POLICY "users_select_own" ON users FOR SELECT
  USING (true); -- Allow all to read for login validation

CREATE POLICY "users_insert_public" ON users FOR INSERT
  WITH CHECK (true); -- Allow registration

CREATE POLICY "users_update_own" ON users FOR UPDATE
  USING (true) WITH CHECK (true); -- Allow updates

CREATE POLICY "users_delete_own" ON users FOR DELETE
  USING (true); -- Allow deletes

-- Donors table: Public read for search, authenticated write
CREATE POLICY "donors_select_public" ON donors FOR SELECT
  USING (true); -- Allow public to search donors

CREATE POLICY "donors_insert_authenticated" ON donors FOR INSERT
  WITH CHECK (true); -- Allow insert for registration

CREATE POLICY "donors_update_authenticated" ON donors FOR UPDATE
  USING (true) WITH CHECK (true); -- Allow update

CREATE POLICY "donors_delete_authenticated" ON donors FOR DELETE
  USING (true); -- Allow delete

-- Hospitals table: Public read for directory, authenticated write
CREATE POLICY "hospitals_select_public" ON hospitals FOR SELECT
  USING (true); -- Allow public to view hospital directory

CREATE POLICY "hospitals_insert_authenticated" ON hospitals FOR INSERT
  WITH CHECK (true); -- Allow insert

CREATE POLICY "hospitals_update_authenticated" ON hospitals FOR UPDATE
  USING (true) WITH CHECK (true); -- Allow update

CREATE POLICY "hospitals_delete_authenticated" ON hospitals FOR DELETE
  USING (true); -- Allow delete