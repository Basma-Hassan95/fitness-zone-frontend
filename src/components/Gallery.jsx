import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const categories = ["All", "Gym", "Cardio", "Aerobics"];

const items = [
  {
    id: 1, category: "Gym", label: "Weight Zone",
    img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  },
  {
    id: 2, category: "Cardio", label: "Treadmill Area",
    img: "https://images.unsplash.com/photo-1570829460005-c840387bb1ca?w=600&q=80",
  },
  {
    id: 3, category: "Aerobics", label: "Dance Studio",
    img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80",
  },
  {
    id: 4, category: "Gym", label: "Free Weights",
    img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
  },
  {
    id: 5, category: "Cardio", label: "Cycling Room",
    img: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&q=80",
  },
  {
    id: 6, category: "Aerobics", label: "Yoga Hall",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&q=80",
  },
  {
    id: 7, category: "Gym", label: "Cable Section",
    img: "https://images.unsplash.com/photo-1567598508481-65985588e295?w=600&q=80",
  },
  {
    id: 8, category: "Cardio", label: "Boxing Ring",
    img: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&q=80",
  },
];

const colors = ["#63b3ed","#68d391","#f6ad55","#fc8181","#b794f4","#76e4f7","#f6ad55","#63b3ed"];

const Gallery = () => {
  const [active, setActive] = useState("All");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = active === "All" ? items : items.filter(i => i.category === active);

  return (
    <section id="gallery" ref={ref} style={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div style={styles.label}>Our Space</div>
        <h2 style={styles.title}>Photo <span style={styles.accent}>Gallery</span></h2>
        <p style={styles.sub}>Take a look inside the FitnessZone experience</p>
      </motion.div>

      <motion.div
        style={styles.filters}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2 }}
      >
        {categories.map((cat) => (
          <motion.button
            key={cat}
            style={{
              ...styles.filterBtn,
              background: active === cat ? "linear-gradient(135deg, #3182ce, #63b3ed)" : "rgba(13,27,42,0.8)",
              color: active === cat ? "#fff" : "#4a5568",
              border: active === cat ? "none" : "0.5px solid rgba(255,255,255,0.08)",
            }}
            onClick={() => setActive(cat)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      <motion.div style={styles.grid} layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ scale: 1.03, y: -6 }}
              style={{ ...styles.card, borderTop: `2px solid ${colors[i % colors.length]}` }}
            >
              {/* Real Image */}
              <div style={styles.imgWrap}>
                <img
                  src={item.img}
                  alt={item.label}
                  style={styles.img}
                  onError={(e) => { e.target.style.display = 'none' }}
                />
                <div style={{ ...styles.overlay, background: `${colors[i % colors.length]}22` }} />
              </div>

              <div style={styles.cardLabel}>{item.label}</div>
              <div style={{ ...styles.catBadge, color: colors[i % colors.length], background: `${colors[i % colors.length]}15` }}>
                {item.category}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

const styles = {
  section: { background: "linear-gradient(180deg, #0a0f1e 0%, #0d1b2a 100%)", padding: "90px 48px" },
  label: { fontSize: "11px", letterSpacing: "3px", color: "#63b3ed", textTransform: "uppercase", marginBottom: "10px" },
  title: { fontSize: "36px", fontWeight: "700", color: "#fff", marginBottom: "12px" },
  accent: { background: "linear-gradient(135deg, #63b3ed, #3182ce)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  sub: { fontSize: "15px", color: "#4a5568", marginBottom: "32px" },
  filters: { display: "flex", gap: "12px", marginBottom: "40px", flexWrap: "wrap" },
  filterBtn: { padding: "9px 22px", borderRadius: "8px", fontSize: "14px", fontWeight: "500", cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" },
  card: {
    background: "rgba(13,27,42,0.8)",
    border: "0.5px solid rgba(255,255,255,0.06)",
    borderRadius: "14px", overflow: "hidden", cursor: "pointer",
  },
  imgWrap: {
    position: "relative", height: "160px", overflow: "hidden",
  },
  img: {
    width: "100%", height: "100%", objectFit: "cover",
    transition: "transform 0.4s ease",
  },
  overlay: {
    position: "absolute", inset: 0,
  },
  cardLabel: { color: "#e2e8f0", fontSize: "14px", fontWeight: "600", padding: "14px 16px 6px" },
  catBadge: { fontSize: "11px", fontWeight: "600", padding: "0 16px 14px", display: "block" },
};

export default Gallery;