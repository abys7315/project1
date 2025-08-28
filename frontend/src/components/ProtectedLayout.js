import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";

export default function ProtectedLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem" }}>
        <LogoutButton />
      </div>

      {/* Page content */}
      <div>
        <Outlet /> {/* All protected pages render here */}
      </div>
    </div>
  );
}
