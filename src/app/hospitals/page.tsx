'use client';

import { useEffect, useState } from 'react';
import { Building2, Phone, MapPin, AlertCircle } from 'lucide-react';
import { Hospital } from '@/types';
import Link from 'next/link';

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await fetch('/api/hospitals');
      const data = await response.json();
      setHospitals(data.hospitals || []);
    } catch (error) {
      console.error('Error fetching hospitals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group hospitals by city
  const groupedByCity = filteredHospitals.reduce((acc, hospital) => {
    if (!acc[hospital.city]) {
      acc[hospital.city] = [];
    }
    acc[hospital.city].push(hospital);
    return acc;
  }, {} as Record<string, Hospital[]>);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-green-100 rounded-full">
              <Building2 className="h-10 w-10 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Hospital Directory</h1>
          <p className="text-gray-600 mt-2">
            Find partner hospitals with blood bank services
          </p>
        </div>

        {/* Search */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
              placeholder="Search by hospital name or city..."
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{hospitals.length}</div>
            <p className="text-gray-600">Partner Hospitals</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {hospitals.filter(h => h.emergency_services).length}
            </div>
            <p className="text-gray-600">24/7 Emergency Services</p>
          </div>
          <div className="card text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {Object.keys(groupedByCity).length}
            </div>
            <p className="text-gray-600">Cities Covered</p>
          </div>
        </div>

        {/* Hospitals List */}
        {Object.keys(groupedByCity).length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedByCity).map(([city, cityHospitals]) => (
              <div key={city}>
                <div className="flex items-center mb-4">
                  <MapPin className="h-5 w-5 text-primary-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">{city}</h2>
                  <span className="ml-2 text-sm text-gray-500">
                    ({cityHospitals.length} hospital{cityHospitals.length !== 1 ? 's' : ''})
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cityHospitals.map((hospital) => (
                    <div key={hospital.id} className="card card-hover">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-full">
                            <Building2 className="h-5 w-5 text-green-600" />
                          </div>
                          <h3 className="font-semibold text-gray-900">{hospital.name}</h3>
                        </div>
                        {hospital.emergency_services && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-900">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Emergency
                          </span>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-gray-600">
                          <Phone className="h-4 w-4 mr-2 text-gray-400" />
                          <a
                            href={`tel:${hospital.contact}`}
                            className="hover:text-primary-600 transition-colors"
                          >
                            {hospital.contact}
                          </a>
                        </div>
                      </div>

                      <Link
                        href={`tel:${hospital.contact}`}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full text-center block hover:bg-green-700 transition-colors"
                      >
                        <Phone className="h-4 w-4 inline mr-2" />
                        Contact Hospital
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12">
            <Building2 className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              No hospitals found. Try adjusting your search.
            </p>
          </div>
        )}

        {/* Emergency Banner */}
        <div className="mt-12 card bg-gradient-to-r from-primary-600 to-primary-700 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-1">Need Blood Urgently?</h3>
              <p className="text-primary-100">
                Use our emergency SOS feature to quickly find donors and hospitals
              </p>
            </div>
            <Link
              href="/sos"
              className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center"
            >
              <AlertCircle className="h-5 w-5 mr-2" />
              Emergency SOS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
