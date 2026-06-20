import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" ref={ref} style={styles.section}>
      <motion.div
        style={styles.left}
        initial={{ opacity: 0, x: -50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div style={styles.label}>About Us</div>
        <h2 style={styles.title}>
          Why <span style={styles.accent}>FitnessZone</span><br />is Different
        </h2>
        <p style={styles.para}>
          We are more than just a gym. FitnessZone is a community built on discipline,
          dedication, and real results. Our certified trainers craft programs tailored
          specifically to your goals.
        </p>
        <p style={styles.para}>
          With state-of-the-art equipment and a motivating environment, we ensure every
          single visit brings you closer to the best version of yourself.
        </p>

        <div style={styles.featureGrid}>
          {[
            { icon: "🏅", title: "Certified Trainers", desc: "All trainers are internationally certified" },
            { icon: "📊", title: "Progress Tracking", desc: "Monitor your journey with detailed analytics" },
            { icon: "🥗", title: "Nutrition Plans", desc: "Custom diet plans for your goals" },
            { icon: "🕐", title: "Flexible Hours", desc: "Open 6am to 11pm, 7 days a week" },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              style={styles.featureCard}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -4, borderColor: "rgba(99,179,237,0.3)" }}
            >
              <span style={styles.featureIcon}>{f.icon}</span>
              <div>
                <div style={styles.featureTitle}>{f.title}</div>
                <div style={styles.featureDesc}>{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          style={styles.btn}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(99,179,237,0.4)" }}
          whileTap={{ scale: 0.97 }}
        >
          Learn More →
        </motion.button>
      </motion.div>

      <motion.div
        style={styles.right}
        initial={{ opacity: 0, x: 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div style={styles.skillCard}>
          <div style={styles.skillTitle}>Our Expertise</div>
          {[
            { label: "Personal Training", pct: 95, color: "#63b3ed" },
            { label: "Group Classes", pct: 88, color: "#68d391" },
            { label: "Nutrition Coaching", pct: 82, color: "#f6ad55" },
            { label: "Rehabilitation", pct: 75, color: "#b794f4" },
          ].map((bar, i) => (
            <div key={bar.label} style={{ marginBottom: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ color: "#a0aec0", fontSize: "14px" }}>{bar.label}</span>
                <span style={{ color: bar.color, fontSize: "14px", fontWeight: "600" }}>{bar.pct}%</span>
              </div>
              <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px" }}>
                <motion.div
                  style={{ height: "100%", background: bar.color, borderRadius: "3px" }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${bar.pct}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={styles.statsRow}>
          {[
            { num: "500+", label: "5-Star Reviews" },
            { num: "98%", label: "Client Retention" },
          ].map((s) => (
            <div key={s.label} style={styles.miniStat}>
              <div style={styles.miniNum}>{s.num}</div>
              <div style={styles.miniLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
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
  right: { flex: 1, minWidth: "300px" },
  label: { fontSize: "11px", letterSpacing: "3px", color: "#63b3ed", textTransform: "uppercase", marginBottom: "10px" },
  title: { fontSize: "36px", fontWeight: "700", color: "#fff", lineHeight: 1.2, marginBottom: "20px" },
  accent: { background: "linear-gradient(135deg, #63b3ed, #3182ce)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  para: { color: "#4a5568", fontSize: "15px", lineHeight: 1.8, marginBottom: "16px" },
  featureGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", margin: "28px 0" },
  featureCard: {
    background: "rgba(13,27,42,0.8)",
    border: "0.5px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    padding: "16px",
    display: "flex", gap: "12px", alignItems: "flex-start",
    transition: "border-color 0.2s",
    cursor: "default",
  },
  featureIcon: { fontSize: "22px", marginTop: "2px" },
  featureTitle: { color: "#e2e8f0", fontSize: "13px", fontWeight: "600", marginBottom: "4px" },
  featureDesc: { color: "#4a5568", fontSize: "12px", lineHeight: 1.5 },
  btn: {
    background: "linear-gradient(135deg, #3182ce, #63b3ed)",
    color: "#fff", border: "none",
    padding: "13px 30px", borderRadius: "10px",
    fontSize: "14px", fontWeight: "600", cursor: "pointer",
  },
  skillCard: {
    background: "rgba(13,27,42,0.8)",
    border: "0.5px solid rgba(99,179,237,0.15)",
    borderRadius: "16px", padding: "28px", marginBottom: "20px",
  },
  skillTitle: { color: "#fff", fontSize: "16px", fontWeight: "600", marginBottom: "24px" },
  statsRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
  miniStat: {
    background: "rgba(13,27,42,0.8)",
    border: "0.5px solid rgba(99,179,237,0.15)",
    borderRadius: "12px", padding: "20px", textAlign: "center",
  },
  miniNum: { fontSize: "28px", fontWeight: "700", color: "#63b3ed", marginBottom: "6px" },
  miniLabel: { color: "#4a5568", fontSize: "13px" },
};

export default About;
