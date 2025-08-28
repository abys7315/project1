import React, { useState, useContext } from 'react';
import api from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/authcontext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);

    try {
      const res = await api.post('/auth/login', form);
      const { token, role, name } = res.data;

      if (!token) {
        setMsg({ type: 'error', text: 'Token not received from server' });
        return;
      }

      // Save token + user info
      login(token, { name, email: form.email, role });

      // Persist in localStorage
      localStorage.setItem('role', role.toLowerCase());
      localStorage.setItem('user', JSON.stringify({ name, email: form.email }));

      // Navigate based on role
      const normalizedRole = role.toLowerCase().trim();
      if (normalizedRole === 'team-head') {
        navigate('/get-category', { replace: true });
      } else if (normalizedRole === 'admin' || normalizedRole === 'event-manager') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      setMsg({
        type: 'error',
        text: err.response?.data?.message || 'Login failed',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-[#0B0C10] p-4"
    >
      <div className="bg-[#1F2833] p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#45A29E]">
        <h3 className="text-3xl font-bold mb-6 text-[#66FCF1] text-center">Sign In</h3>

        <AnimatePresence>
          {msg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-3 mb-4 rounded-lg text-center font-medium ${
                msg.type === 'error' ? 'bg-red-500 text-white' : 'bg-[#45A29E] text-[#0B0C10]'
              }`}
            >
              {msg.text}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={submit} className="space-y-4">
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={change}
            placeholder="Email"
            className="w-full p-3 rounded-md bg-[#0B0C10] border border-[#45A29E] text-[#C5C6C7] placeholder-[#C5C6C7]/70 focus:outline-none focus:ring-2 focus:ring-[#66FCF1]"
          />
          <input
            name="password"
            type="password"
            required
            value={form.password}
            onChange={change}
            placeholder="Password"
            className="w-full p-3 rounded-md bg-[#0B0C10] border border-[#45A29E] text-[#C5C6C7] placeholder-[#C5C6C7]/70 focus:outline-none focus:ring-2 focus:ring-[#66FCF1]"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#45A29E] text-[#0B0C10] font-semibold hover:bg-[#66FCF1] hover:scale-105 transform transition duration-300"
          >
            Sign In
          </button>
        </form>

        {/* ✅ Add "Not registered? Click here" link */}
        <p className="mt-4 text-center text-[#C5C6C7]">
          Not registered?{' '}
          <Link
            to="/register"
            className="text-[#66FCF1] font-semibold hover:underline"
          >
            Click here
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
