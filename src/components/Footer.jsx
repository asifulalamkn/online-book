import Link from "next/link";
import { FaFacebook, FaGithub, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & About Section */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl transform group-hover:scale-110 transition-transform duration-200">📚</span>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
                BookApp
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your ultimate destination for discovering and borrowing books. We make reading accessible for everyone, everywhere.
            </p>
            <div className="flex gap-5 text-gray-400">
              <Link href="#" className="hover:text-blue-600 transition-all duration-300"><FaFacebook size={20} /></Link>
              <Link href="#" className="hover:text-blue-600 transition-all duration-300"><FaTwitter size={20} /></Link>
              <Link href="#" className="hover:text-blue-600 transition-all duration-300"><FaGithub size={20} /></Link>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Home</Link></li>
              <li><Link href="/books" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">All Books</Link></li>
              <li><Link href="/profile" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">My Profile</Link></li>
              <li><Link href="/about" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">Support</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 text-sm">
                <FaMapMarkerAlt className="text-blue-600 mt-1" />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm">
                <FaEnvelope className="text-blue-600" />
                <span>support@bookapp.com</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm">
                <FaPhoneAlt className="text-blue-600" />
                <span>+880 1700-000000</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs font-medium">
            © {new Date().getFullYear()} BookApp Digital Library. All rights reserved.
          </p>
          <div className="flex gap-8">
            <span className="text-[10px] text-gray-300 uppercase tracking-widest">Designed by Asiful Alam</span>
          </div>
        </div>
      </div>
    </footer>
  );
}