'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import {
  Users,
  Droplet,
  Building2,
  AlertCircle,
  UserPlus,
  Clock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { Donor, Hospital } from '@/types';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalDonors: 0,
    bloodGroups: 0,
    hospitals: 0,
    recentDonors: [] as Donor[],
    recentHospitals: [] as Hospital[],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back{user ? `, ${user.username}` : ''}! Here&apos;s your overview.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Donors</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.totalDonors}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-full">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>Active community</span>
            </div>
          </div>

          <div className="card card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Blood Groups</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.bloodGroups}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Droplet className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-600">
              <Droplet className="h-4 w-4 mr-1" />
              <span>All types covered</span>
            </div>
          </div>

          <div className="card card-hover">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Partner Hospitals</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.hospitals}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Building2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <Building2 className="h-4 w-4 mr-1" />
              <span>Nationwide network</span>
            </div>
          </div>

          <div className="card card-hover bg-gradient-to-br from-primary-600 to-primary-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-primary-100">Emergency</p>
                <p className="text-xl font-bold text-white mt-1">Need Blood?</p>
              </div>
              <div className="p-3 bg-primary-500 rounded-full">
                <AlertCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <Link
              href="/sos"
              className="mt-4 flex items-center text-sm text-white hover:underline"
            >
              <span>Click for SOS</span>
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link href="/register-donor" className="card card-hover group">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
                <UserPlus className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Register as Donor</h3>
                <p className="text-sm text-gray-500">Join our lifesaving community</p>
              </div>
            </div>
          </Link>

          <Link href="/search/blood-group" className="card card-hover group">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Droplet className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Search by Blood Group</h3>
                <p className="text-sm text-gray-500">Find matching donors</p>
              </div>
            </div>
          </Link>

          <Link href="/search/location" className="card card-hover group">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Find Nearby</h3>
                <p className="text-sm text-gray-500">Donors and hospitals nearby</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Donors */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Recent Donors</h2>
              <Link href="/admin" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {stats.recentDonors.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No donors registered yet</p>
              ) : (
                stats.recentDonors.map((donor) => (
                  <div key={donor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary-100 rounded-full">
                        <Users className="h-4 w-4 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{donor.name}</p>
                        <p className="text-sm text-gray-500">{donor.city}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {donor.blood_group}
                      </span>
                      {donor.last_donation && (
                        <p className="text-xs text-gray-400 mt-1">
                          <Clock className="h-3 w-3 inline mr-1" />
                          Last: {new Date(donor.last_donation).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Partner Hospitals */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Partner Hospitals</h2>
              <Link href="/hospitals" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {stats.recentHospitals.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No hospitals listed yet</p>
              ) : (
                stats.recentHospitals.map((hospital) => (
                  <div key={hospital.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-full">
                        <Building2 className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{hospital.name}</p>
                        <p className="text-sm text-gray-500">{hospital.city}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {hospital.emergency_services && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          24/7 Emergency
                        </span>
                      )}
                      <p className="text-xs text-gray-400 mt-1">{hospital.contact}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
