'use client';

import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { Menu, X, Heart, LogOut, User as UserIcon, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-gray-900">BloodConnect</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Dashboard
            </Link>
            <Link href="/search/blood-group" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Search Blood
            </Link>
            <Link href="/search/location" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Find Nearby
            </Link>
            <Link href="/hospitals" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
              Hospitals
            </Link>
            <Link href="/sos" className="text-primary-600 hover:text-primary-700 transition-colors font-bold">
              SOS
            </Link>
          </div>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/admin" className="flex items-center space-x-1 text-gray-700 hover:text-primary-600">
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Admin</span>
                </Link>
                <div className="flex items-center space-x-2 text-gray-700">
                  <UserIcon className="h-5 w-5" />
                  <span>{user.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link href="/login" className="btn-primary">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-700 hover:text-primary-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                Dashboard
              </Link>
              <Link href="/search/blood-group" className="text-gray-700 hover:text-primary-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                Search Blood
              </Link>
              <Link href="/search/location" className="text-gray-700 hover:text-primary-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                Find Nearby
              </Link>
              <Link href="/hospitals" className="text-gray-700 hover:text-primary-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                Hospitals
              </Link>
              <Link href="/sos" className="text-primary-600 font-bold" onClick={() => setIsMenuOpen(false)}>
                SOS Emergency
              </Link>
              <hr className="border-gray-200" />
              {user ? (
                <>
                  <Link href="/admin" className="text-gray-700 hover:text-primary-600" onClick={() => setIsMenuOpen(false)}>
                    Admin Panel
                  </Link>
                  <button onClick={logout} className="text-left text-primary-600">
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-primary-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
