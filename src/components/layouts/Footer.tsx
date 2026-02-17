import { Link } from "react-router";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-red-300 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo & About */}
          <div>
            <img src={logo} alt="Logo" className="h-10 mb-4" />
            <p className="text-sm text-gray-700">
              Library Management System helps you manage books, track
              borrowing history, and maintain records efficiently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-white transition">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/create-books" className="hover:text-white transition">
                  Add Books
                </Link>
              </li>
              <li>
                <Link to="/borrow-summary" className="hover:text-white transition">
                  Borrow Summary
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">
              Contact
            </h3>
            <p className="text-sm">Email: shmithun84@gmail.com</p>
            <p className="text-sm">Phone: +880 1717354751</p>
            <p className="text-sm">Location: Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-red-400 mt-8 pt-6 text-center text-sm text-gray-700">
          © {new Date().getFullYear()} Library Management System. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
