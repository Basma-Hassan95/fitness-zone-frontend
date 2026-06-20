import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiEye, FiX } from "react-icons/fi";
import AdminLayout from "../components/AdminLayout";
import axios from 'axios';

const statusColors = {
  unread: { color: "#fc8181", bg: "rgba(252,129,129,0.1)", border: "rgba(252,129,129,0.3)" },
  read: { color: "#f6ad55", bg: "rgba(246,173,85,0.1)", border: "rgba(246,173,85,0.3)" },
  replied: { color: "#68d391", bg: "rgba(104,211,145,0.1)", border: "rgba(104,211,145,0.3)" },
};

const MessageModal = ({ msg, onClose }) => (
  <motion.div style={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
    <motion.div style={styles.modal} initial={{ scale: 0.85, opacity: 0, y: 40 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.85, opacity: 0, y: 40 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={(e) => e.stopPropagation()}>
      <button style={styles.closeBtn} onClick={onClose}><FiX size={18} /></button>
      <div style={styles.modalAvatar}>{msg.name.charAt(0)}</div>
      <h3 style={styles.modalName}>{msg.name}</h3>
      <div style={styles.modalMeta}>
        <span style={styles.metaChip}>📧 {msg.email}</span>
        <span style={styles.metaChip}>📞 {msg.phone}</span>
        <span style={styles.metaChip}>📅 {new Date(msg.createdAt).toLocaleDateString()}</span>
      </div>
      <div style={{ ...styles.statusBadge, color: statusColors[msg.status].color, background: statusColors[msg.status].bg, border: `1px solid ${statusColors[msg.status].border}` }}>
        {msg.status.toUpperCase()}
      </div>
      <div style={styles.modalMessage}>
        <div style={styles.modalMsgLabel}>Message:</div>
        <p style={styles.modalMsgText}>{msg.message}</p>
      </div>
    </motion.div>
  </motion.div>
);

const DeleteModal = ({ onConfirm, onCancel }) => (
  <motion.div style={styles.overlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onCancel}>
    <motion.div style={styles.deleteModal} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} onClick={(e) => e.stopPropagation()}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🗑️</div>
      <h3 style={styles.deleteTitle}>Delete Message?</h3>
      <p style={styles.deleteText}>Yeh message permanently delete ho jaayega!</p>
      <div style={styles.deleteBtns}>
        <motion.button style={styles.cancelBtn} whileHover={{ scale: 1.04 }} onClick={onCancel}>Cancel</motion.button>
        <motion.button style={styles.confirmBtn} whileHover={{ scale: 1.04 }} onClick={onConfirm}>Delete</motion.button>
      </div>
    </motion.div>
  </motion.div>
);

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [filter, setFilter] = useState("all");

  // Real API se messages fetch karo
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get('https://fitness-zone-backend.vercel.app/api/contact', {
          headers: { Authorization: `Bearer ${token}` }
        })
        setMessages(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchMessages()
  }, [])

  // Real API se status update karo
  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token')
      await axios.put(`https://fitness-zone-backend.vercel.app/api/contact/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessages(prev => prev.map(m => m._id === id ? { ...m, status: newStatus } : m))
    } catch (error) {
      console.log(error)
    }
  }

  // Real API se delete karo
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token')
      await axios.delete(`https://fitness-zone-backend.vercel.app/api/contact/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessages(prev => prev.filter(m => m._id !== id))
      setDeleteId(null)
    } catch (error) {
      console.log(error)
    }
  }

  const filtered = filter === "all" ? messages : messages.filter(m => m.status === filter);

  if (loading) return (
    <AdminLayout>
      <div style={{ color: "#63b3ed", fontSize: "18px", textAlign: "center", marginTop: "100px" }}>
        Loading messages...
      </div>
    </AdminLayout>
  )

  return (
    <AdminLayout>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div style={styles.pageHeader}>
          <div>
            <h1 style={styles.pageTitle}>📨 Messages</h1>
            <p style={styles.pageSub}>Saare contact form messages yahan hain</p>
          </div>
        </div>

        <div style={styles.filterRow}>
          {["all", "unread", "read", "replied"].map((f) => (
            <motion.button
              key={f}
              style={{
                ...styles.filterBtn,
                background: filter === f ? "linear-gradient(135deg, #3182ce, #63b3ed)" : "rgba(13,27,42,0.8)",
                color: filter === f ? "#fff" : "#4a5568",
                border: filter === f ? "none" : "0.5px solid rgba(255,255,255,0.08)",
              }}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
              <span style={styles.filterCount}>
                {f === "all" ? messages.length : messages.filter(m => m.status === f).length}
              </span>
            </motion.button>
          ))}
        </div>

        <motion.div style={styles.tableCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div style={styles.tableWrap}>
            <table style={styles.table}>
              <thead>
                <tr>
                  {["Name", "Email", "Message", "Status", "Date", "Actions"].map(h => (
                    <th key={h} style={styles.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filtered.map((msg, i) => (
                    <motion.tr key={msg._id} style={styles.tr} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: i * 0.08 }} whileHover={{ background: "rgba(99,179,237,0.04)" }}>
                      <td style={styles.td}>
                        <div style={styles.nameCell}>
                          <div style={styles.avatar}>{msg.name.charAt(0)}</div>
                          <div>
                            <div style={styles.msgName}>{msg.name}</div>
                            <div style={styles.msgPhone}>{msg.phone}</div>
                          </div>
                        </div>
                      </td>
                      <td style={styles.td}><span style={styles.emailText}>{msg.email}</span></td>
                      <td style={styles.td}>
                        <span style={styles.msgPreview}>
                          {msg.message.length > 40 ? msg.message.substring(0, 40) + "..." : msg.message}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <select value={msg.status} onChange={(e) => handleStatusChange(msg._id, e.target.value)} style={{ ...styles.statusSelect, color: statusColors[msg.status].color, background: statusColors[msg.status].bg, border: `1px solid ${statusColors[msg.status].border}` }}>
                          <option value="unread">🔴 Unread</option>
                          <option value="read">🟡 Read</option>
                          <option value="replied">🟢 Replied</option>
                        </select>
                      </td>
                      <td style={styles.td}><span style={styles.dateText}>{new Date(msg.createdAt).toLocaleDateString()}</span></td>
                      <td style={styles.td}>
                        <div style={styles.actions}>
                          <motion.button style={styles.viewBtn} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setSelectedMsg(msg)}>
                            <FiEye size={15} />
                          </motion.button>
                          <motion.button style={styles.deleteBtn} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setDeleteId(msg._id)}>
                            <FiTrash2 size={15} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ textAlign: "center", padding: "48px", color: "#4a5568" }}>
                No Messages!
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedMsg && <MessageModal msg={selectedMsg} onClose={() => setSelectedMsg(null)} />}
        {deleteId && <DeleteModal onConfirm={() => handleDelete(deleteId)} onCancel={() => setDeleteId(null)} />}
      </AnimatePresence>
    </AdminLayout>
  );
};

