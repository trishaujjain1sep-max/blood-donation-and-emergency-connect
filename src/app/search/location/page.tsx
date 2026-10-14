'use client';

import { useState } from 'react';
import { MapPin, Phone, Building2, Droplet, Search, User, Clock } from 'lucide-react';
import { Donor, Hospital } from '@/types';
import Link from 'next/link';

export default function SearchByLocationPage() {
  const [city, setCity] = useState('');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const [donorsRes, hospitalsRes] = await Promise.all([
        fetch(`/api/donors?city=${encodeURIComponent(city)}`),
        fetch(`/api/hospitals?city=${encodeURIComponent(city)}`),
      ]);

      const donorsData = await donorsRes.json();
      const hospitalsData = await hospitalsRes.json();

      setDonors(donorsData.donors || []);
      setHospitals(hospitalsData.hospitals || []);
    } catch (error) {
      console.error('Error searching:', error);
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
              <MapPin className="h-10 w-10 text-primary-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Search by Location</h1>
          <p className="text-gray-600 mt-2">
            Find donors and hospitals in your area
          </p>
        </div>

        {/* Search Box */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="card">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  Enter City
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    className="input-field pl-10"
                    placeholder="Enter city name"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  disabled={!city.trim() || isLoading}
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
          <div className="space-y-12">
            {/* Hospitals Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Building2 className="h-6 w-6 mr-2 text-green-600" />
                Hospitals in {city}
                <span className="ml-2 text-base font-normal text-gray-500">
                  ({hospitals.length} found)
                </span>
              </h2>

              {hospitals.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hospitals.map((hospital) => (
                    <div key={hospital.id} className="card card-hover">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-full">
                            <Building2 className="h-5 w-5 text-green-600" />
                          </div>
                          <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                        </div>
                        {hospital.emergency_services && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            24/7 Emergency
                          </span>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{hospital.city}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{hospital.contact}</span>
                        </div>
                      </div>

                      <Link
                        href={`tel:${hospital.contact}`}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full text-center block hover:bg-green-700 transition-colors"
                      >
                        <Phone className="h-4 w-4 inline mr-2" />
                        Call Hospital
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card text-center py-8">
                  <Building2 className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No hospitals found in this city</p>
                </div>
              )}
            </div>

            {/* Donors Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Droplet className="h-6 w-6 mr-2 text-primary-600" />
                Donors in {city}
                <span className="ml-2 text-base font-normal text-gray-500">
                  ({donors.length} found)
                </span>
              </h2>

              {donors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {donors.map((donor) => (
                    <div key={donor.id} className="card card-hover">
                      <div className="flex items-start justify-between mb-3">
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
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <span>{donor.phone}</span>
                        </div>
                        {donor.last_donation && (
                          <div className="flex items-center text-gray-600">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            <span className="text-sm">
                              Last: {new Date(donor.last_donation).toLocaleDateString()}
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
                <div className="card text-center py-8">
                  <Droplet className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">
                    No donors found in this city.{' '}
                    <Link href="/register-donor" className="text-primary-600 hover:underline">
                      Register as a donor
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Initial State */}
        {!hasSearched && (
          <div className="card text-center py-12">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              Enter a city name and click search to find nearby donors and hospitals
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
