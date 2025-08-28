import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ReactTyped } from "react-typed";
import { AuthProvider, AuthContext } from "./context/authcontext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import TeamDashboard from "./pages/TeamDashboard";
import Attendance from "./pages/Attendance";
import Leaderboard from "./pages/Leaderboard";
import Milestone from "./pages/Milestone";
import ScoreAudit from "./pages/ScoreAudit";
import CategoryPicker from "./pages/CategoryPicker";
import Spin from "./pages/Spin";
import GetCategory from "./pages/GetCategory";

// ✅ LogoutButton Component
const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    window.location.href = "/login"; // force reload after logout
  };

  return (
    <button
      onClick={handleLogout}
      className="ml-0 md:ml-4 px-3 py-1 text-sm sm:px-4 sm:py-1 sm:text-base bg-red-500 text-white font-bold rounded hover:bg-red-600 w-full md:w-auto"
    >
      Logout
    </button>
  );
};

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  const location = useLocation();

  // ✅ Hide Navbar on login/register
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="bg-[#0B0C10] min-h-screen text-[#C5C6C7] flex flex-col">
      {/* Header/Navbar */}
      {!hideNavbar && (
        <header className="w-full bg-[#1F2833] shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-6">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold text-[#66FCF1] hover:text-[#45A29E] transition"
            >
              Milestone Club
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex flex-wrap gap-4 items-center">
              {!isAuthenticated && (
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
              {isAuthenticated && <LogoutButton />}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-[#66FCF1] text-2xl focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              ☰
            </button>
          </div>

          {/* Mobile Nav */}
          {menuOpen && (
            <div className="md:hidden bg-[#1F2833] px-4 sm:px-6 pb-4 space-y-2">
              {!isAuthenticated && (
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
              {isAuthenticated && <LogoutButton />}
            </div>
          )}
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 overflow-x-hidden">
        <Routes>
          <Route
            path="/"
            element={
              <div className="flex justify-center items-center min-h-[70vh] px-2">
                <div className="w-full max-w-2xl p-6 sm:p-12 rounded-lg shadow-lg text-center">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#66FCF1] mb-4">
                    <ReactTyped
                      strings={["Milestone X Photon"]}
                      typeSpeed={100}
                      showCursor={false}
                    />
                  </h1>
                  <h2 className="text-lg sm:text-2xl md:text-3xl text-[#C5C6C7]">
                    <ReactTyped
                      strings={["Sharkathon"]}
                      typeSpeed={100}
                      startDelay={2000}
                      showCursor={false}
                    />
                  </h2>
                </div>
              </div>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* ✅ Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/team"
            element={
              <ProtectedRoute>
                <TeamDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/attendance"
            element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/milestone"
            element={
              <ProtectedRoute>
                <Milestone />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit"
            element={
              <ProtectedRoute>
                <ScoreAudit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/picker"
            element={
              <ProtectedRoute>
                <CategoryPicker />
              </ProtectedRoute>
            }
          />
          <Route
            path="/spin"
            element={
              <ProtectedRoute>
                <Spin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/get-category"
            element={
              <ProtectedRoute>
                <GetCategory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      {!hideNavbar && (
        <footer className="bg-[#1F2833] text-center py-4 text-xs sm:text-sm text-[#C5C6C7] px-2">
          © {new Date().getFullYear()} Milestone Club. All rights reserved.
        </footer>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}
