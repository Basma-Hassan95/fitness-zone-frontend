import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import axios from 'axios'

const SuccessModal = ({ onClose }) => (
  <motion.div
    style={styles.overlay}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      style={styles.modal}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={(e) => e.stopPropagation()}
    >
      <motion.div
        style={styles.successIcon}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
      >
        ✓
      </motion.div>
      <h3 style={styles.successTitle}>Message Sent!</h3>
      <p style={styles.successText}>
        Thank you for reaching out. Our team will get back to you within 24 hours.
      </p>
      <motion.button
        style={styles.successBtn}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClose}
      >
        Awesome, Thanks!
      </motion.button>
    </motion.div>
  </motion.div>
);

const Contact = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault()
  
  try {
    await axios.post('https://fitness-zone-backend.vercel.app/api/contact', form)
    setShowModal(true)
    setForm({ name: "", email: "", phone: "", message: "" })
  } catch (error) {
    console.log(error)
    alert("Something went wrong! Please try again.")
  }
}
  return (
    <section id="contact" ref={ref} style={styles.section}>
      <motion.div
        style={styles.left}
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div style={styles.label}>Get in Touch</div>
        <h2 style={styles.title}>Contact <span style={styles.accent}>Us</span></h2>
        <p style={styles.sub}>We'd love to hear from you. Drop us a message anytime!</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.row}>
            <input style={styles.input} type="text" name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
            <input style={styles.input} type="tel" name="phone" placeholder="Phone number" value={form.phone} onChange={handleChange} />
          </div>
          <input style={styles.input} type="email" name="email" placeholder="Email address" value={form.email} onChange={handleChange} required />
          <textarea style={{ ...styles.input, height: "130px", resize: "vertical" }} name="message" placeholder="Your message..." value={form.message} onChange={handleChange} required />
          <motion.button
            type="submit"
            style={styles.submitBtn}
            whileHover={{ scale: 1.04, boxShadow: "0 0 25px rgba(99,179,237,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            Send Message →
          </motion.button>
        </form>
      </motion.div>

      <motion.div
        style={styles.right}
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {[
          { icon: "📍", title: "Location", text: "123 Fitness Street, Karachi, Pakistan" },
          { icon: "📞", title: "Phone", text: "+92 300 1234567" },
          { icon: "✉️", title: "Email", text: "info@fitnesszone.pk" },
          { icon: "🕐", title: "Hours", text: "Mon–Sat: 6am – 11pm" },
        ].map((info, i) => (
          <motion.div
            key={info.title}
            style={styles.infoCard}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ y: -4, borderColor: "rgba(99,179,237,0.25)" }}
          >
            <span style={styles.infoIcon}>{info.icon}</span>
            <div>
              <div style={styles.infoTitle}>{info.title}</div>
              <div style={styles.infoText}>{info.text}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {showModal && <SuccessModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>
    </section>
  );
};

const styles = {
  section: {
    background: "linear-gradient(135deg, #0d1b2a 0%, #0a0f1e 100%)",
    padding: "90px 48px",
    display: "flex", gap: "60px", flexWrap: "wrap", alignItems: "flex-start",
  },
  left: { flex: 1, minWidth: "300px" },
  right: { flex: "0 0 300px", display: "flex", flexDirection: "column", gap: "16px" },
  label: { fontSize: "11px", letterSpacing: "3px", color: "#63b3ed", textTransform: "uppercase", marginBottom: "10px" },
  title: { fontSize: "36px", fontWeight: "700", color: "#fff", marginBottom: "12px" },
  accent: { background: "linear-gradient(135deg, #63b3ed, #3182ce)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  sub: { fontSize: "15px", color: "#4a5568", marginBottom: "28px" },
  form: { display: "flex", flexDirection: "column", gap: "14px" },
  row: { display: "flex", gap: "14px" },
  input: {
    flex: 1, background: "rgba(13,27,42,0.8)",
    border: "0.5px solid rgba(99,179,237,0.15)",
    borderRadius: "10px", padding: "13px 16px",
    color: "#e2e8f0", fontSize: "14px", fontFamily: "inherit",
    outline: "none", transition: "border-color 0.2s",
    width: "100%",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #3182ce, #63b3ed)",
    color: "#fff", border: "none",
    padding: "14px 32px", borderRadius: "10px",
    fontSize: "15px", fontWeight: "600", cursor: "pointer",
    alignSelf: "flex-start",
  },
  infoCard: {
    background: "rgba(13,27,42,0.8)",
    border: "0.5px solid rgba(255,255,255,0.06)",
    borderRadius: "14px", padding: "20px",
    display: "flex", gap: "16px", alignItems: "flex-start",
    transition: "border-color 0.2s, transform 0.2s",
  },
  infoIcon: { fontSize: "24px", marginTop: "2px" },
  infoTitle: { color: "#e2e8f0", fontSize: "14px", fontWeight: "600", marginBottom: "4px" },
  infoText: { color: "#4a5568", fontSize: "13px", lineHeight: 1.5 },
  overlay: {
    position: "fixed", inset: 0, zIndex: 2000,
    background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  modal: {
    background: "#0d1b2a",
    border: "0.5px solid rgba(99,179,237,0.2)",
    borderRadius: "22px", padding: "48px 40px",
    textAlign: "center", maxWidth: "380px", width: "100%",
    margin: "16px",
  },
  successIcon: {
    width: "72px", height: "72px",
    background: "rgba(104,211,145,0.15)",
    border: "0.5px solid rgba(104,211,145,0.3)",
    borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 24px",
    fontSize: "32px", color: "#68d391",
  },
  successTitle: { color: "#fff", fontSize: "24px", fontWeight: "700", marginBottom: "12px" },
  successText: { color: "#4a5568", fontSize: "14px", lineHeight: 1.7, marginBottom: "28px" },
  successBtn: {
    background: "linear-gradient(135deg, #3182ce, #63b3ed)",
    color: "#fff", border: "none",
    padding: "13px 32px", borderRadius: "10px",
    fontSize: "15px", fontWeight: "600", cursor: "pointer",
  },
};

export default Contact;
