import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";
import AuthModal from "./AuthModal";

const navLinks = ["home", "services", "about", "gallery", "plans", "team", "contact"];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check login status whenever component mounts or auth modal closes
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [authOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    setMenuOpen(false);
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : "U";

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
          </motion.div>
        ))}
      </div>

      {/* Logged in vs Logged out — Desktop */}
      {user ? (
        <div style={styles.userWrap}>
          <motion.div
            style={styles.userPill}
            whileHover={{ scale: 1.04 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div style={styles.userAvatar}>{userInitial}</div>
            <span style={styles.userName}>{user.name?.split(" ")[0]}</span>
          </motion.div>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                style={styles.dropdown}
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div style={styles.dropdownHeader}>
                  <div style={styles.dropdownName}>{user.name}</div>
                  <div style={styles.dropdownEmail}>{user.email}</div>
                  {user.role === "admin" && <div style={styles.adminTag}>Administrator</div>}
                </div>
                {user.role === "admin" && (
                  <a href="/admin" style={styles.dropdownItem}>
                    <FiUser size={14} /> Admin Dashboard
                  </a>
                )}
                <motion.div
                  style={styles.dropdownItem}
                  onClick={handleLogout}
                  whileHover={{ background: "rgba(252,129,129,0.08)" }}
                >
                  <FiLogOut size={14} color="#fc8181" />
                  <span style={{ color: "#fc8181" }}>Logout</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <motion.button
          style={styles.joinBtn}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99,179,237,0.4)" }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setAuthOpen(true)}
        >
          Join Now
        </motion.button>
      )}

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

            {user ? (
              <>
                <div style={styles.mobileUserInfo}>
                  <div style={styles.userAvatar}>{userInitial}</div>
                  <div>
                    <div style={styles.dropdownName}>{user.name}</div>
                    <div style={styles.dropdownEmail}>{user.email}</div>
                  </div>
                </div>
                {user.role === "admin" && (
                  <a href="/admin" style={{ ...styles.mobileLink, color: "#63b3ed" }}>
                    Admin Dashboard
                  </a>
                )}
                <motion.button
                  style={{ ...styles.joinBtn, width: "100%", marginTop: "8px", background: "rgba(252,129,129,0.15)", color: "#fc8181" }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogout}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <motion.button
                style={{ ...styles.joinBtn, width: "100%", marginTop: "8px" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setAuthOpen(true); setMenuOpen(false); }}
              >
                Join Now
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
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
  userWrap: { position: "relative" },
  userPill: {
    display: "flex", alignItems: "center", gap: "8px",
    background: "rgba(255,255,255,0.05)",
    border: "0.5px solid rgba(99,179,237,0.2)",
    borderRadius: "30px", padding: "6px 14px 6px 6px",
    cursor: "pointer",
  },
  userAvatar: {
    width: "28px", height: "28px", borderRadius: "50%",
    background: "linear-gradient(135deg, #3182ce, #63b3ed)",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", fontSize: "12px", fontWeight: "700", flexShrink: 0,
  },
  userName: { color: "#e2e8f0", fontSize: "13px", fontWeight: "500" },
  dropdown: {
    position: "absolute", top: "calc(100% + 10px)", right: 0,
    background: "#0d1b2a", border: "0.5px solid rgba(99,179,237,0.15)",
    borderRadius: "14px", width: "220px", overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
  },
  dropdownHeader: { padding: "16px", borderBottom: "0.5px solid rgba(255,255,255,0.06)" },
  dropdownName: { color: "#fff", fontSize: "14px", fontWeight: "600" },
  dropdownEmail: { color: "#4a5568", fontSize: "12px", marginTop: "2px" },
  adminTag: { color: "#63b3ed", fontSize: "11px", fontWeight: "600", marginTop: "6px" },
  dropdownItem: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "12px 16px", fontSize: "13px", color: "#a0aec0",
    cursor: "pointer", textDecoration: "none", transition: "background 0.2s",
  },
  mobileUserInfo: {
    display: "flex", alignItems: "center", gap: "10px",
    padding: "12px 0", borderBottom: "0.5px solid rgba(255,255,255,0.05)",
    marginBottom: "8px",
  },
};

export default Navbar;