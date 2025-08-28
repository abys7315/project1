import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { motion } from "framer-motion";

function ConfirmModal({ open, onClose, onConfirm, text }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 p-6 rounded-xl z-10 max-w-sm w-full"
      >
        <div className="text-lg font-bold mb-3">Confirm</div>
        <div className="mb-4 text-gray-300">{text}</div>
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 rounded-md border" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-red-500 text-white"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminDashboard() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, teamId: null, score: 0, text: "" });
  const [leaderboardModal, setLeaderboardModal] = useState({ open: false, text: "" });
  const [qualifiedTeams, setQualifiedTeams] = useState([]);
  const [finalWinners, setFinalWinners] = useState([]);
  const [secondRoundStarted, setSecondRoundStarted] = useState(false);
  const [firstRoundEnded, setFirstRoundEnded] = useState(false); // ✅ new state

  const navigate = useNavigate();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setTeams(res.data.teams || []);
    } catch (err) {
      console.error(err);
      alert("Please login");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (teamId, inputId) => {
    const val = Number(document.getElementById(inputId).value);
    if (isNaN(val) || val < 0 || val > 100) {
      alert("Enter 0-100");
      return;
    }
    setModal({ open: true, teamId, score: val, text: "You are about to overwrite or add a score. Confirm?" });
  };

  const confirmSave = async () => {
    try {
      await api.post("/admin/assign-score", { teamId: modal.teamId, score: modal.score, round: secondRoundStarted ? 2 : 1 });
      setModal({ open: false });
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Error");
      setModal({ open: false });
    }
  };

  const toggleAttendance = async (teamId) => {
    try {
      await api.post("/attendance/toggle", { teamId });
      load();
    } catch (err) {
      alert("Error");
    }
  };

  // ✅ End First Round -> calculate qualified teams
  const handleEndFirstRound = () => {
    const qualified = [];
    const categories = [...new Set(teams.map((team) => team.category))];

    categories.forEach((category) => {
      const topTwo = teams
        .filter((t) => t.category === category)
        .sort((a, b) => b.totalScore - a.totalScore)
        .slice(0, 2);
      qualified.push(...topTwo);
    });

    setQualifiedTeams(qualified);
    setFirstRoundEnded(true);
    alert("First round ended! Qualified teams updated ✅");
  };

  // Show Leaderboard button click -> open modal
  const handleShowLeaderboardClick = () => {
    setLeaderboardModal({ open: true, text: "Are you sure you want to view the leaderboard?" });
  };

  // Confirm leaderboard navigation
  const confirmGenerateLeaderboard = () => {
    setLeaderboardModal({ open: false });
    navigate("/leaderboard", { state: { qualifiedTeams } });
  };

  const startSecondRound = () => {
    if (!firstRoundEnded) {
      alert("Please end the first round before starting the second round.");
      return;
    }
    setSecondRoundStarted(true);
    alert("Second round started! You can now assign new scores.");
  };

  const showWinners = () => {
    if (!secondRoundStarted) {
      alert("Second round has not started yet.");
      return;
    }
    const winners = [...qualifiedTeams].sort((a, b) => (b.round2Score || 0) - (a.round2Score || 0)).slice(0, 3);
    setFinalWinners(winners);
  };

  if (loading) return <div className="mt-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin / Manager Dashboard</h2>
        <div className="flex space-x-2">
          {/*<button className="px-4 py-2 text-sm rounded-md bg-green-500 text-gray-300">View Score Audit</button>*/}

          {/* ✅ New End First Round button */}
          {!firstRoundEnded && (
            <button className="px-4 py-2 rounded-md bg-purple-500 text-white" onClick={handleEndFirstRound}>
              End First Round
            </button>
          )}

          <button className="px-4 py-2 rounded-md bg-green-500 text-white" onClick={handleShowLeaderboardClick}>
            Show Leaderboard
          </button>

          {!secondRoundStarted && (
            <button className="px-4 py-2 rounded-md bg-blue-500 text-white" onClick={startSecondRound}>
              Start 2nd Round
            </button>
          )}
          {secondRoundStarted && (
            <button className="px-4 py-2 rounded-md bg-yellow-500 text-black font-bold" onClick={showWinners}>
              Show Winners
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {(secondRoundStarted ? qualifiedTeams : teams).map((team) => {
          const isWinner = finalWinners.some((winner) => winner._id === team._id);
          return (
            <motion.div
              key={team._id}
              whileHover={{ scale: 1.01 }}
              className={`card flex justify-between items-center p-4 rounded-lg ${isWinner ? "border-4 border-yellow-400 bg-yellow-900/20" : ""}`}
            >
              <div>
                <div className="text-lg font-semibold">{team.teamName}</div>
                <div className="text-sm text-gray-400">Head: {team.teamHead?.name || "-"}</div>
                <div className="text-sm text-gray-400">Category: {team.category}</div>
              </div>
              <div className="text-right space-y-2">
                <div className="text-sm text-gray-300">Total: <strong>{team.totalScore}</strong></div>
                {secondRoundStarted && (
                  <div className="text-sm text-gray-300">
                    Round 2: <strong>{team.round2Score || 0}</strong>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <input
                    id={`score-${team._id}`}
                    placeholder="0-100"
                    className="p-2 rounded-md bg-gray-900 border border-gray-800 w-24"
                  />
                  <button className="btn-primary" onClick={() => handleSave(team._id, `score-${team._id}`)}>Save</button>
                </div>
                {!secondRoundStarted && (
                  <div className="mt-2">
                    <button className="px-3 py-1 rounded-md border" onClick={() => toggleAttendance(team._id)}>
                      {team.attendance ? "Mark Absent" : "Mark Present"}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {finalWinners.length > 0 && (
        <div className="mt-8 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-yellow-400">🏆 Final Winners (Based on Round 2)</h3>
          <ol className="text-white">
            {finalWinners.map((team, idx) => (
              <li key={team._id}>{idx + 1}. {team.teamName} - {team.round2Score || 0}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Score modal */}
      <ConfirmModal open={modal.open} onClose={() => setModal({ open: false })} onConfirm={confirmSave} text={modal.text} />

      {/* Leaderboard modal */}
      <ConfirmModal open={leaderboardModal.open} onClose={() => setLeaderboardModal({ open: false })} onConfirm={confirmGenerateLeaderboard} text={leaderboardModal.text} />
    </div>
  );
}
