import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FiX, FiCheck } from "react-icons/fi";

const plans = [
  {
    name: "Basic",
    price: "2,500",
    period: "/mo",
    color: "#63b3ed",
    features: ["Gym Access", "Locker Room", "1 Class/Week", "Forum Support", "Basic Equipment"],
    notIncluded: ["Personal Trainer", "Nutrition Plan"],
  },
  {
    name: "Standard",
    price: "4,500",
    period: "/mo",
    color: "#68d391",
    featured: true,
    features: ["Unlimited Access", "All Classes", "Diet Plan", "Email Support", "All Equipment", "Group Sessions"],
    notIncluded: ["Personal Trainer"],
  },
  {
    name: "Advanced",
    price: "7,000",
    period: "/mo",
    color: "#b794f4",
    features: ["Personal Trainer", "Nutrition Coach", "24/7 Access", "Priority Support", "All Equipment", "Private Sessions"],
    notIncluded: [],
  },
  {
    name: "Mighty",
    price: "10,000",
    period: "/mo",
    color: "#f6ad55",
    features: ["VIP Everything", "Private Sessions", "Custom Plan", "Dedicated Coach", "Spa Access", "Free Gear"],
    notIncluded: [],
  },
];

const PlanModal = ({ plan, onClose }) => (
  <motion.div
    style={styles.modalOverlay}
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
      <button style={styles.closeBtn} onClick={onClose}><FiX size={20} /></button>
      <div style={{ ...styles.modalAccent, background: plan.color }} />
      <div style={styles.modalPlanName}>{plan.name} Plan</div>
      <div style={{ ...styles.modalPrice, color: plan.color }}>
        Rs {plan.price}<span style={styles.modalPeriod}>{plan.period}</span>
      </div>
      <p style={styles.modalDesc}>
        You're about to subscribe to the {plan.name} plan. Enjoy exclusive access to premium fitness facilities and expert guidance.
      </p>
      <div style={styles.modalFeatures}>
        {plan.features.map((f) => (
          <div key={f} style={styles.modalFeatureItem}>
            <FiCheck size={16} color={plan.color} />
            <span style={{ color: "#a0aec0", fontSize: "14px" }}>{f}</span>
          </div>
        ))}
      </div>
      <motion.button
        style={{ ...styles.modalBtn, background: `linear-gradient(135deg, ${plan.color}, ${plan.color}aa)` }}
        whileHover={{ scale: 1.03, boxShadow: `0 0 25px ${plan.color}44` }}
        whileTap={{ scale: 0.97 }}
        onClick={onClose}
      >
        Confirm Subscription
      </motion.button>
    </motion.div>
  </motion.div>
);

