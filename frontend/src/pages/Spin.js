import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import api from "../api";

const categories = ["Category 1", "Category 2", "Category 3"];

export default function Spin() {
  const [selected, setSelected] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const navigate = useNavigate();

  // ✅ Check authentication & fetch assigned category
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAssignedCategory = async () => {
      try {
        const res = await api.get("/team/get-category", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data?.category) {
          // Already assigned → show categorya
          setSelected(res.data.category);
        }
      } catch (err) {
        console.error("Failed to fetch assigned category:", err);
      }
    };

    fetchAssignedCategory();
  }, [navigate]);

  const startSpin = async () => {
    if (spinning) return;

    // ✅ If already assigned → block spinning
    if (selected) {
      alert("Category already assigned: " + selected);
      return;
    }

    setSpinning(true);
    setSelected(""); // Clear text while spinning

    const randomIndex = Math.floor(Math.random() * categories.length);
    const spinDegrees = 5 * 360 + (360 / categories.length) * randomIndex;
    setRotation((prev) => prev + spinDegrees);

    setTimeout(async () => {
      const chosenCategory = categories[randomIndex];
      try {
        const token = localStorage.getItem("token");
        const res = await api.post(
          "/team/select-category",
          { category: chosenCategory },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const assignedCategory = res.data?.category || chosenCategory;
        setSelected(assignedCategory);
      } catch (err) {
        console.error(err);
        alert(err.response?.data?.message || "Failed to assign category");
      }
      setSpinning(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #0B0C10, #1F2833)",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          fontWeight: "800",
          color: "#66FCF1",
          marginBottom: "1.5rem",
          textShadow: "0 0 8px rgba(102, 252, 241, 0.7)",
          letterSpacing: "1px",
        }}
      >
        Spin for Your Category
      </h2>

      <div className="relative flex items-center justify-center">
        {/* Pointer */}
        <div
          className="absolute top-[-25px] z-20"
          style={{
            width: 0,
            height: 0,
            borderLeft: "20px solid transparent",
            borderRight: "20px solid transparent",
            borderBottom: `35px solid #66FCF1`,
            filter: "drop-shadow(0 0 8px #66FCF1)",
          }}
        />

        {/* Outer Spinning Ring */}
        <motion.div
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: "easeOut" }}
          style={{
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: `conic-gradient(
              #66FCF1 0deg ${360 / 3}deg,
              #45A29E ${360 / 3}deg ${(360 / 3) * 2}deg,
              #C5C6C7 ${(360 / 3) * 2}deg 360deg
            )`,
            border: "6px solid #1F2833",
            boxShadow: `
              0 0 20px rgba(102, 252, 241, 0.6),
              0 0 40px rgba(69, 162, 158, 0.4),
              inset 0 0 15px rgba(255,255,255,0.1)
            `,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Inner Circle */}
          <div
            style={{
              width: "95%",
              height: "95%",
              borderRadius: "50%",
              background: "rgba(31, 40, 51, 0.4)",
              backdropFilter: "blur(12px)",
              border: "2px solid rgba(102, 252, 241, 0.3)",
              boxShadow: "inset 0 0 20px rgba(255,255,255,0.05)",
              position: "absolute",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Dark Category Box */}
            <motion.div
              animate={{ scale: selected ? 1 : 0.9, opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                background: "rgba(11, 12, 16, 0.9)",
                padding: "15px 25px",
                borderRadius: "50%",
                border: "2px solid #66FCF1",
                color: "#66FCF1",
                fontWeight: "bold",
                fontSize: "1.1rem",
                textAlign: "center",
                minWidth: "50px",
                minHeight: "50px",
                boxShadow:
                  "0 0 15px rgba(0, 0, 0, 0.8), 0 0 8px rgba(102, 252, 241, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "absolute",
              }}
            >
              {selected || "?"}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Spin Button */}
      <button
        onClick={startSpin}
        disabled={spinning}
        style={{
          marginTop: "1.5rem",
          padding: "0.75rem 1.5rem",
          background: "#45A29E",
          color: "#0B0C10",
          fontWeight: "700",
          borderRadius: "0.5rem",
          boxShadow: "0 0 15px rgba(69,162,158,0.6)",
          border: "none",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.background = "#66FCF1";
          e.target.style.transform = "scale(1.05)";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "#45A29E";
          e.target.style.transform = "scale(1)";
        }}
      >
        {spinning ? "Spinning..." : "Spin Now"}
      </button>
    </motion.div>
  );
}
