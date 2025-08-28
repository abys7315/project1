import React, { useEffect, useState } from 'react';
import api from '../api';
import { motion } from 'framer-motion';

export default function Leaderboard() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get('/leaderboard');
        setTeams(res.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      }
    };
    load();
  }, []);

  return (
    <div className="mt-6 max-w-4xl mx-auto">
      <div className="card">
        <h3 className="text-2xl font-bold mb-4">Leaderboard</h3>
        <div className="divide-y divide-gray-800">
          {teams.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="py-3 flex justify-between items-center"
            >
              <div>
                <div className="text-lg font-semibold">{i + 1}. {t.teamName}</div>
                <div className="text-sm text-gray-400">
                  Category: {t.category ? `Category ${t.category}` : 'Not assigned'}
                </div>
              </div>
              <div className="text-xl font-bold">{t.totalScore}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
