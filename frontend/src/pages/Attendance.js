import React, {useEffect, useState} from 'react';
import api from '../api';
export default function Attendance(){
  const [teams,setTeams] = useState([]);
  useEffect(()=>{ const load=async ()=>{ try{ const res=await api.get('/attendance'); setTeams(res.data);}catch(err){ alert('Login as event-manager'); } }; load(); },[]);
  const toggle = async (teamId)=>{ try{ await api.post('/attendance/toggle', { teamId }); window.location.reload(); }catch(err){ alert('Error'); } };
  return (
    <div className="mt-6 max-w-3xl mx-auto">
      <div className="card">
        <h3 className="text-xl font-bold mb-3">Attendance</h3>
        <div className="space-y-2">
          {teams.map(t=> <div key={t._id} className="flex justify-between items-center"><div><strong>{t.teamName}</strong><div className="text-sm text-gray-400">Category: {t.category}</div></div><div><button className="px-3 py-1 rounded-md border" onClick={()=>toggle(t._id)}>{t.attendance? 'Present' : 'Absent'}</button></div></div>)}
        </div>
      </div>
    </div>
  );
}
