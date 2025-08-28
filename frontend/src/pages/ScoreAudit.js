import React, {useEffect, useState} from 'react';
import api from '../api';
export default function ScoreAudit(){
  const [audits,setAudits] = useState([]);
  useEffect(()=>{ const load=async ()=>{ try{ const res = await api.get('/audit'); setAudits(res.data); }catch(err){ alert('Please login as admin or manager'); } }; load(); },[]);
  return (
    <div className="mt-6 max-w-4xl mx-auto">
      <div className="card">
        <h3 className="text-2xl font-bold mb-4">Score Audit</h3>
        <div className="space-y-3">
          {audits.map(a=> (<div key={a._id} className="p-3 bg-gray-900 rounded-md">
            <div className="text-sm text-gray-400">Team: {a.team?.teamName || a.team}</div>
            <div className="text-sm">Changed by: {a.changedBy?.name || '-' } ({a.role})</div>
            <div className="text-sm text-gray-300">Old: {JSON.stringify(a.oldScores)} → New: {JSON.stringify(a.newScores)}</div>
            <div className="text-xs text-gray-500">{new Date(a.createdAt).toLocaleString()}</div>
          </div>))}
        </div>
      </div>
    </div>
  );
}
