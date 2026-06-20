import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiMessageSquare, FiUsers, FiLogOut } from "react-icons/fi";

const navItems = [
  { id: "/admin", label: "Dashboard", icon: <FiHome /> },
  { id: "/admin/messages", label: "Messages", icon: <FiMessageSquare /> },
  { id: "/admin/users", label: "Users", icon: <FiUsers /> },
];

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Dynamic user info localStorage se
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "Admin";
  const userInitials = userName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  // Proper logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            style={styles.sidebar}
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div style={styles.logo}>
              <span>⚡</span>
              <span>Fitness<span style={styles.accent}>Zone</span></span>
            </div>

            {/* Dynamic Admin Info */}
            <div style={styles.adminBadge}>
              <div style={styles.adminAvatar}>{userInitials}</div>
              <div>
                <div style={styles.adminName}>{userName}</div>
                <div style={styles.adminRole}>Administrator</div>
              </div>
            </div>

            <nav style={styles.nav}>
              {navItems.map((item, i) => (
                <motion.div
                  key={item.id}
                  style={{
                    ...styles.navItem,
                    background: location.pathname === item.id ? "rgba(99,179,237,0.1)" : "transparent",
                    color: location.pathname === item.id ? "#63b3ed" : "#4a5568",
                    borderLeft: location.pathname === item.id ? "3px solid #63b3ed" : "3px solid transparent",
                  }}
                  onClick={() => navigate(item.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4, color: "#63b3ed" }}
                >
                  <span style={styles.navIcon}>{item.icon}</span>
                  {item.label}
                </motion.div>
              ))}
            </nav>

            {/* Proper Logout */}
            <motion.button
              style={styles.logoutBtn}
              whileHover={{ scale: 1.02, background: "rgba(252,129,129,0.15)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleLogout}
            >
              <FiLogOut /> Logout
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main */}
      <div style={{ ...styles.main, marginLeft: sidebarOpen ? "260px" : "0" }}>
        <motion.header
          style={styles.header}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.button style={styles.menuBtn} onClick={() => setSidebarOpen(!sidebarOpen)} whileTap={{ scale: 0.9 }}>
            {sidebarOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </motion.button>
          <div style={styles.headerTitle}>Admin Dashboard</div>
          <div style={styles.headerRight}>
            <div style={styles.headerDate}>
              {new Date().toLocaleDateString('en-PK', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div style={styles.headerUser}>
              <div style={styles.headerAvatar}>{userInitials}</div>
              <span style={styles.headerUserName}>{userName}</span>
            </div>
          </div>
        </motion.header>

        <div style={styles.content}>{children}</div>
      </div>
    </div>
  );
};

const styles = {
  container: { display: "flex", minHeight: "100vh", background: "#0a0f1e" },
  sidebar: { position: "fixed", left: 0, top: 0, bottom: 0, width: "260px", background: "#0d1b2a", borderRight: "0.5px solid rgba(99,179,237,0.1)", display: "flex", flexDirection: "column", padding: "24px 0", zIndex: 100 },
  logo: { fontSize: "20px", fontWeight: "700", color: "#fff", padding: "0 24px 24px", borderBottom: "0.5px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: "8px" },
  accent: { color: "#63b3ed" },
  adminBadge: { display: "flex", alignItems: "center", gap: "12px", padding: "20px 24px", borderBottom: "0.5px solid rgba(255,255,255,0.06)", marginBottom: "16px" },
  adminAvatar: { width: "40px", height: "40px", borderRadius: "50%", background: "linear-gradient(135deg, #3182ce, #63b3ed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px", fontWeight: "700", flexShrink: 0 },
  adminName: { color: "#e2e8f0", fontSize: "14px", fontWeight: "600" },
  adminRole: { color: "#63b3ed", fontSize: "11px", marginTop: "2px" },
  nav: { flex: 1, padding: "0 12px" },
  navItem: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: "500", cursor: "pointer", marginBottom: "4px", transition: "all 0.2s" },
  navIcon: { fontSize: "16px", display: "flex" },
  logoutBtn: { display: "flex", alignItems: "center", gap: "10px", margin: "0 12px", padding: "12px 16px", background: "rgba(252,129,129,0.08)", border: "0.5px solid rgba(252,129,129,0.2)", borderRadius: "8px", color: "#fc8181", fontSize: "14px", cursor: "pointer", transition: "all 0.2s" },
  main: { flex: 1, transition: "margin-left 0.3s ease", minHeight: "100vh" },
  header: { display: "flex", alignItems: "center", gap: "16px", padding: "16px 32px", background: "rgba(13,27,42,0.8)", borderBottom: "0.5px solid rgba(99,179,237,0.1)", backdropFilter: "blur(10px)", position: "sticky", top: 0, zIndex: 50 },
  menuBtn: { background: "rgba(255,255,255,0.05)", border: "0.5px solid rgba(255,255,255,0.08)", color: "#63b3ed", cursor: "pointer", borderRadius: "8px", padding: "8px", display: "flex" },
  headerTitle: { color: "#fff", fontSize: "18px", fontWeight: "600", flex: 1 },
  headerRight: { display: "flex", alignItems: "center", gap: "20px" },
  headerDate: { color: "#4a5568", fontSize: "13px" },
  headerUser: { display: "flex", alignItems: "center", gap: "8px" },
  headerAvatar: { width: "32px", height: "32px", borderRadius: "50%", background: "linear-gradient(135deg, #3182ce, #63b3ed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px", fontWeight: "700" },
  headerUserName: { color: "#a0aec0", fontSize: "13px" },
  content: { padding: "32px" },
};

export default AdminLayout;