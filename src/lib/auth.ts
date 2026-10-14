import bcrypt from 'bcryptjs';
import { supabase, supabaseAdmin } from './supabase';
import { User } from '@/types';

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createUser(username: string, email: string, password: string): Promise<User | null> {
  const hashedPassword = await hashPassword(password);

  const { data, error } = await supabaseAdmin
    .from('users')
    .insert([
      { username, email, password: hashedPassword }
    ])
    .select('id, username, email, created_at')
    .single();

  if (error) {
    console.error('Error creating user:', error);
    return null;
  }

  return data as User;
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('id, username, email, password, created_at')
    .eq('email', email)
    .single();

  if (error || !data) {
    return null;
  }

  const isValid = await verifyPassword(password, data.password);

  if (!isValid) {
    return null;
  }

  const { password: _, ...userWithoutPassword } = data;
  return userWithoutPassword as User;
}

export async function getUserById(id: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('id, username, email, created_at')
    .eq('id', id)
    .single();

  if (error) {
    return null;
  }

  return data as User;
}
