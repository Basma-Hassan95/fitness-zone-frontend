import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import AuthModal from "./AuthModal";

const navLinks = ["home", "services", "about", "gallery", "plans", "team", "contact"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
        ...styles.nav,
        background: scrolled ? "rgba(10, 15, 30, 0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled ? "0 2px 30px rgba(0,0,0,0.4)" : "none",
        borderBottom: scrolled ? "0.5px solid rgba(99,179,237,0.15)" : "none",
      }}
    >
      <motion.div style={styles.logo} whileHover={{ scale: 1.05 }}>
        <span style={styles.logoIcon}>⚡</span>
        <span>Fitness<span style={styles.logoAccent}>Zone</span></span>
      </motion.div>

      <div style={styles.links}>
        {navLinks.map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
          >
            <Link
              to={item}
              smooth={true}
              duration={600}
              offset={-70}
              style={styles.link}
              activeStyle={styles.activeLink}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </Link>
             <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
          </motion.div>
        ))}
      </div>

    <motion.button
  style={styles.joinBtn}
  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,179,237,0.4)" }}
  whileTap={{ scale: 0.97 }}
  onClick={() => setAuthOpen(true)}
>
  Join Now
</motion.button>

      <motion.div
        style={styles.hamburger}
        onClick={() => setMenuOpen(!menuOpen)}
        whileTap={{ scale: 0.9 }}
      >
        {menuOpen ? <FiX size={24} color="#63b3ed" /> : <FiMenu size={24} color="#63b3ed" />}
      </motion.div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            style={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {navLinks.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={item}
                  smooth={true}
                  duration={600}
                  offset={-70}
                  style={styles.mobileLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </motion.div>
            ))}
            <motion.button
              style={{ ...styles.joinBtn, width: "100%", marginTop: "8px" }}
              whileTap={{ scale: 0.97 }}
            >
              Join Now
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "18px 48px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    transition: "all 0.4s ease",
    flexWrap: "wrap",
  },
  logo: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#fff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  logoIcon: { fontSize: "20px" },
  logoAccent: { color: "#63b3ed" },
  links: { display: "flex", gap: "32px", alignItems: "center" },
  link: {
    color: "#a0aec0",
    fontSize: "14px",
    textDecoration: "none",
    cursor: "pointer",
    letterSpacing: "0.5px",
    transition: "color 0.2s",
    fontWeight: "500",
  },
  activeLink: { color: "#63b3ed" },
  joinBtn: {
    background: "linear-gradient(135deg, #3182ce, #63b3ed)",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },
  hamburger: { display: "none", cursor: "pointer", padding: "4px" },
  mobileMenu: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    paddingTop: "12px",
    borderTop: "0.5px solid rgba(99,179,237,0.15)",
    marginTop: "12px",
    overflow: "hidden",
  },
  mobileLink: {
    color: "#a0aec0",
    fontSize: "15px",
    cursor: "pointer",
    textDecoration: "none",
    padding: "10px 0",
    display: "block",
    borderBottom: "0.5px solid rgba(255,255,255,0.05)",
  },
};

export default Navbar;
