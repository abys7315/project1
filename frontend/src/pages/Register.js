import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    regNumber: '',
    contactNumber: '',
    alternateNumber: '',
    members: [
      { name: '', regNumber: '' }, // Member 1
      { name: '', regNumber: '' }, // Member 2
    ],
  });

  const [showMember3, setShowMember3] = useState(false);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const changeMember = (index, e) => {
    const newMembers = [...form.members];
    newMembers[index][e.target.name] = e.target.value;
    setForm({ ...form, members: newMembers });
  };

  const addMember3 = () => {
    setShowMember3(true);
    setForm({
      ...form,
      members: [...form.members, { name: '', regNumber: '' }],
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);

    try {
      const res = await api.post('/auth/register', form);
      setMsg({ type: 'success', text: 'Registration Successful!' });
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Error' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 bg-[#0B0C10]"
    >
      <div className="bg-[#1F2833] p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#45A29E]">
        <h3 className="text-2xl font-bold mb-6 text-[#66FCF1] text-center">
          Team Head Registration
        </h3>

        {/* Popup Message */}
        <AnimatePresence>
          {msg && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`p-3 mb-4 rounded-lg text-center font-medium ${
                msg.type === 'error'
                  ? 'bg-red-500 text-white'
                  : 'bg-[#45A29E] text-[#0B0C10]'
              }`}
            >
              {msg.text}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={submit} className="space-y-4">
          {/* Team Head Fields */}
          <input
            name="name"
            type="text"
            placeholder="Team Head Name"
            required
            value={form.name}
            onChange={change}
            className="w-full p-3 rounded-md bg-[#0B0C10] border border-[#45A29E] text-[#C5C6C7]"
          />
          <input
            name="regNumber"
            type="text"
            placeholder="Team Head Registration Number"
            required
            value={form.regNumber}
            onChange={change}
            className="w-full p-3 rounded-md bg-[#0B0C10] border border-[#45A29E] text-[#C5C6C7]"
          />
          <input
            name="email"
            type="email"
            placeholder="Team Head Email"
            required
            value={form.email}
            onChange={change}
            className="w-full p-3 rounded-md bg-[#0B0C10] border border-[#45A29E] text-[#C5C6C7]"
          />
          <input
            name="password"
            type="password"
            placeholder="Password (min 8 chars)"
            required
            value={form.password}
            onChange={change}
            className="w-full p-3 rounded-md bg-[#0B0C10] border border-[#45A29E] text-[#C5C6C7]"
          />
          <input
            name="contactNumber"
            type="text"
            placeholder="Contact Number (10 digits)"
            required
            value={form.contactNumber}
            onChange={change}
            className="w-full p-3 rounded-md bg-[#0B0C10] border border-[#45A29E] text-[#C5C6C7]"
          />
          <input
            name="alternateNumber"
            type="text"
            placeholder="Alternate Contact Number (10 digits)"
            required
            value={form.alternateNumber}
            onChange={change}
            className="w-full p-3 rounded-md bg-[#0B0C10] border border-[#45A29E] text-[#C5C6C7]"
          />

          {/* Members Fields */}
          {form.members.map((m, i) => (
            <div key={i} className="space-y-2">
              <input
                name="name"
                type="text"
                placeholder={`Member ${i + 1} Name`}
                value={m.name}
                onChange={(e) => changeMember(i, e)}
                className="w-full p-3 rounded-md bg-[#0B0C10] border border-[#45A29E] text-[#C5C6C7]"
                required={i < 2} // first 2 members required
              />
              <input
                name="regNumber"
                type="text"
                placeholder={`Member ${i + 1} Registration Number`}
                value={m.regNumber}
                onChange={(e) => changeMember(i, e)}
                className="w-full p-3 rounded-md bg-[#0B0C10] border border-[#45A29E] text-[#C5C6C7]"
                required={i < 2} // first 2 members required
              />
            </div>
          ))}

          {!showMember3 && (
            <div
              className="text-[#66FCF1] font-semibold cursor-pointer text-right"
              onClick={addMember3}
            >
              + Add Member 3
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-md bg-[#45A29E] text-[#0B0C10] font-semibold hover:bg-[#66FCF1] hover:scale-105 transform transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </motion.div>
  );
}
