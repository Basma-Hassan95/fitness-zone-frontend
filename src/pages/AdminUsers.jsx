import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiX, FiShield, FiUser } from "react-icons/fi";
import AdminLayout from "../components/AdminLayout";
import axios from "axios";

const RoleColors = {
  admin: { color: "#63b3ed", bg: "rgba(99,179,237,0.1)", border: "rgba(99,179,237,0.3)" },
  user: { color: "#68d391", bg: "rgba(104,211,145,0.1)", border: "rgba(104,211,145,0.3)" },
};

const DeleteModal = ({ onConfirm, onCancel }) => (
  <motion.div style={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onCancel}>
    <motion.div style={styles.deleteModal} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={(e) => e.stopPropagation()}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>⚠️</div>
      <h3 style={styles.deleteTitle}>Delete User?</h3>
      <p style={styles.deleteText}>This user will be deleted permanentl</p>
      <div style={styles.deleteBtns}>
        <motion.button style={styles.cancelBtn} whileHover={{ scale: 1.04 }} onClick={onCancel}>Cancel</motion.button>
        <motion.button style={styles.confirmBtn} whileHover={{ scale: 1.04 }} onClick={onConfirm}>Delete</motion.button>
      </div>
    </motion.div>
  </motion.div>
);

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("token");

  // Real API se users fetch karo
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('https://fitness-zone-backend.vercel.app/api/auth/users', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setUsers(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  // Make Admin
  const handleMakeAdmin = async (id) => {
    try {
      await axios.put(`https://fitness-zone-backend.vercel.app/api/auth/make-admin/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role: 'admin' } : u))
    } catch (error) {
      console.log(error)
    }
  }

  // Remove Admin
  const handleRemoveAdmin = async (id) => {
    try {
      await axios.put(`https://fitness-zone-backend.vercel.app/api/auth/remove-admin/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role: 'user' } : u))
    } catch (error) {
      console.log(error)
    }
  }

  // Delete User
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://fitness-zone-backend.vercel.app/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUsers(prev => prev.filter(u => u._id !== id))
      setDeleteId(null)
    } catch (error) {
      console.log(error)
    }
  }

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  if (loading) return (
    <AdminLayout>
      <div style={{ color: "#63b3ed", fontSize: "18px", textAlign: "center", marginTop: "100px" }}>
        Loading users...
      </div>
    </AdminLayout>
  )

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.pageTitle}>👥 Users</h1>
            <p style={styles.pageSub}>Manage registered users — promote or remove admin access</p>
          </div>
          <div style={styles.totalBadge}>{users.length} total users</div>
        </div>

        <div style={styles.grid}>
          {users.map((user, i) => (
            <motion.div
              key={user._id}
              style={styles.userCard}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
            >
              <div style={styles.cardTop}>
                <div style={styles.userAvatar}>{user.name.charAt(0).toUpperCase()}</div>
                <div style={{ ...styles.roleBadge, color: RoleColors[user.role].color, background: RoleColors[user.role].bg, border: `1px solid ${RoleColors[user.role].border}` }}>
                  {user.role === "admin" ? <FiShield size={11} /> : <FiUser size={11} />}
                  {user.role}
                </div>
              </div>

              <div style={styles.userName}>{user.name}</div>
              <div style={styles.userEmail}>{user.email}</div>
              <div style={styles.userDate}>Joined: {new Date(user.createdAt).toLocaleDateString()}</div>

              <div style={styles.cardActions}>
                {/* Apne aap ko change nahi kar sakte */}
                {currentUser.id !== user._id && (
                  <>
                    {user.role === "user" ? (
                      <motion.button
                        style={styles.makeAdminBtn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleMakeAdmin(user._id)}
                      >
                        <FiShield size={13} /> Make Admin
                      </motion.button>
                    ) : (
                      <motion.button
                        style={styles.removeAdminBtn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemoveAdmin(user._id)}
                      >
                        <FiUser size={13} /> Remove Admin
                      </motion.button>
                    )}
                    <motion.button
                      style={styles.deleteBtn}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setDeleteId(user._id)}
                    >
                      <FiTrash2 size={13} />
                    </motion.button>
                  </>
                )}
                {currentUser.id === user._id && (
                  <div style={styles.youBadge}>Only You!</div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {users.length === 0 && (
          <motion.div style={styles.emptyState} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>👤</div>
            <div style={styles.emptyText}>Koi user nahi mila!</div>
          </motion.div>
        )}
      </motion.div>

      <AnimatePresence>
        {deleteId && <DeleteModal onConfirm={() => handleDelete(deleteId)} onCancel={() => setDeleteId(null)} />}
      </AnimatePresence>
    </AdminLayout>
  );
};

const styles = {
  pageHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "12px" },
  pageTitle: { color: "#fff", fontSize: "26px", fontWeight: "700", marginBottom: "6px" },
  pageSub: { color: "#4a5568", fontSize: "14px" },
  totalBadge: { background: "rgba(99,179,237,0.1)", color: "#63b3ed", border: "0.5px solid rgba(99,179,237,0.2)", padding: "8px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "500" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "20px" },
  userCard: { background: "rgba(13,27,42,0.8)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "24px", transition: "box-shadow 0.3s" },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" },
  userAvatar: { width: "52px", height: "52px", borderRadius: "50%", background: "linear-gradient(135deg, #3182ce, #63b3ed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "20px", fontWeight: "700" },
  roleBadge: { display: "flex", alignItems: "center", gap: "5px", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "600" },
  userName: { color: "#e2e8f0", fontSize: "16px", fontWeight: "600", marginBottom: "6px" },
  userEmail: { color: "#4a5568", fontSize: "13px", marginBottom: "6px" },
  userDate: { color: "#2d3748", fontSize: "12px", marginBottom: "20px" },
  cardActions: { display: "flex", gap: "10px", flexWrap: "wrap" },
  makeAdminBtn: { display: "flex", alignItems: "center", gap: "6px", background: "rgba(99,179,237,0.08)", border: "0.5px solid rgba(99,179,237,0.2)", color: "#63b3ed", cursor: "pointer", borderRadius: "8px", padding: "8px 14px", fontSize: "12px" },
  removeAdminBtn: { display: "flex", alignItems: "center", gap: "6px", background: "rgba(246,173,85,0.08)", border: "0.5px solid rgba(246,173,85,0.2)", color: "#f6ad55", cursor: "pointer", borderRadius: "8px", padding: "8px 14px", fontSize: "12px" },
  deleteBtn: { display: "flex", alignItems: "center", gap: "6px", background: "rgba(252,129,129,0.08)", border: "0.5px solid rgba(252,129,129,0.2)", color: "#fc8181", cursor: "pointer", borderRadius: "8px", padding: "8px 12px", fontSize: "12px" },
  youBadge: { color: "#63b3ed", fontSize: "13px", fontWeight: "600" },
  overlay: { position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" },
  deleteModal: { background: "#0d1b2a", border: "0.5px solid rgba(252,129,129,0.2)", borderRadius: "20px", padding: "40px", textAlign: "center", maxWidth: "360px", width: "100%", margin: "16px" },
  deleteTitle: { color: "#fff", fontSize: "20px", fontWeight: "700", marginBottom: "10px" },
  deleteText: { color: "#4a5568", fontSize: "14px", marginBottom: "28px" },
  deleteBtns: { display: "flex", gap: "12px", justifyContent: "center" },
  cancelBtn: { background: "rgba(255,255,255,0.05)", color: "#a0aec0", border: "0.5px solid rgba(255,255,255,0.1)", padding: "11px 28px", borderRadius: "10px", fontSize: "14px", cursor: "pointer" },
  confirmBtn: { background: "linear-gradient(135deg, #fc8181, #e53e3e)", color: "#fff", border: "none", padding: "11px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  emptyState: { textAlign: "center", padding: "60px" },
  emptyText: { color: "#4a5568", fontSize: "16px" },
};

export default AdminUsers;