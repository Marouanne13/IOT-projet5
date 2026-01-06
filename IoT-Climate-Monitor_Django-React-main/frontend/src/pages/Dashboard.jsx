// pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TemperatureCard from "../components/TemperatureCard";
import HumidityCard from "../components/HumidityCard";
import IncidentsCard from "../components/IncidentsCard";
import ManualTestCard from "../components/ManualTestCard";

import { getCurrentUser, useLogout } from "../api/authApi";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const logout = useLogout();

  useEffect(() => {
    setCurrentUser(getCurrentUser());
  }, []);

  const role = currentUser?.profile?.role || currentUser?.role || null;

  const canManageUsers = role === "manager" || role === "supervisor";
  const canManageSensors = role === "supervisor";
  const canViewAuditLogs = role === "manager" || role === "supervisor";

  return (
    <div style={styles.layout}>
      {/* Sidebar (UNCHANGED) */}
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>🌡 IoT Monitor</h2>

        <nav style={styles.nav}>
          {canManageUsers && (
            <SidebarButton label="👤 Users" onClick={() => navigate("/users")} />
          )}
          {canManageSensors && (
            <SidebarButton label="📡 Sensors" onClick={() => navigate("/sensors")} />
          )}
          {canViewAuditLogs && (
            <SidebarButton label="📜 Audit Logs" onClick={() => navigate("/audit")} />
          )}
        </nav>
      </aside>

      {/* ===== CENTER CONTENT (REDESIGNED) ===== */}
      <main style={styles.main}>
        {/* Header */}
        <header style={styles.topbar}>
          <div>
            <h1 style={styles.title}>Dashboard</h1>
            <p style={styles.subtitle}>
              Welcome back {currentUser?.username || "User"}
            </p>
          </div>
          <button style={styles.logoutButton} onClick={logout}>
            Logout
          </button>
        </header>

        {/* KPI ROW */}
        <section style={styles.kpiRow}>
          <Kpi title="Temperature" value="18.8°C" color="#F59E0B" />
          <Kpi title="Humidity" value="41.4%" color="#3B82F6" />
          <Kpi title="Incidents" value="23" color="#EF4444" />
          <Kpi title="Status" value="Monitoring" color="#10B981" />
        </section>

        {/* MAIN PANELS */}
        <section style={styles.grid}>
          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>🌡 Temperature</h3>
            <TemperatureCard />
          </div>

          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>💧 Humidity</h3>
            <HumidityCard />
          </div>

          <div style={styles.alertPanel}>
            <h3 style={styles.panelTitle}>🚨 Incidents</h3>
            <IncidentsCard />
          </div>

          <div style={styles.panel}>
            <h3 style={styles.panelTitle}>🧪 Manual API Test</h3>
            <ManualTestCard />
          </div>
        </section>
      </main>
    </div>
  );
}

/* ---------- Components ---------- */
function SidebarButton({ label, onClick }) {
  return (
    <button style={styles.sidebarButton} onClick={onClick}>
      {label}
    </button>
  );
}

function Kpi({ title, value, color }) {
  return (
    <div style={{ ...styles.kpi, borderTop: `4px solid ${color}` }}>
      <span style={styles.kpiTitle}>{title}</span>
      <strong style={styles.kpiValue}>{value}</strong>
    </div>
  );
}

/* ---------- Styles ---------- */
const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#F4F6F8",
    fontFamily: "Inter, Arial, sans-serif",
  },

  /* Sidebar (UNCHANGED) */
  sidebar: {
    width: "240px",
    backgroundColor: "#111827",
    color: "#fff",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  logo: {
    marginBottom: "30px",
    fontSize: "20px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  sidebarButton: {
    padding: "12px",
    background: "transparent",
    color: "#E5E7EB",
    border: "none",
    borderRadius: "8px",
    textAlign: "left",
    cursor: "pointer",
  },

  /* Main */
  main: {
    flex: 1,
    padding: "30px",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  title: {
    margin: 0,
    fontSize: "26px",
    fontWeight: "600",
  },
  subtitle: {
    margin: "5px 0 0",
    color: "#6B7280",
  },
  logoutButton: {
    background: "#EF4444",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  /* KPI */
  kpiRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  kpi: {
    background: "#fff",
    borderRadius: "14px",
    padding: "18px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  },
  kpiTitle: {
    fontSize: "13px",
    color: "#6B7280",
  },
  kpiValue: {
    fontSize: "26px",
  },

  /* Panels */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "20px",
  },
  panel: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  },
  alertPanel: {
    background: "#FFF7ED",
    border: "1px solid #FDBA74",
    borderRadius: "14px",
    padding: "20px",
  },
  panelTitle: {
    marginBottom: "12px",
    fontWeight: "600",
  },
};
