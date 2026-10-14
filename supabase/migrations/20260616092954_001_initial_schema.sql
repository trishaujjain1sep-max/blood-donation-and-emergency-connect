-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create donors table
CREATE TABLE IF NOT EXISTS donors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
  gender VARCHAR(20) NOT NULL,
  blood_group VARCHAR(5) NOT NULL CHECK (blood_group IN ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')),
  city VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  last_donation DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create hospitals table
CREATE TABLE IF NOT EXISTS hospitals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  city VARCHAR(100) NOT NULL,
  contact VARCHAR(20) NOT NULL,
  emergency_services BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE hospitals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users
CREATE POLICY "select_users_authenticated" ON users FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_users_authenticated" ON users FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_users_authenticated" ON users FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_users_authenticated" ON users FOR DELETE
  TO authenticated USING (true);

-- Create RLS policies for donors (publicly readable for search)
CREATE POLICY "select_donors_public" ON donors FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_donors_authenticated" ON donors FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_donors_authenticated" ON donors FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_donors_authenticated" ON donors FOR DELETE
  TO authenticated USING (true);

-- Create RLS policies for hospitals (publicly readable for directory)
CREATE POLICY "select_hospitals_public" ON hospitals FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_hospitals_authenticated" ON hospitals FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_hospitals_authenticated" ON hospitals FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_hospitals_authenticated" ON hospitals FOR DELETE
  TO authenticated USING (true);

-- Create indexes for search optimization
CREATE INDEX IF NOT EXISTS idx_donors_blood_group ON donors(blood_group);
CREATE INDEX IF NOT EXISTS idx_donors_city ON donors(city);
CREATE INDEX IF NOT EXISTS idx_hospitals_city ON hospitals(city);