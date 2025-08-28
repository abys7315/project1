import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // ✅ use centralized axios instance

export default function GetCategory() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check localStorage
        const isAuthenticated = localStorage.getItem("isAuthenticated");
        if (!isAuthenticated) {
          navigate("/login");
          return;
        }

        // Then confirm with backend
        await api.get("/auth/check"); // ✅ should hit requireAuth-protected route
        setLoading(false);
      } catch (err) {
        console.error("Not authenticated", err);
        localStorage.removeItem("isAuthenticated");
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  const handleGoToSpin = () => {
    navigate('/spin');
  };

  if (loading) return <p className="text-white text-center">Checking authentication...</p>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] to-[#1e293b] p-4"
    >
      <div className="bg-[#111827] p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#334155] text-center">
        <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">
          Assign Your Category
        </h2>
        <button
          onClick={handleGoToSpin}
          className="px-6 py-3 rounded-md bg-gradient-to-r from-[#9333ea] via-[#3b82f6] to-[#06b6d4] 
                     text-white font-semibold hover:scale-105 transform transition duration-300 shadow-lg"
        >
          Get a Category
        </button>
      </div>
    </motion.div>
  );
}