const styles = {
  pageHeader: { marginBottom: "28px" },
  pageTitle: { color: "#fff", fontSize: "26px", fontWeight: "700", marginBottom: "6px" },
  pageSub: { color: "#4a5568", fontSize: "14px" },
  filterRow: { display: "flex", gap: "12px", marginBottom: "24px", flexWrap: "wrap" },
  filterBtn: { padding: "9px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" },
  filterCount: { background: "rgba(255,255,255,0.1)", padding: "2px 8px", borderRadius: "20px", fontSize: "11px" },
  tableCard: { background: "rgba(13,27,42,0.8)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden" },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { color: "#4a5568", fontSize: "11px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase", padding: "14px 16px", textAlign: "left", borderBottom: "0.5px solid rgba(255,255,255,0.06)" },
  tr: { borderBottom: "0.5px solid rgba(255,255,255,0.04)", transition: "background 0.2s" },
  td: { padding: "14px 16px", verticalAlign: "middle" },
  nameCell: { display: "flex", alignItems: "center", gap: "10px" },
  avatar: { width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #3182ce, #63b3ed)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "14px", fontWeight: "700", flexShrink: 0 },
  msgName: { color: "#e2e8f0", fontSize: "13px", fontWeight: "500" },
  msgPhone: { color: "#4a5568", fontSize: "11px", marginTop: "2px" },
  emailText: { color: "#718096", fontSize: "13px" },
  msgPreview: { color: "#4a5568", fontSize: "13px" },
  statusSelect: { padding: "5px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", cursor: "pointer", outline: "none" },
  dateText: { color: "#4a5568", fontSize: "12px" },
  actions: { display: "flex", gap: "8px" },
  viewBtn: { background: "rgba(99,179,237,0.08)", border: "0.5px solid rgba(99,179,237,0.2)", color: "#63b3ed", cursor: "pointer", borderRadius: "8px", padding: "7px", display: "flex" },
  deleteBtn: { background: "rgba(252,129,129,0.08)", border: "0.5px solid rgba(252,129,129,0.2)", color: "#fc8181", cursor: "pointer", borderRadius: "8px", padding: "7px", display: "flex" },
  overlay: { position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" },
  modal: { background: "#0d1b2a", border: "0.5px solid rgba(99,179,237,0.2)", borderRadius: "20px", padding: "40px", width: "100%", maxWidth: "460px", textAlign: "center", position: "relative", margin: "16px" },
  closeBtn: { position: "absolute", top: "16px", right: "16px", background: "rgba(255,255,255,0.05)", border: "none", color: "#718096", cursor: "pointer", borderRadius: "8px", padding: "6px", display: "flex" },
  modalAvatar: { width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, #3182ce, #63b3ed)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: "24px", fontWeight: "700", color: "#fff" },
  modalName: { color: "#fff", fontSize: "20px", fontWeight: "700", marginBottom: "14px" },
  modalMeta: { display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap", marginBottom: "14px" },
  metaChip: { background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)", color: "#718096", fontSize: "12px", padding: "4px 12px", borderRadius: "20px" },
  statusBadge: { display: "inline-block", padding: "4px 14px", borderRadius: "20px", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", marginBottom: "20px" },
  modalMessage: { background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "16px", textAlign: "left" },
  modalMsgLabel: { color: "#63b3ed", fontSize: "11px", fontWeight: "600", letterSpacing: "1px", marginBottom: "8px" },
  modalMsgText: { color: "#a0aec0", fontSize: "14px", lineHeight: 1.8 },
  deleteModal: { background: "#0d1b2a", border: "0.5px solid rgba(252,129,129,0.2)", borderRadius: "20px", padding: "40px", textAlign: "center", maxWidth: "360px", width: "100%", margin: "16px" },
  deleteTitle: { color: "#fff", fontSize: "20px", fontWeight: "700", marginBottom: "10px" },
  deleteText: { color: "#4a5568", fontSize: "14px", marginBottom: "28px" },
  deleteBtns: { display: "flex", gap: "12px", justifyContent: "center" },
  cancelBtn: { background: "rgba(255,255,255,0.05)", color: "#a0aec0", border: "0.5px solid rgba(255,255,255,0.1)", padding: "11px 28px", borderRadius: "10px", fontSize: "14px", cursor: "pointer" },
  confirmBtn: { background: "linear-gradient(135deg, #fc8181, #e53e3e)", color: "#fff", border: "none", padding: "11px 28px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
};

export default AdminMessages;