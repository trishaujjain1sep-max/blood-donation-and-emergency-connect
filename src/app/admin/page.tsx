'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  User,
  Droplet,
  Building2,
  Plus,
  Edit,
  Trash2,
  Phone,
  MapPin,
  Calendar,
  X
} from 'lucide-react';
import { Donor, Hospital, BLOOD_GROUPS } from '@/types';

type Tab = 'donors' | 'hospitals';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('donors');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Donor form state
  const [showDonorModal, setShowDonorModal] = useState(false);
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);
  const [donorForm, setDonorForm] = useState({
    name: '',
    age: '',
    gender: '',
    blood_group: '',
    city: '',
    phone: '',
    last_donation: '',
  });

  // Hospital form state
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [editingHospital, setEditingHospital] = useState<Hospital | null>(null);
  const [hospitalForm, setHospitalForm] = useState({
    name: '',
    city: '',
    contact: '',
    emergency_services: true,
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    fetchData();
  }, [user, router]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [donorsRes, hospitalsRes] = await Promise.all([
        fetch('/api/donors'),
        fetch('/api/hospitals'),
      ]);

      const donorsData = await donorsRes.json();
      const hospitalsData = await hospitalsRes.json();

      setDonors(donorsData.donors || []);
      setHospitals(hospitalsData.hospitals || []);
    } catch (error) {
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  // Donor CRUD operations
  const openDonorModal = (donor?: Donor) => {
    if (donor) {
      setEditingDonor(donor);
      setDonorForm({
        name: donor.name,
        age: donor.age.toString(),
        gender: donor.gender,
        blood_group: donor.blood_group,
        city: donor.city,
        phone: donor.phone,
        last_donation: donor.last_donation || '',
      });
    } else {
      setEditingDonor(null);
      setDonorForm({
        name: '',
        age: '',
        gender: '',
        blood_group: '',
        city: '',
        phone: '',
        last_donation: '',
      });
    }
    setShowDonorModal(true);
  };

  const handleDonorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      ...donorForm,
      age: parseInt(donorForm.age),
      last_donation: donorForm.last_donation || null,
    };

    try {
      if (editingDonor) {
        const response = await fetch('/api/donors', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingDonor.id, ...body }),
        });
        if (!response.ok) throw new Error();
        toast.success('Donor updated successfully');
      } else {
        const response = await fetch('/api/donors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        if (!response.ok) throw new Error();
        toast.success('Donor added successfully');
      }
      setShowDonorModal(false);
      fetchData();
    } catch {
      toast.error('Failed to save donor');
    }
  };

  const deleteDonor = async (id: string) => {
    if (!confirm('Are you sure you want to delete this donor?')) return;

    try {
      const response = await fetch(`/api/donors?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error();
      toast.success('Donor deleted successfully');
      fetchData();
    } catch {
      toast.error('Failed to delete donor');
    }
  };

  // Hospital CRUD operations
  const openHospitalModal = (hospital?: Hospital) => {
    if (hospital) {
      setEditingHospital(hospital);
      setHospitalForm({
        name: hospital.name,
        city: hospital.city,
        contact: hospital.contact,
        emergency_services: hospital.emergency_services,
      });
    } else {
      setEditingHospital(null);
      setHospitalForm({
        name: '',
        city: '',
        contact: '',
        emergency_services: true,
      });
    }
    setShowHospitalModal(true);
  };

  const handleHospitalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingHospital) {
        const response = await fetch('/api/hospitals', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingHospital.id, ...hospitalForm }),
        });
        if (!response.ok) throw new Error();
        toast.success('Hospital updated successfully');
      } else {
        const response = await fetch('/api/hospitals', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hospitalForm),
        });
        if (!response.ok) throw new Error();
        toast.success('Hospital added successfully');
      }
      setShowHospitalModal(false);
      fetchData();
    } catch {
      toast.error('Failed to save hospital');
    }
  };

  const deleteHospital = async (id: string) => {
    if (!confirm('Are you sure you want to delete this hospital?')) return;

    try {
      const response = await fetch(`/api/hospitals?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error();
      toast.success('Hospital deleted successfully');
      fetchData();
    } catch {
      toast.error('Failed to delete hospital');
    }
  };

  if (!user) {
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-1">
            Manage donors and hospitals
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab('donors')}
            className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all ${
              activeTab === 'donors'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="h-5 w-5" />
            <span>Donors ({donors.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('hospitals')}
            className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all ${
              activeTab === 'hospitals'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Building2 className="h-5 w-5" />
            <span>Hospitals ({hospitals.length})</span>
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : activeTab === 'donors' ? (
          /* Donors Tab */
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => openDonorModal()}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Donor</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Blood Group
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Donation
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {donors.map((donor) => (
                      <tr key={donor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="p-2 bg-primary-100 rounded-full mr-3">
                              <User className="h-4 w-4 text-primary-600" />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{donor.name}</div>
                              <div className="text-sm text-gray-500">
                                {donor.age} yrs, {donor.gender}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-primary-100 text-primary-800">
                            {donor.blood_group}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {donor.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {donor.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {donor.last_donation
                            ? new Date(donor.last_donation).toLocaleDateString()
                            : 'N/A'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                          <button
                            onClick={() => openDonorModal(donor)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteDonor(donor.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          /* Hospitals Tab */
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => openHospitalModal()}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span>Add Hospital</span>
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        City
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Emergency
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {hospitals.map((hospital) => (
                      <tr key={hospital.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="p-2 bg-green-100 rounded-full mr-3">
                              <Building2 className="h-4 w-4 text-green-600" />
                            </div>
                            <div className="font-medium text-gray-900">
                              {hospital.name}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {hospital.city}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {hospital.contact}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {hospital.emergency_services ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              24/7
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                          <button
                            onClick={() => openHospitalModal(hospital)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => deleteHospital(hospital.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Donor Modal */}
        {showDonorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">
                  {editingDonor ? 'Edit Donor' : 'Add Donor'}
                </h2>
                <button onClick={() => setShowDonorModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleDonorSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={donorForm.name}
                    onChange={(e) => setDonorForm({ ...donorForm, name: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={donorForm.age}
                      onChange={(e) => setDonorForm({ ...donorForm, age: e.target.value })}
                      className="input-field"
                      min="18"
                      max="100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={donorForm.gender}
                      onChange={(e) => setDonorForm({ ...donorForm, gender: e.target.value })}
                      className="input-field"
                      required
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                  <select
                    value={donorForm.blood_group}
                    onChange={(e) => setDonorForm({ ...donorForm, blood_group: e.target.value })}
                    className="input-field"
                    required
                  >
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map((g) => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={donorForm.city}
                    onChange={(e) => setDonorForm({ ...donorForm, city: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={donorForm.phone}
                    onChange={(e) => setDonorForm({ ...donorForm, phone: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Donation Date
                  </label>
                  <input
                    type="date"
                    value={donorForm.last_donation}
                    onChange={(e) => setDonorForm({ ...donorForm, last_donation: e.target.value })}
                    className="input-field"
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <button type="button" onClick={() => setShowDonorModal(false)} className="flex-1 btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    {editingDonor ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Hospital Modal */}
        {showHospitalModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-semibold">
                  {editingHospital ? 'Edit Hospital' : 'Add Hospital'}
                </h2>
                <button onClick={() => setShowHospitalModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleHospitalSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={hospitalForm.name}
                    onChange={(e) => setHospitalForm({ ...hospitalForm, name: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={hospitalForm.city}
                    onChange={(e) => setHospitalForm({ ...hospitalForm, city: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
                  <input
                    type="tel"
                    value={hospitalForm.contact}
                    onChange={(e) => setHospitalForm({ ...hospitalForm, contact: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emergency"
                    checked={hospitalForm.emergency_services}
                    onChange={(e) => setHospitalForm({ ...hospitalForm, emergency_services: e.target.checked })}
                    className="h-4 w-4 text-primary-600 rounded"
                  />
                  <label htmlFor="emergency" className="ml-2 text-sm text-gray-700">
                    24/7 Emergency Services
                  </label>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button type="button" onClick={() => setShowHospitalModal(false)} className="flex-1 btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" className="flex-1 btn-primary">
                    {editingHospital ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
