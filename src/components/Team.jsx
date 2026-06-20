import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const team = [
  {
    name: "John Doe", role: "CEO & Head Trainer", initials: "JD", color: "#63b3ed",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=faces",
    exp: "12 years", specialty: "Strength & Conditioning",
    bio: "John is a world-class trainer with over 12 years of experience. He has trained professional athletes and helped hundreds of clients achieve their dream physique.",
    achievements: ["NSCA Certified", "Ex-Olympic Coach", "Nutrition Expert"],
  },
  {
    name: "Larry Doe", role: "Art Director", initials: "LD", color: "#68d391",
    image: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&h=400&fit=crop&crop=faces",
    exp: "8 years", specialty: "Aerobics & Dance",
    bio: "Larry brings creativity and energy to every class. His background in dance and fitness makes him the most popular instructor at FitnessZone.",
    achievements: ["ACE Certified", "Dance Champion", "Group Fitness Expert"],
  },
  {
    name: "Ranith Kays", role: "Gym Manager", initials: "RK", color: "#f6ad55",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
    exp: "10 years", specialty: "Operations & Wellness",
    bio: "Ranith ensures that FitnessZone runs like a well-oiled machine. His passion for wellness and member satisfaction drives everything we do.",
    achievements: ["MBA Sports Mgmt", "Wellness Coach", "500+ Members Managed"],
  },
  {
    name: "Joan Ray", role: "Nutrition Coach", initials: "JR", color: "#b794f4",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=faces",
    exp: "7 years", specialty: "Diet & Nutrition",
    bio: "Joan is a certified nutritionist who creates custom meal plans for every member. She believes that abs are truly made in the kitchen.",
    achievements: ["Registered Dietitian", "Certified Nutritionist", "Meal Plan Expert"],
  },
];

const TeamModal = ({ member, onClose }) => (
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
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      onClick={(e) => e.stopPropagation()}
    >
      <button style={styles.closeBtn} onClick={onClose}><FiX size={20} /></button>
      <div style={{ ...styles.modalAvatar, border: `2px solid ${member.color}` }}>
        <img src={member.image} alt={member.name} style={styles.modalAvatarImg} />
      </div>
      <div style={styles.modalName}>{member.name}</div>
      <div style={{ ...styles.modalRole, color: member.color }}>{member.role}</div>
      <div style={styles.modalMeta}>
        <span style={styles.metaChip}>{member.exp} experience</span>
        <span style={styles.metaChip}>{member.specialty}</span>
      </div>
      <p style={styles.modalBio}>{member.bio}</p>
      <div style={styles.achievements}>
        {member.achievements.map((a) => (
          <div key={a} style={{ ...styles.achChip, borderColor: `${member.color}44`, color: member.color }}>
            ✓ {a}
          </div>
        ))}
      </div>
      <div style={styles.socialRow}>
        {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
          <motion.div key={i} style={{ ...styles.socialIcon, color: member.color }} whileHover={{ scale: 1.2, y: -2 }}>
            <Icon size={18} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  </motion.div>
);

const Team = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selected, setSelected] = useState(null);

  return (
    <section id="team" ref={ref} style={styles.section}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <div style={styles.label}>Our Experts</div>
        <h2 style={styles.title}>Meet the <span style={styles.accent}>Team</span></h2>
        <p style={styles.sub}>Click on a trainer to learn more about them</p>
      </motion.div>

      <div style={styles.grid}>
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            style={styles.card}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            whileHover={{ y: -10, boxShadow: `0 20px 40px rgba(0,0,0,0.4)`, borderColor: member.color }}
            onClick={() => setSelected(member)}
          >
            <motion.div
              style={{ ...styles.avatar, border: `2px solid ${member.color}` }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={member.image} alt={member.name} style={styles.avatarImg} />
            </motion.div>
            <div style={styles.name}>{member.name}</div>
            <div style={{ ...styles.role, color: member.color }}>{member.role}</div>
            <div style={styles.expTag}>{member.exp} exp</div>
            <div style={styles.socials}>
              {[FaFacebook, FaTwitter, FaInstagram].map((Icon, j) => (
                <motion.div key={j} style={styles.social} whileHover={{ scale: 1.3, color: member.color }}>
                  <Icon size={14} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && <TeamModal member={selected} onClose={() => setSelected(null)} />}
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
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px" },
  card: {
    background: "rgba(13,27,42,0.8)",
    border: "0.5px solid rgba(255,255,255,0.06)",
    borderRadius: "18px", padding: "32px 20px",
    textAlign: "center", cursor: "pointer",
    transition: "border-color 0.3s, box-shadow 0.3s",
    backdropFilter: "blur(10px)",
  },
  avatar: {
    width: "72px", height: "72px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 16px", overflow: "hidden",
  },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  name: { color: "#e2e8f0", fontSize: "16px", fontWeight: "600", marginBottom: "5px" },
  role: { fontSize: "13px", marginBottom: "10px" },
  expTag: {
    display: "inline-block", background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(255,255,255,0.08)",
    color: "#4a5568", fontSize: "11px", padding: "3px 10px",
    borderRadius: "20px", marginBottom: "16px",
  },
  socials: { display: "flex", justifyContent: "center", gap: "14px" },
  social: { color: "#2d3748", cursor: "pointer", transition: "color 0.2s" },
  overlay: {
    position: "fixed", inset: 0, zIndex: 2000,
    background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  modal: {
    background: "#0d1b2a",
    border: "0.5px solid rgba(99,179,237,0.15)",
    borderRadius: "22px", padding: "40px 36px",
    width: "100%", maxWidth: "420px",
    textAlign: "center", position: "relative",
    margin: "16px",
  },
  closeBtn: {
    position: "absolute", top: "16px", right: "16px",
    background: "rgba(255,255,255,0.05)", border: "none",
    color: "#718096", cursor: "pointer", borderRadius: "8px",
    padding: "6px", display: "flex",
  },
  modalAvatar: {
    width: "90px", height: "90px", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 16px", overflow: "hidden",
  },
  modalAvatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  modalName: { color: "#fff", fontSize: "22px", fontWeight: "700", marginBottom: "6px" },
  modalRole: { fontSize: "14px", marginBottom: "16px" },
  modalMeta: { display: "flex", gap: "10px", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" },
  metaChip: {
    background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.08)",
    color: "#718096", fontSize: "12px", padding: "4px 12px", borderRadius: "20px",
  },
  modalBio: { color: "#4a5568", fontSize: "14px", lineHeight: 1.8, marginBottom: "20px" },
  achievements: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "24px", textAlign: "left" },
  achChip: { border: "0.5px solid", borderRadius: "8px", padding: "8px 14px", fontSize: "13px" },
  socialRow: { display: "flex", justifyContent: "center", gap: "16px" },
  socialIcon: { cursor: "pointer", color: "#2d3748" },
};

export default Team;