import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const words = ["Stronger.", "Faster.", "Better.", "Unstoppable."];

const stats = [
  { num: 2400, suffix: "+", label: "Members" },
  { num: 15, suffix: "+", label: "Trainers" },
  { num: 8, suffix: "yr", label: "Experience" },
  { num: 50, suffix: "+", label: "Classes" },
];

const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{count}{suffix}</span>;
};

const Hero = () => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" style={styles.section}>
      {/* Background gradient orbs */}
      <div style={styles.orb1} />
      <div style={styles.orb2} />

      <div style={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={styles.tag}
        >
          🏆 No. 1 Gym in Town
        </motion.div>

        <motion.h1
          style={styles.heading}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Train Hard.<br />
          Become{" "}
          <motion.span
            key={wordIndex}
            style={styles.highlight}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {words[wordIndex]}
          </motion.span>
        </motion.h1>

        <motion.p
          style={styles.para}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Professional trainers, world-class equipment, and personalized plans
          to help you achieve your fitness goals faster than ever before.
        </motion.p>

        <motion.div
          style={styles.btns}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <motion.button
            style={styles.primaryBtn}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(99,179,237,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            Get Started →
          </motion.button>
          <motion.button
            style={styles.outlineBtn}
            whileHover={{ scale: 1.05, background: "rgba(99,179,237,0.1)" }}
            whileTap={{ scale: 0.97 }}
          >
            View Plans
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          style={styles.stats}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              style={styles.stat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.15 }}
            >
              <div style={styles.statNum}>
                <Counter target={s.num} suffix={s.suffix} />
              </div>
              <div style={styles.statLabel}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Right Card */}
      <motion.div
        style={styles.cardWrap}
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>Today's Progress</span>
            <span style={styles.cardBadge}>Live</span>
          </div>
          {[
            { label: "Cardio", pct: 72, color: "#63b3ed" },
            { label: "Strength", pct: 58, color: "#68d391" },
            { label: "Flexibility", pct: 85, color: "#f6ad55" },
            { label: "Endurance", pct: 65, color: "#fc8181" },
          ].map((item) => (
            <div key={item.label} style={styles.progItem}>
              <div style={styles.progLabelRow}>
                <span style={styles.progLabel}>{item.label}</span>
                <span style={{ ...styles.progPct, color: item.color }}>{item.pct}%</span>
              </div>
              <div style={styles.progBar}>
                <motion.div
                  style={{ ...styles.progFill, background: item.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
          <div style={styles.cardFooter}>
            <span style={styles.footerText}>Next session: 6:00 PM</span>
            <span style={styles.footerBadge}>Chest Day 💪</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const styles = {
  section: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0f1e 0%, #0d1b2a 50%, #0a0f1e 100%)",
    padding: "120px 48px 80px",
    display: "flex",
    alignItems: "center",
    gap: "60px",
    flexWrap: "wrap",
    position: "relative",
    overflow: "hidden",
  },
  orb1: {
    position: "absolute", top: "-100px", right: "10%",
    width: "500px", height: "500px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(49,130,206,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  orb2: {
    position: "absolute", bottom: "-100px", left: "5%",
    width: "400px", height: "400px", borderRadius: "50%",
    background: "radial-gradient(circle, rgba(99,179,237,0.08) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  content: { flex: 1, minWidth: "300px", zIndex: 1 },
  tag: {
    display: "inline-block",
    background: "rgba(99,179,237,0.12)",
    color: "#63b3ed",
    border: "0.5px solid rgba(99,179,237,0.3)",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "1px",
    padding: "7px 16px",
    borderRadius: "20px",
    marginBottom: "24px",
  },
  heading: {
    fontSize: "52px",
    fontWeight: "700",
    color: "#fff",
    lineHeight: 1.15,
    marginBottom: "20px",
  },
  highlight: {
    display: "inline-block",
    background: "linear-gradient(135deg, #63b3ed, #3182ce)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  para: {
    color: "#718096",
    fontSize: "16px",
    lineHeight: 1.8,
    maxWidth: "460px",
    marginBottom: "32px",
  },
  btns: { display: "flex", gap: "14px", marginBottom: "48px", flexWrap: "wrap" },
  primaryBtn: {
    background: "linear-gradient(135deg, #3182ce, #63b3ed)",
    color: "#fff",
    border: "none",
    padding: "14px 32px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },
  outlineBtn: {
    background: "transparent",
    color: "#63b3ed",
    border: "1px solid rgba(99,179,237,0.4)",
    padding: "14px 32px",
    borderRadius: "10px",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  stats: { display: "flex", gap: "40px", flexWrap: "wrap" },
  stat: {},
  statNum: { fontSize: "32px", fontWeight: "700", color: "#63b3ed" },
  statLabel: { fontSize: "13px", color: "#4a5568", marginTop: "2px" },
  cardWrap: { flex: "0 0 300px", zIndex: 1 },
  card: {
    background: "rgba(13, 27, 42, 0.8)",
    border: "0.5px solid rgba(99,179,237,0.2)",
    borderRadius: "20px",
    padding: "28px",
    backdropFilter: "blur(20px)",
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "22px" },
  cardTitle: { color: "#fff", fontSize: "15px", fontWeight: "600" },
  cardBadge: {
    background: "rgba(104,211,145,0.15)",
    color: "#68d391",
    fontSize: "11px",
    padding: "3px 10px",
    borderRadius: "20px",
    border: "0.5px solid rgba(104,211,145,0.3)",
  },
  progItem: { marginBottom: "18px" },
  progLabelRow: { display: "flex", justifyContent: "space-between", marginBottom: "8px" },
  progLabel: { color: "#718096", fontSize: "13px" },
  progPct: { fontSize: "13px", fontWeight: "600" },
  progBar: { height: "5px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" },
  progFill: { height: "100%", borderRadius: "3px" },
  cardFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    paddingTop: "16px",
    borderTop: "0.5px solid rgba(255,255,255,0.06)",
  },
  footerText: { color: "#4a5568", fontSize: "12px" },
  footerBadge: { color: "#a0aec0", fontSize: "12px" },
};

export default Hero;