const Plans = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedPlan, setSelectedPlan] = useState(null);

  return (
    <section id="plans" ref={ref} style={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div style={styles.label}>Membership</div>
        <h2 style={styles.title}>Choose Your <span style={styles.accent}>Plan</span></h2>
        <p style={styles.sub}>Flexible pricing for every commitment level</p>
      </motion.div>

      <div style={styles.grid}>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            style={{
              ...styles.card,
              border: plan.featured ? `1.5px solid ${plan.color}` : "0.5px solid rgba(255,255,255,0.06)",
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            whileHover={{ y: -8, boxShadow: `0 20px 40px rgba(0,0,0,0.4)` }}
          >
            {plan.featured && (
              <div style={{ ...styles.badge, background: plan.color }}>Most Popular</div>
            )}
            <div style={{ ...styles.planName, color: plan.color }}>{plan.name}</div>
            <div style={{ ...styles.price, color: "#fff" }}>
              Rs {plan.price}<span style={styles.per}>{plan.period}</span>
            </div>
            <div style={styles.divider} />
            <ul style={styles.featureList}>
              {plan.features.map((f) => (
                <li key={f} style={styles.featureItem}>
                  <FiCheck size={14} color={plan.color} style={{ flexShrink: 0 }} />
                  <span>{f}</span>
                </li>
              ))}
              {plan.notIncluded.map((f) => (
                <li key={f} style={{ ...styles.featureItem, opacity: 0.3 }}>
                  <FiX size={14} color="#718096" style={{ flexShrink: 0 }} />
                  <span style={{ textDecoration: "line-through" }}>{f}</span>
                </li>
              ))}
            </ul>
            <motion.button
              style={{
                ...styles.planBtn,
                background: plan.featured
                  ? `linear-gradient(135deg, ${plan.color}, ${plan.color}aa)`
                  : "transparent",
                color: plan.featured ? "#000" : plan.color,
                border: plan.featured ? "none" : `1px solid ${plan.color}`,
              }}
              whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${plan.color}33` }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedPlan(plan)}
            >
              {plan.featured ? "Join Now" : "Get Started"}
            </motion.button>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPlan && (
          <PlanModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

const styles = {
  section: { background: "linear-gradient(135deg, #0d1b2a 0%, #0a0f1e 100%)", padding: "90px 48px" },
  label: { fontSize: "11px", letterSpacing: "3px", color: "#63b3ed", textTransform: "uppercase", marginBottom: "10px" },
  title: { fontSize: "36px", fontWeight: "700", color: "#fff", marginBottom: "12px" },
  accent: { background: "linear-gradient(135deg, #63b3ed, #3182ce)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  sub: { fontSize: "15px", color: "#4a5568", marginBottom: "48px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "24px" },
  card: {
    background: "rgba(13,27,42,0.8)",
    borderRadius: "18px", padding: "32px 26px",
    textAlign: "center", position: "relative",
    backdropFilter: "blur(10px)",
    transition: "box-shadow 0.3s",
  },
  badge: {
    position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
    color: "#000", fontSize: "11px", fontWeight: "700",
    padding: "5px 18px", borderRadius: "20px", whiteSpace: "nowrap",
  },
  planName: { fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "600", marginBottom: "14px" },
  price: { fontSize: "36px", fontWeight: "700", marginBottom: "6px" },
  per: { fontSize: "14px", color: "#4a5568", fontWeight: "400" },
  divider: { height: "0.5px", background: "rgba(255,255,255,0.06)", margin: "20px 0" },
  featureList: { listStyle: "none", padding: 0, margin: "0 0 24px", textAlign: "left" },
  featureItem: { color: "#718096", fontSize: "13px", padding: "7px 0", borderBottom: "0.5px solid rgba(255,255,255,0.04)", display: "flex", alignItems: "center", gap: "10px" },
  planBtn: { width: "100%", padding: "12px", borderRadius: "10px", fontSize: "14px", fontWeight: "600", cursor: "pointer" },
  modalOverlay: {
    position: "fixed", inset: 0, zIndex: 2000,
    background: "rgba(0,0,0,0.75)",
    display: "flex", alignItems: "center", justifyContent: "center",
    backdropFilter: "blur(6px)",
  },
  modal: {
    background: "#0d1b2a",
    border: "0.5px solid rgba(99,179,237,0.2)",
    borderRadius: "20px", padding: "36px",
    width: "100%", maxWidth: "400px",
    position: "relative", overflow: "hidden",
    margin: "16px",
  },
  modalAccent: { position: "absolute", top: 0, left: 0, right: 0, height: "3px" },
  closeBtn: {
    position: "absolute", top: "16px", right: "16px",
    background: "rgba(255,255,255,0.05)", border: "none",
    color: "#718096", cursor: "pointer", borderRadius: "8px",
    padding: "6px", display: "flex", alignItems: "center",
  },
  modalPlanName: { color: "#a0aec0", fontSize: "13px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", marginTop: "8px" },
  modalPrice: { fontSize: "40px", fontWeight: "700", marginBottom: "16px" },
  modalPeriod: { fontSize: "16px", color: "#4a5568", fontWeight: "400" },
  modalDesc: { color: "#4a5568", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" },
  modalFeatures: { display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" },
  modalFeatureItem: { display: "flex", alignItems: "center", gap: "10px" },
  modalBtn: { width: "100%", padding: "14px", borderRadius: "10px", border: "none", color: "#000", fontSize: "15px", fontWeight: "700", cursor: "pointer" },
};

export default Plans;
