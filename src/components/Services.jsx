import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaRunning, FaDumbbell, FaHeartbeat, FaFire, FaBiking, FaSwimmer } from "react-icons/fa";
import { FiX, FiCheck, FiClock, FiUsers } from "react-icons/fi";
import AuthModal from "./AuthModal";

const services = [
  {
    icon: <FaRunning />,
    name: "Cardio",
    desc: "High intensity sessions to boost endurance and burn fat fast.",
    color: "#63b3ed",
    bg: "rgba(99,179,237,0.08)",
    fullDesc: "Our Cardio program is designed to maximize fat burning and improve cardiovascular health. With expert trainers guiding every session, you will push your limits safely and effectively.",
    benefits: ["Burns up to 600 calories per session", "Improves heart health", "Boosts metabolism", "Increases stamina", "Reduces stress"],
    schedule: "Mon, Wed, Fri — 7:00 AM & 6:00 PM",
    trainer: "John Doe",
    capacity: "20 members per class",
  },
  {
    icon: <FaDumbbell />,
    name: "Strength",
    desc: "Build muscle and power with guided weightlifting programs.",
    color: "#68d391",
    bg: "rgba(104,211,145,0.08)",
    fullDesc: "Our Strength training program helps you build lean muscle mass and increase overall power. Whether you are a beginner or advanced lifter, our certified trainers will design the perfect program for you.",
    benefits: ["Builds lean muscle mass", "Increases bone density", "Boosts metabolism", "Improves posture", "Enhances athletic performance"],
    schedule: "Tue, Thu, Sat — 8:00 AM & 7:00 PM",
    trainer: "Larry Doe",
    capacity: "15 members per class",
  },
  {
    icon: <FaHeartbeat />,
    name: "Aerobics",
    desc: "Fun group classes that improve coordination and cardiovascular health.",
    color: "#f6ad55",
    bg: "rgba(246,173,85,0.08)",
    fullDesc: "Join our energetic Aerobics classes and experience the most fun workout of your life! Our group sessions combine dance, movement and cardio for a full body workout that never feels like exercise.",
    benefits: ["Full body workout", "Improves coordination", "Boosts mood instantly", "Burns fat effectively", "Great for all fitness levels"],
    schedule: "Mon, Wed, Fri — 9:00 AM & 5:00 PM",
    trainer: "Joan Ray",
    capacity: "25 members per class",
  },
  {
    icon: <FaFire />,
    name: "Ab Crunch",
    desc: "Targeted core workouts for a stronger, leaner midsection.",
    color: "#fc8181",
    bg: "rgba(252,129,129,0.08)",
    fullDesc: "Our Ab Crunch program focuses on building a strong, defined core. Through targeted exercises and proven techniques, you will develop the six-pack you have always wanted while improving your overall stability.",
    benefits: ["Defines and tones abs", "Strengthens core muscles", "Improves balance", "Reduces back pain", "Enhances overall performance"],
    schedule: "Daily — 6:00 AM & 8:00 PM",
    trainer: "Ranith Kays",
    capacity: "20 members per class",
  },
  {
    icon: <FaBiking />,
    name: "Cycling",
    desc: "Indoor cycling for intense cardio and lower body strength.",
    color: "#b794f4",
    bg: "rgba(183,148,244,0.08)",
    fullDesc: "Experience the thrill of cycling without leaving the gym! Our Indoor Cycling classes provide an intense cardiovascular workout while building lower body strength and endurance in a high-energy environment.",
    benefits: ["Intense cardio workout", "Builds leg strength", "Low impact on joints", "Burns 500+ calories", "Improves endurance"],
    schedule: "Tue, Thu, Sat — 7:00 AM & 6:00 PM",
    trainer: "John Doe",
    capacity: "18 members per class",
  },
  {
    icon: <FaSwimmer />,
    name: "Aqua Fit",
    desc: "Low-impact water workouts perfect for all fitness levels.",
    color: "#76e4f7",
    bg: "rgba(118,228,247,0.08)",
    fullDesc: "Aqua Fit is the perfect workout for those looking for low-impact exercise that is easy on the joints. Our water-based fitness classes provide a full body workout while keeping you cool and refreshed.",
    benefits: ["Zero impact on joints", "Full body workout", "Perfect for all ages", "Reduces muscle soreness", "Improves flexibility"],
    schedule: "Mon, Wed, Fri — 10:00 AM & 4:00 PM",
    trainer: "Joan Ray",
    capacity: "15 members per class",
  },
];

