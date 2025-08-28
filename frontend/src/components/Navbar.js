// src/components/Navbar.js
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authcontext";

// ✅ Logout Button
const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/login"; // redirect after logout
  };

  return (
    <button
      onClick={handleLogout}
      className="ml-4 px-4 py-1 bg-red-500 text-white font-bold rounded hover:bg-red-600"
    >
      Logout
    </button>
  );
};

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { token } = useContext(AuthContext);

  return (
    <header className="w-full bg-[#1F2833] shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-[#66FCF1] hover:text-[#45A29E] transition"
        >
          Milestone Club
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {!token && (
            <>
              <Link className="hover:text-[#66FCF1]" to="/register">
                Register
              </Link>
              <Link className="hover:text-[#66FCF1]" to="/login">
                Login
              </Link>
            </>
          )}
          <Link className="hover:text-[#66FCF1]" to="/leaderboard">
            Leaderboard
          </Link>
          <Link className="hover:text-[#66FCF1]" to="/admin">
            Dashboard
          </Link>
          <Link className="hover:text-[#66FCF1]" to="/milestone">
            Milestone
          </Link>
          {token && <LogoutButton />}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#66FCF1] focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-[#1F2833] px-6 pb-4 space-y-2">
          {!token && (
            <>
              <Link
                className="block hover:text-[#66FCF1]"
                to="/register"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
              <Link
                className="block hover:text-[#66FCF1]"
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            </>
          )}
          <Link
            className="block hover:text-[#66FCF1]"
            to="/leaderboard"
            onClick={() => setMenuOpen(false)}
          >
            Leaderboard
          </Link>
          <Link
            className="block hover:text-[#66FCF1]"
            to="/admin"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            className="block hover:text-[#66FCF1]"
            to="/milestone"
            onClick={() => setMenuOpen(false)}
          >
            Milestone
          </Link>
          {token && <LogoutButton />}
        </div>
      )}
    </header>
  );
}
