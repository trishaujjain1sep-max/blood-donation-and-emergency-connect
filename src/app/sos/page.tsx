'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Phone, MapPin, Droplet, Building2, User, Clock } from 'lucide-react';
import { BLOOD_GROUPS, Donor, Hospital } from '@/types';
import Link from 'next/link';

export default function SOSPage() {
  const [isActivated, setIsActivated] = useState(false);
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [location, setLocation] = useState('');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (isActivated && selectedBloodGroup && location) {
      searchDonorsAndHospitals();
    }
  }, [isActivated, selectedBloodGroup, location]);

  const handleSOSClick = () => {
    setShowForm(true);
  };

  const handleSubmitEmergency = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBloodGroup || !location) return;

    setIsLoading(true);
    setIsActivated(true);
  };

  const searchDonorsAndHospitals = async () => {
    try {
      const [donorsRes, hospitalsRes] = await Promise.all([
        fetch(`/api/donors?blood_group=${selectedBloodGroup}&city=${encodeURIComponent(location)}`),
        fetch(`/api/hospitals?city=${encodeURIComponent(location)}`),
      ]);

      const donorsData = await donorsRes.json();
      const hospitalsData = await hospitalsRes.json();

      setDonors(donorsData.donors || []);
      setHospitals(hospitalsData.hospitals || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', color: 'red' },
    { name: 'National Blood Hotline', number: '1-800-RED-CROSS', color: 'primary' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Emergency SOS
          </h1>
          <p className="text-xl text-gray-600">
            Quickly find blood donors and hospitals in emergency situations
          </p>
        </div>

        {!showForm ? (
          /* SOS Button */
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={handleSOSClick}
              className="relative group"
            >
              {/* Outer pulse rings */}
              <div className="absolute inset-0 bg-primary-500 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-0 bg-primary-600 rounded-full animate-pulse opacity-30 scale-125"></div>

              {/* Main button */}
              <div className="relative w-64 h-64 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center shadow-2xl transform transition-transform hover:scale-105 group-active:scale-95">
                <div className="text-center text-white">
                  <AlertCircle className="h-20 w-20 mx-auto mb-4 animate-bounce-slow" />
                  <span className="text-4xl font-bold">SOS</span>
                  <p className="text-sm text-primary-200 mt-2">Click for Emergency</p>
                </div>
              </div>
            </button>

            {/* Emergency Contacts */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md">
              {emergencyContacts.map((contact) => (
                <Link
                  key={contact.name}
                  href={`tel:${contact.number}`}
                  className="card flex items-center justify-between hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-${contact.color}-100 rounded-full`}>
                      <Phone className={`h-5 w-5 text-${contact.color}-600`} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{contact.name}</p>
                      <p className="text-sm text-gray-500">{contact.number}</p>
                    </div>
                  </div>
                  <AlertCircle className={`h-5 w-5 text-${contact.color}-600`} />
                </Link>
              ))}
            </div>
          </div>
        ) : !isActivated ? (
          /* Emergency Form */
          <div className="max-w-xl mx-auto">
            <div className="card">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-primary-100 rounded-full animate-pulse">
                  <AlertCircle className="h-10 w-10 text-primary-600" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
                Emergency Blood Request
              </h2>

              <form onSubmit={handleSubmitEmergency} className="space-y-6">
                <div>
                  <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 mb-2">
                    Required Blood Group
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Droplet className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      id="bloodGroup"
                      value={selectedBloodGroup}
                      onChange={(e) => setSelectedBloodGroup(e.target.value)}
                      className="input-field pl-10"
                      required
                    >
                      <option value="">Select Blood Group</option>
                      {BLOOD_GROUPS.map((group) => (
                        <option key={group} value={group}>
                          {group}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location / City
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="location"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="input-field pl-10"
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedBloodGroup || !location || isLoading}
                  className="btn-primary w-full text-lg py-4 flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <AlertCircle className="h-6 w-6 mr-2" />
                      Activate Emergency SOS
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Results */
          <div className="space-y-8">
            {/* Emergency Alert Banner */}
            <div className="bg-primary-600 text-white p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <AlertCircle className="h-8 w-8 animate-pulse" />
                <div>
                  <h2 className="text-xl font-bold">Emergency Activated</h2>
                  <p className="text-primary-100">
                    Blood Group: {selectedBloodGroup} | Location: {location}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsActivated(false);
                  setShowForm(false);
                  setSelectedBloodGroup('');
                  setLocation('');
                }}
                className="bg-white text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100"
              >
                Reset
              </button>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-bold text-red-900 mb-3 flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                Emergency Hotlines
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {emergencyContacts.map((contact) => (
                  <Link
                    key={contact.name}
                    href={`tel:${contact.number}`}
                    className="bg-white p-3 rounded-lg flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900">{contact.name}</span>
                    <span className="text-red-600 font-bold">{contact.number}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Searching for donors and hospitals...</p>
              </div>
            )}

            {/* Results */}
            {!isLoading && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Matching Donors */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Droplet className="h-6 w-6 mr-2 text-primary-600" />
                    Matching Donors ({donors.length})
                  </h3>

                  {donors.length > 0 ? (
                    <div className="space-y-4">
                      {donors.map((donor) => (
                        <div key={donor.id} className="card border-l-4 border-primary-600">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-primary-100 rounded-full">
                                <User className="h-5 w-5 text-primary-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{donor.name}</h4>
                                <p className="text-sm text-gray-500">{donor.city}</p>
                              </div>
                            </div>
                            <span className="text-lg font-bold text-primary-600">
                              {donor.blood_group}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-gray-600">{donor.phone}</span>
                            <Link
                              href={`tel:${donor.phone}`}
                              className="btn-primary py-2 px-4"
                            >
                              <Phone className="h-4 w-4 mr-1 inline" />
                              Call Now
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="card text-center py-8">
                      <Droplet className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No donors found for this blood group in this area</p>
                    </div>
                  )}
                </div>

                {/* Nearby Hospitals */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Building2 className="h-6 w-6 mr-2 text-green-600" />
                    Nearby Hospitals ({hospitals.length})
                  </h3>

                  {hospitals.length > 0 ? (
                    <div className="space-y-4">
                      {hospitals.map((hospital) => (
                        <div key={hospital.id} className="card border-l-4 border-green-600">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-green-100 rounded-full">
                                <Building2 className="h-5 w-5 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{hospital.name}</h4>
                                <p className="text-sm text-gray-500">{hospital.city}</p>
                              </div>
                            </div>
                            {hospital.emergency_services && (
                              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                                24/7
                              </span>
                            )}
                          </div>
                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-gray-600">{hospital.contact}</span>
                            <Link
                              href={`tel:${hospital.contact}`}
                              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                            >
                              <Phone className="h-4 w-4 mr-1 inline" />
                              Call Now
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="card text-center py-8">
                      <Building2 className="h-10 w-10 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500">No hospitals found in this area</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