// Success Modal
const SuccessModal = ({ service, onClose }) => (
  <motion.div
    style={styles.overlay}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      style={styles.successModal}
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
        🎉
      </motion.div>
      <h3 style={styles.successTitle}>Enrolled Successfully!</h3>
      <p style={styles.successText}>
        You have been enrolled in <span style={{ color: service?.color, fontWeight: "600" }}>{service?.name}</span>. Our trainer will contact you shortly!
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

// Service Modal
const ServiceModal = ({ service, onClose, onJoin }) => (
  <motion.div
    style={styles.overlay}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
  >
    <motion.div
      style={styles.modal}
      initial={{ scale: 0.85, opacity: 0, y: 40 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0, y: 40 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button style={styles.closeBtn} onClick={onClose}><FiX size={18} /></button>

      {/* Header */}
      <div style={{ ...styles.modalHeader, borderBottom: `2px solid ${service.color}22` }}>
        <div style={{ ...styles.modalIcon, color: service.color, background: `${service.color}15` }}>
          {service.icon}
        </div>
        <div>
          <h2 style={{ ...styles.modalTitle, color: service.color }}>{service.name}</h2>
          <p style={styles.modalSubtitle}>{service.desc}</p>
        </div>
      </div>

      {/* Body */}
      <div style={styles.modalBody}>
        <p style={styles.modalDesc}>{service.fullDesc}</p>

        {/* Benefits */}
        <div style={styles.sectionWrap}>
          <div style={styles.sectionTitle}>✨ Benefits</div>
          <div style={styles.benefitsList}>
            {service.benefits.map((b) => (
              <div key={b} style={styles.benefitItem}>
                <FiCheck size={14} color={service.color} style={{ flexShrink: 0 }} />
                <span style={styles.benefitText}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div style={styles.infoGrid}>
          <div style={styles.infoCard}>
            <FiClock size={18} color={service.color} />
            <div style={styles.infoLabel}>Schedule</div>
            <div style={styles.infoValue}>{service.schedule}</div>
          </div>
          <div style={styles.infoCard}>
            <FiUsers size={18} color={service.color} />
            <div style={styles.infoLabel}>Capacity</div>
            <div style={styles.infoValue}>{service.capacity}</div>
          </div>
        </div>

        {/* Trainer */}
        <div style={styles.trainerCard}>
          <div style={{ ...styles.trainerAvatar, background: `${service.color}20`, color: service.color }}>
            {service.trainer.charAt(0)}
          </div>
          <div>
            <div style={styles.trainerLabel}>Your Trainer</div>
            <div style={styles.trainerName}>{service.trainer}</div>
          </div>
        </div>

        {/* CTA Button */}
        <motion.button
          style={{ ...styles.joinBtn, background: `linear-gradient(135deg, ${service.color}, ${service.color}aa)` }}
          whileHover={{ scale: 1.03, boxShadow: `0 0 25px ${service.color}44` }}
          whileTap={{ scale: 0.97 }}
          onClick={onJoin}
        >
          Join This Class →
        </motion.button>
      </div>
    </motion.div>
  </motion.div>
);

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" }
  }),
};

const Services = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedService, setSelectedService] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [successService, setSuccessService] = useState(null);

const handleJoin = async () => {
    const token = localStorage.getItem("token");
    const service = selectedService;
    setSelectedService(null);

    if (!token) {
      setAuthOpen(true);
    } else {
      try {
        const res = await fetch("https://fitness-zone-backend.vercel.app/api/auth/enroll", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ className: service.name })
        });

        const data = await res.json();

        if (res.ok) {
          setSuccessService(service); // ✅ MongoDB mein save hone ke baad dikha
        } else {
          alert(data.message); // "Already enrolled!" etc
        }
      } catch (err) {
        alert("Server se connect nahi ho saka!");
      }
    }
  };

  return (
    <section id="services" ref={ref} style={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div style={styles.label}>What We Offer</div>
        <h2 style={styles.title}>Our <span style={styles.accent}>Services</span></h2>
        <p style={styles.sub}>Expert-led classes designed for every fitness level</p>
      </motion.div>

      <div style={styles.grid}>
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            whileHover={{ y: -8, boxShadow: `0 20px 40px rgba(0,0,0,0.3)` }}
            style={{ ...styles.card, borderTop: `2px solid ${s.color}` }}
          >
            <div style={{ ...styles.iconBox, background: s.bg, color: s.color }}>
              {s.icon}
            </div>
            <div style={styles.name}>{s.name}</div>
            <div style={styles.desc}>{s.desc}</div>
            <motion.div
              style={{ ...styles.learnMore, color: s.color }}
              whileHover={{ x: 4 }}
              onClick={() => setSelectedService(s)}
            >
              Learn more →
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
            onJoin={handleJoin}
          />
        )}
        {successService && (
          <SuccessModal
            service={successService}
            onClose={() => setSuccessService(null)}
          />
        )}
        {authOpen && (
          <AuthModal
            isOpen={authOpen}
            onClose={() => setAuthOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

const styles = {
  section: { background: "linear-gradient(180deg, #0a0f1e 0%, #0d1b2a 100%)", padding: "90px 48px" },
  label: { fontSize: "11px", letterSpacing: "3px", color: "#63b3ed", textTransform: "uppercase", marginBottom: "10px" },
  title: { fontSize: "36px", fontWeight: "700", color: "#fff", marginBottom: "12px" },
  accent: { background: "linear-gradient(135deg, #63b3ed, #3182ce)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  sub: { fontSize: "15px", color: "#4a5568", marginBottom: "48px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" },
  card: { background: "rgba(13,27,42,0.7)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "32px 26px", cursor: "default", transition: "box-shadow 0.3s", backdropFilter: "blur(10px)" },
  iconBox: { width: "52px", height: "52px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "20px" },
  name: { color: "#e2e8f0", fontSize: "17px", fontWeight: "600", marginBottom: "10px" },
  desc: { color: "#4a5568", fontSize: "14px", lineHeight: 1.7, marginBottom: "16px" },
  learnMore: { fontSize: "13px", fontWeight: "600", cursor: "pointer", display: "inline-block" },
  overlay: { position: "fixed", inset: 0, zIndex: 2000, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" },
  modal: { background: "#0d1b2a", border: "0.5px solid rgba(99,179,237,0.15)", borderRadius: "20px", width: "100%", maxWidth: "520px", position: "relative", overflow: "hidden", maxHeight: "90vh", overflowY: "auto" },
  closeBtn: { position: "absolute", top: "16px", right: "16px", background: "rgba(255,255,255,0.05)", border: "none", color: "#718096", cursor: "pointer", borderRadius: "8px", padding: "6px", display: "flex", zIndex: 10 },
  modalHeader: { display: "flex", alignItems: "center", gap: "16px", padding: "28px 28px 24px" },
  modalIcon: { width: "56px", height: "56px", borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", flexShrink: 0 },
  modalTitle: { fontSize: "24px", fontWeight: "700", marginBottom: "6px" },
  modalSubtitle: { color: "#4a5568", fontSize: "14px" },
  modalBody: { padding: "24px 28px 28px" },
  modalDesc: { color: "#718096", fontSize: "14px", lineHeight: 1.8, marginBottom: "24px" },
  sectionWrap: { marginBottom: "24px" },
  sectionTitle: { color: "#e2e8f0", fontSize: "15px", fontWeight: "600", marginBottom: "14px" },
  benefitsList: { display: "flex", flexDirection: "column", gap: "10px" },
  benefitItem: { display: "flex", alignItems: "center", gap: "10px" },
  benefitText: { color: "#a0aec0", fontSize: "14px" },
  infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" },
  infoCard: { background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "6px" },
  infoLabel: { color: "#4a5568", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginTop: "6px" },
  infoValue: { color: "#e2e8f0", fontSize: "13px", fontWeight: "500" },
  trainerCard: { display: "flex", alignItems: "center", gap: "12px", background: "rgba(255,255,255,0.03)", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "16px", marginBottom: "24px" },
  trainerAvatar: { width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "700", flexShrink: 0 },
  trainerLabel: { color: "#4a5568", fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" },
  trainerName: { color: "#e2e8f0", fontSize: "14px", fontWeight: "600" },
  joinBtn: { width: "100%", padding: "14px", borderRadius: "10px", border: "none", color: "#000", fontSize: "15px", fontWeight: "700", cursor: "pointer" },
  successModal: { background: "#0d1b2a", border: "0.5px solid rgba(104,211,145,0.2)", borderRadius: "22px", padding: "48px 40px", textAlign: "center", maxWidth: "380px", width: "100%", margin: "16px" },
  successIcon: { fontSize: "52px", marginBottom: "16px" },
  successTitle: { color: "#fff", fontSize: "24px", fontWeight: "700", marginBottom: "12px" },
  successText: { color: "#4a5568", fontSize: "14px", lineHeight: 1.7, marginBottom: "28px" },
  successBtn: { background: "linear-gradient(135deg, #3182ce, #63b3ed)", color: "#fff", border: "none", padding: "13px 32px", borderRadius: "10px", fontSize: "15px", fontWeight: "600", cursor: "pointer" },
};

export default Services;