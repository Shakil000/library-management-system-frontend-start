import { useState } from "react";
import { ModeToggle } from "../mode-toggle";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { AddBooksModel } from "../module/AddBooksModal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [opens, setOpens] = useState(false);

  return (
    <nav className="fixed top-0 inset-x-0 w-full bg-red-300 shadow-2xl z-50">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="shrink-0">
          <Link to="/">
            <img src={logo} alt="Your Company" className="h-10 w-auto" />
          </Link>
        </div>
        {isOpen ? (
          ""
        ) : (
          <div className="lg:hidden">
            <ModeToggle></ModeToggle>
          </div>
        )}

        {/* Desktop Links */}
        <div className="hidden sm:block">
          <div className="flex space-x-6">
            {/* Add Books Action Button */}
            <button
              onClick={() => setOpens(true)}
              className="bg-[#F8B333] text-white px-4 py-2 rounded-md text-sm font-medium shadow-md"
              type="button"
            >
              Add Books
            </button>

            {/* Modal component (বাটনের বাইরে রাখো) */}
            <AddBooksModel open={opens} setOpen={setOpens} />
            <Link
              to="/"
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/books"
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              All Books
            </Link>
            <Link
              to="borrowed-book"
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Borrowed Books
            </Link>
            <Link
              to="borrow-summary"
              className="text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Borrowed Books Summary
            </Link>
            <div className="hidden sm:flex items-center gap-4">
              {/* your links */}
              <div className="flex space-x-6"> </div>

              {/* theme buttons */}
              <ModeToggle />
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Links */}
      {isOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-red-300 shadow-2xl px-4 pb-4 space-y-2">
          <p className="block bg-orange-400 text-white px-3 py-2 rounded-md text-base font-bold">
            Library Management System
          </p>

          <Link
            to="/"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link
            to="/books"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
          >
            All Books
          </Link>
          <Link
            to="/borrow-summary"
            className="block text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-base font-medium"
          >
            Borrow Summary
          </Link>

          <div className="flex items-center justify-center mt-5">
            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
