import Link from 'next/link';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary-500" />
              <span className="text-xl font-bold">BloodConnect</span>
            </div>
            <p className="text-gray-400">
              Connecting blood donors and recipients during emergencies. Save lives, donate blood.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/search/blood-group" className="text-gray-400 hover:text-white transition-colors">
                  Search by Blood Group
                </Link>
              </li>
              <li>
                <Link href="/search/location" className="text-gray-400 hover:text-white transition-colors">
                  Find Nearby
                </Link>
              </li>
              <li>
                <Link href="/hospitals" className="text-gray-400 hover:text-white transition-colors">
                  Hospital Directory
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sos" className="text-primary-500 hover:text-primary-400 font-semibold transition-colors">
                  SOS Emergency
                </Link>
              </li>
              <li>
                <Link href="/register-donor" className="text-gray-400 hover:text-white transition-colors">
                  Become a Donor
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>contact@bloodconnect.org</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>+1 (800) BLOOD-HELP</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>Nationwide Network</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BloodConnect. All rights reserved. Saving lives together.</p>
        </div>
      </div>
    </footer>
  );
}
