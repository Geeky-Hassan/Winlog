import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../assets/footer-logo.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-footer text-white">
      <div className="max-w-6xl mx-auto px-4 pt-10 pb-5 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Column */}
          <div className="mb-8 md:mb-0  flex items-center justify-center">
            <Link href="/" className="flex items-center">
              <img src={logo} className="w-[200px]" alt="" />
            </Link>
          </div>

          {/* Useful Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-another_red_violet-700 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-another_red_violet-700 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-another_red_violet-700 transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-another_red_violet-700 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="hover:text-another_red_violet-700 transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-another_red_violet-700 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-another_red_violet-700 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-another_red_violet-700 transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us Column */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-white-400 mb-4">
              We are dedicated to providing top-notch services and products to
              our customers. Our mission is to create value and make a
              difference in everything we do.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white mt-10 pt-6 text-sm text-center text-white-400">
          <p>
            &copy; {new Date().getFullYear()} YourCompany. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
