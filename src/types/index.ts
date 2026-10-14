export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
}

export interface Donor {
  id: string;
  name: string;
  age: number;
  gender: string;
  blood_group: string;
  city: string;
  phone: string;
  last_donation: string | null;
  created_at: string;
}

export interface Hospital {
  id: string;
  name: string;
  city: string;
  contact: string;
  emergency_services: boolean;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export const BLOOD_GROUPS: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
