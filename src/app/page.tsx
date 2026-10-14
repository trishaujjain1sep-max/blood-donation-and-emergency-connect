import Link from 'next/link';
import {
  Heart,
  Droplet,
  Search,
  AlertCircle,
  Users,
  MapPin,
  Clock,
  Shield,
  ArrowRight
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-white via-gray-50 to-primary-50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=1260')] bg-cover bg-center opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-100 rounded-full">
                <Heart className="h-16 w-16 text-primary-600 animate-pulse-slow" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Blood Donation and
              <span className="text-primary-600"> Emergency Connect</span> App
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Connecting Blood Donors and Recipients During Emergencies.
              Every donation saves up to three lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/register-donor"
                className="btn-primary flex items-center justify-center space-x-2 text-lg"
              >
                <Heart className="h-5 w-5" />
                <span>Get Started</span>
              </Link>
              <Link
                href="/sos"
                className="btn-secondary flex items-center justify-center space-x-2 text-lg animate-pulse"
              >
                <AlertCircle className="h-5 w-5" />
                <span>Emergency SOS</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to connect donors with those in need
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card card-hover text-center">
              <div className="inline-flex p-3 bg-primary-100 rounded-lg mb-4">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Register as Donor</h3>
              <p className="text-gray-600">
                Sign up and provide your details to join our lifesaving community
              </p>
            </div>

            <div className="card card-hover text-center">
              <div className="inline-flex p-3 bg-primary-100 rounded-lg mb-4">
                <Search className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Donors</h3>
              <p className="text-gray-600">
                Search by blood group or location to find matching donors quickly
              </p>
            </div>

            <div className="card card-hover text-center">
              <div className="inline-flex p-3 bg-primary-100 rounded-lg mb-4">
                <AlertCircle className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Emergency SOS</h3>
              <p className="text-gray-600">
                One-click emergency alert to quickly find nearby donors and hospitals
              </p>
            </div>

            <div className="card card-hover text-center">
              <div className="inline-flex p-3 bg-primary-100 rounded-lg mb-4">
                <Heart className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Lives</h3>
              <p className="text-gray-600">
                Connect with donors and hospitals to receive blood when needed most
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Making a Difference
            </h2>
            <p className="text-lg text-primary-100 max-w-2xl mx-auto">
              Our growing community is saving lives every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">15+</div>
              <div className="text-primary-200">Registered Donors</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">10</div>
              <div className="text-primary-200">Partner Hospitals</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">8</div>
              <div className="text-primary-200">Blood Groups</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">24/7</div>
              <div className="text-primary-200">Emergency Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Blood Groups Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Blood Groups Available
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We have donors for all blood types ready to help
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
              <div
                key={group}
                className="card card-hover flex items-center justify-center space-x-3 py-8"
              >
                <Droplet className="h-8 w-8 text-primary-600" />
                <span className="text-2xl font-bold text-gray-900">{group}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/search/blood-group"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <span>Search by Blood Group</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Donate Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Donate Blood?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
                    <Heart className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Save Lives
                    </h3>
                    <p className="text-gray-600">
                      One donation can save up to three lives
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
                    <Shield className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Health Benefits
                    </h3>
                    <p className="text-gray-600">
                      Regular donation improves cardiovascular health
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
                    <Clock className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Quick Process
                    </h3>
                    <p className="text-gray-600">
                      The entire process takes only 10-15 minutes
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-2 bg-primary-100 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Community Impact
                    </h3>
                    <p className="text-gray-600">
                      Help ensure blood is available for emergencies in your area
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.pexels.com/photos/3786158/pexels-photo-3786158.jpeg?auto=compress&cs=tinysrgb&w=1260"
                  alt="Blood donation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary-600 text-white p-6 rounded-xl shadow-lg">
                <Droplet className="h-12 w-12 mb-2" />
                <p className="text-2xl font-bold">Save a Life</p>
                <p className="text-primary-100">Donate Today</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Save Lives?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Join our community of blood donors and make a difference today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register-donor"
              className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-lg"
            >
              Register as Donor
            </Link>
            <Link
              href="/hospitals"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:bg-white hover:text-primary-700"
            >
              Find Hospitals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
