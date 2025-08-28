import React, {useEffect, useState} from 'react';
import api from '../api';
import { motion } from 'framer-motion';
export default function TeamDashboard(){
  const [team,setTeam] = useState(null);
  useEffect(()=>{ const load=async ()=>{ try{ const res=await api.get('/team/me'); setTeam(res.data);}catch(err){ console.error(err);} }; load(); },[]);
  if(!team) return <div className="mt-8">Loading...</div>;
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="max-w-2xl mx-auto mt-6">
      <div className="card">
        <h3 className="text-2xl font-bold">{team.teamName}</h3>
        <div className="text-gray-400">Category: {team.category}</div>
        <div className="mt-3">Total Score: <strong>{team.totalScore}</strong></div>
        <div className="mt-4">
          <h4 className="font-semibold">Scores</h4>
          <div className="text-sm text-gray-300">{team.scores?.map(s=> `${s.score ?? '-'} by ${s.judge ? 'judge' : '—'}`).join(' | ')}</div>
        </div>
      </div>
    </motion.div>
  );
}
