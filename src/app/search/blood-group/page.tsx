'use client';

import { useState } from 'react';
import { Droplet, Phone, MapPin, Clock, Search, User } from 'lucide-react';
import { BLOOD_GROUPS, Donor } from '@/types';
import Link from 'next/link';

export default function SearchByBloodGroupPage() {
  const [selectedGroup, setSelectedGroup] = useState('');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!selectedGroup) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(`/api/donors?blood_group=${selectedGroup}`);
      const data = await response.json();
      setDonors(data.donors || []);
    } catch (error) {
      console.error('Error searching donors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary-100 rounded-full">
              <Droplet className="h-10 w-10 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Search by Blood Group</h1>
          <p className="text-gray-600 mt-2">
            Find donors with a specific blood type
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="card">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-2">
                  Select Blood Group
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Droplet className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    id="bloodGroup"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="input-field pl-10"
                  >
                    <option value="">Choose Blood Group</option>
                    {BLOOD_GROUPS.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={!selectedGroup || isLoading}
                  className="btn-primary flex items-center justify-center min-w-[120px]"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        {hasSearched && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {donors.length > 0
                  ? `${donors.length} donor${donors.length !== 1 ? 's' : ''} found`
                  : 'No donors found'}
              </h2>
              {donors.length > 0 && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  Blood Group: {selectedGroup}
                </span>
              )}
            </div>

            {donors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {donors.map((donor) => (
                  <div key={donor.id} className="card card-hover">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-primary-100 rounded-full">
                          <User className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{donor.name}</h3>
                          <p className="text-sm text-gray-500">
                            {donor.age} years, {donor.gender}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-primary-600 text-white">
                        {donor.blood_group}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{donor.city}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <span>{donor.phone}</span>
                      </div>
                      {donor.last_donation && (
                        <div className="flex items-center text-gray-600">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="text-sm">
                            Last donation: {new Date(donor.last_donation).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <Link
                      href={`tel:${donor.phone}`}
                      className="mt-4 btn-primary w-full text-center block"
                    >
                      <Phone className="h-4 w-4 inline mr-2" />
                      Contact Donor
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <Droplet className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">
                  No donors found with blood group {selectedGroup}. Try another blood group or{' '}
                  <Link href="/register-donor" className="text-primary-600 hover:underline">
                    register as a donor
                  </Link>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Initial State */}
        {!hasSearched && (
          <div className="card text-center py-12">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              Select a blood group and click search to find matching donors
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
