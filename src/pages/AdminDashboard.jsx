import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail, FiUsers, FiCheck, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import axios from "axios";

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 50) || 1;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count}</span>;
};

const statusColors = {
  unread: { color: "#fc8181", bg: "rgba(252,129,129,0.1)" },
  read: { color: "#f6ad55", bg: "rgba(246,173,85,0.1)" },
  replied: { color: "#68d391", bg: "rgba(104,211,145,0.1)" },
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [msgRes, userRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL || "https://fitness-zone-backend.vercel.app"}/api/contact`, {
            headers: { Authorization: `Bearer ${token}` }
          }),
          axios.get(`${import.meta.env.VITE_API_URL || "https://fitness-zone-backend.vercel.app"}/api/auth/users`, {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setMessages(msgRes.data);
        setUsers(userRes.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: "Total Messages", value: messages.length, icon: <FiMail />, color: "#63b3ed", bg: "rgba(99,179,237,0.1)" },
    { label: "Unread", value: messages.filter(m => m.status === "unread").length, icon: <FiAlertCircle />, color: "#fc8181", bg: "rgba(252,129,129,0.1)" },
    { label: "Replied", value: messages.filter(m => m.status === "replied").length, icon: <FiCheck />, color: "#68d391", bg: "rgba(104,211,145,0.1)" },
    { label: "Total Users", value: users.length, icon: <FiUsers />, color: "#b794f4", bg: "rgba(183,148,244,0.1)" },
  ];

  // Recent 3 messages (sorted by date already from backend)
  const recentMessages = messages.slice(0, 3);

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  if (loading) return (
    <AdminLayout>
      <div style={{ color: "#63b3ed", fontSize: "18px", textAlign: "center", marginTop: "100px" }}>
        Loading dashboard...
      </div>
    </AdminLayout>
  );

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>📊 Dashboard</h1>
          <p style={styles.pageSub}>Welcome back, {currentUser.name || "Admin"}! Here's what's happening.</p>
        </div>

        <div style={styles.statsGrid}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              style={{ ...styles.statCard, borderTop: `2px solid ${stat.color}` }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            >
              <div style={{ ...styles.statIcon, background: stat.bg, color: stat.color }}>
                {stat.icon}
              </div>
              <div style={{ ...styles.statNum, color: stat.color }}>
                <Counter target={stat.value} />
              </div>
              <div style={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div style={styles.bottomRow}>
          {/* Recent Messages — real data */}
          <motion.div
            style={styles.card}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>📨 Recent Messages</div>
              <motion.button
                style={styles.viewAllBtn}
                whileHover={{ x: 4 }}
                onClick={() => navigate("/admin/messages")}
              >
                View All <FiArrowRight size={13} />
              </motion.button>
            </div>
            {recentMessages.length === 0 && (
              <div style={{ color: "#4a5568", fontSize: "13px", padding: "16px 0" }}>No messages yet.</div>
            )}
            {recentMessages.map((msg) => (
              <motion.div
                key={msg._id}
                style={styles.msgItem}
                whileHover={{ x: 4, background: "rgba(99,179,237,0.04)" }}
                onClick={() => navigate("/admin/messages")}
              >
                <div style={styles.msgAvatar}>{msg.name.charAt(0).toUpperCase()}</div>
                <div style={styles.msgInfo}>
                  <div style={styles.msgName}>{msg.name}</div>
                  <div style={styles.msgPreview}>
                    {msg.message.length > 35 ? msg.message.substring(0, 35) + "..." : msg.message}
                  </div>
                </div>
                <div style={{ ...styles.msgStatus, color: statusColors[msg.status].color, background: statusColors[msg.status].bg }}>
                  {msg.status}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Stats Summary — real data */}
          <motion.div
            style={styles.card}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div style={styles.cardHeader}>
              <div style={styles.cardTitle}>👥 Recent Users</div>
              <motion.button
                style={styles.viewAllBtn}
                whileHover={{ x: 4 }}
                onClick={() => navigate("/admin/users")}
              >
                View All <FiArrowRight size={13} />
              </motion.button>
            </div>
            {users.length === 0 && (
              <div style={{ color: "#4a5568", fontSize: "13px", padding: "16px 0" }}>No users yet.</div>
            )}
            {users.slice(0, 4).map((u) => (
              <motion.div
                key={u._id}
                style={styles.msgItem}
                whileHover={{ x: 4, background: "rgba(99,179,237,0.04)" }}
              >
                <div style={{ ...styles.msgAvatar, background: u.role === "admin" ? "linear-gradient(135deg, #b794f4, #805ad5)" : "linear-gradient(135deg, #3182ce, #63b3ed)" }}>
                  {u.name.charAt(0).toUpperCase()}
                </div>
                <div style={styles.msgInfo}>
                  <div style={styles.msgName}>{u.name}</div>
                  <div style={styles.msgPreview}>{u.email}</div>
                </div>
                <div style={{ ...styles.msgStatus, color: u.role === "admin" ? "#b794f4" : "#68d391", background: u.role === "admin" ? "rgba(183,148,244,0.1)" : "rgba(104,211,145,0.1)" }}>
                  {u.role}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          style={styles.quickActions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <div style={styles.cardTitle}>⚡ Quick Actions</div>
          <div style={styles.actionsRow}>
            {[
              { label: "View Messages", icon: "📨", color: "#63b3ed", route: "/admin/messages" },
              { label: "View Users", icon: "👥", color: "#b794f4", route: "/admin/users" },
              { label: "Go to Website", icon: "🌐", color: "#68d391", route: "/" },
            ].map((action, i) => (
              <motion.button
                key={i}
                style={{ ...styles.actionBtn, borderColor: `${action.color}33`, color: action.color }}
                whileHover={{ scale: 1.04, background: `${action.color}10`, boxShadow: `0 0 20px ${action.color}22` }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(action.route)}
              >
                <span style={styles.actionIcon}>{action.icon}</span>
                {action.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </AdminLayout>
  );
};

const styles = {
  pageHeader: { marginBottom: "28px" },
  pageTitle: { color: "#fff", fontSize: "26px", fontWeight: "700", marginBottom: "6px" },
  pageSub: { color: "#4a5568", fontSize: "14px" },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "28px" },
  statCard: { background: "rgba(13,27,42,0.8)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px", cursor: "default" },
  statIcon: { width: "44px", height: "44px", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", marginBottom: "16px" },
  statNum: { fontSize: "36px", fontWeight: "700", marginBottom: "6px" },
  statLabel: { color: "#4a5568", fontSize: "13px" },
  bottomRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" },
  card: { background: "rgba(13,27,42,0.8)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  cardTitle: { color: "#fff", fontSize: "15px", fontWeight: "600" },
  viewAllBtn: { display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", color: "#63b3ed", fontSize: "13px", cursor: "pointer" },
  msgItem: { display: "flex", alignItems: "center", gap: "12px", padding: "10px 8px", borderRadius: "8px", marginBottom: "8px", cursor: "pointer", transition: "all 0.2s" },
  msgAvatar: { width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #3182ce, #63b3ed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px", fontWeight: "700", flexShrink: 0 },
  msgInfo: { flex: 1, minWidth: 0 },
  msgName: { color: "#e2e8f0", fontSize: "13px", fontWeight: "500", marginBottom: "3px" },
  msgPreview: { color: "#4a5568", fontSize: "12px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" },
  msgStatus: { fontSize: "11px", fontWeight: "600", padding: "3px 10px", borderRadius: "20px", flexShrink: 0 },
  quickActions: { background: "rgba(13,27,42,0.8)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px" },
  actionsRow: { display: "flex", gap: "14px", marginTop: "16px", flexWrap: "wrap" },
  actionBtn: { display: "flex", alignItems: "center", gap: "10px", background: "transparent", border: "1px solid", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: "500", cursor: "pointer", transition: "all 0.2s" },
  actionIcon: { fontSize: "18px" },
};

export default AdminDashboard;