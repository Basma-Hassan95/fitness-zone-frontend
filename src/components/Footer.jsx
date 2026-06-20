import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.top}>
        <div style={styles.brand}>
          <div style={styles.logo}>⚡ Fitness<span style={styles.accent}>Zone</span></div>
          <p style={styles.tagline}>Transform your body.<br />Transform your life.</p>
          <div style={styles.socials}>
            {[FaFacebook, FaTwitter, FaInstagram, FaYoutube].map((Icon, i) => (
              <motion.div key={i} style={styles.socialIcon} whileHover={{ scale: 1.2, color: "#63b3ed" }}>
                <Icon size={18} />
              </motion.div>
            ))}
          </div>
        </div>

        <div style={styles.linksCol}>
          <div style={styles.colTitle}>Quick Links</div>
          {["home", "services", "about", "gallery", "plans", "team", "contact"].map((item) => (
            <Link key={item} to={item} smooth duration={600} style={styles.footerLink}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
          ))}
        </div>

        <div style={styles.linksCol}>
          <div style={styles.colTitle}>Services</div>
          {["Cardio", "Strength", "Aerobics", "Ab Crunch", "Cycling", "Aqua Fit"].map((s) => (
            <div key={s} style={styles.footerLink}>{s}</div>
          ))}
        </div>

        <div style={styles.linksCol}>
          <div style={styles.colTitle}>Contact</div>
          <div style={styles.contactItem}>📍 123 Fitness St, Karachi</div>
          <div style={styles.contactItem}>📞 +92 300 1234567</div>
          <div style={styles.contactItem}>✉️ info@fitnesszone.pk</div>
          <div style={styles.contactItem}>🕐 6am – 11pm Daily</div>
        </div>
      </div>

      <div style={styles.bottom}>
        <span style={styles.copy}>© 2024 FitnessZone. All rights reserved.</span>
        <span style={styles.copy}>Built with React + MERN Stack</span>
      </div>
    </footer>
  );
};

const styles = {
  footer: { background: "#060d18", padding: "60px 48px 24px", borderTop: "0.5px solid rgba(99,179,237,0.1)" },
  top: { display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px", marginBottom: "48px", flexWrap: "wrap" },
  brand: {},
  logo: { fontSize: "22px", fontWeight: "700", color: "#fff", marginBottom: "12px" },
  accent: { color: "#63b3ed" },
  tagline: { color: "#2d3748", fontSize: "14px", lineHeight: 1.7, marginBottom: "20px" },
  socials: { display: "flex", gap: "14px" },
  socialIcon: { color: "#2d3748", cursor: "pointer", transition: "color 0.2s" },
  linksCol: { display: "flex", flexDirection: "column", gap: "10px" },
  colTitle: { color: "#e2e8f0", fontSize: "14px", fontWeight: "600", marginBottom: "8px" },
  footerLink: { color: "#2d3748", fontSize: "13px", cursor: "pointer", textDecoration: "none", transition: "color 0.2s" },
  contactItem: { color: "#2d3748", fontSize: "13px", lineHeight: 1.7 },
  bottom: {
    display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px",
    borderTop: "0.5px solid rgba(255,255,255,0.04)", paddingTop: "24px",
  },
  copy: { color: "#1a2332", fontSize: "12px" },
};

export default Footer;
