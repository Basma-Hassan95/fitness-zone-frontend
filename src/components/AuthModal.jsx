import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiEye, FiEyeOff } from "react-icons/fi";
import axios from "axios";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // Login
        const { data } = await axios.post("https://fitness-zone-backend.vercel.app/api/auth/login", {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess(`Welcome back, ${data.user.name}! 🎉`);
        setTimeout(() => {
          onClose();
          if (data.user.role === "admin") {
            window.location.href = "/admin";
          }
        }, 1500);
      } else {
        // Register
        const { data } = await axios.post("https://fitness-zone-backend.vercel.app/api/auth/register", {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setSuccess(`Account created! Welcome, ${data.user.name}! 🎉`);
        setTimeout(() => {
          onClose();
        }, 1500);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm({ name: "", email: "", password: "" });
    setError("");
    setSuccess("");
    setIsLogin(true);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            style={styles.modal}
            initial={{ scale: 0.85, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 40 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              style={styles.closeBtn}
              onClick={handleClose}
              whileHover={{ scale: 1.1, background: "rgba(252,129,129,0.15)" }}
              whileTap={{ scale: 0.9 }}
            >
              <FiX size={18} />
            </motion.button>

            {/* Logo */}
            <div style={styles.logo}>⚡ Fitness<span style={styles.accent}>Zone</span></div>

            {/* Tabs */}
            <div style={styles.tabs}>
              <motion.button
                style={{
                  ...styles.tab,
                  color: isLogin ? "#fff" : "#4a5568",
                  borderBottom: isLogin ? "2px solid #63b3ed" : "2px solid transparent",
                }}
                onClick={() => { setIsLogin(true); setError(""); setSuccess(""); }}
                whileHover={{ color: "#fff" }}
              >
                Login
              </motion.button>
              <motion.button
                style={{
                  ...styles.tab,
                  color: !isLogin ? "#fff" : "#4a5568",
                  borderBottom: !isLogin ? "2px solid #63b3ed" : "2px solid transparent",
                }}
                onClick={() => { setIsLogin(false); setError(""); setSuccess(""); }}
                whileHover={{ color: "#fff" }}
              >
                Sign Up
              </motion.button>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {success && (
                <motion.div
                  style={styles.successMsg}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  ✅ {success}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  style={styles.errorMsg}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  ❌ {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <form onSubmit={handleSubmit} style={styles.form}>
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div style={styles.inputGroup}>
                      <label style={styles.label}>Full Name</label>
                      <input
                        style={styles.input}
                        type="text"
                        name="name"
                        placeholder="Your full name"
                        value={form.name}
                        onChange={handleChange}
                        required={!isLogin}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address</label>
                <input
                  style={styles.input}
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Password</label>
                <div style={styles.passwordWrap}>
                  <input
                    style={{ ...styles.input, paddingRight: "44px" }}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    style={styles.eyeBtn}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>

              <motion.button
                type="submit"
                style={styles.submitBtn}
                whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(99,179,237,0.4)" }}
                whileTap={{ scale: 0.97 }}
                disabled={loading}
              >
                {loading ? "Please wait..." : isLogin ? "Login →" : "Create Account →"}
              </motion.button>
            </form>

            <div style={styles.switchText}>
              {isLogin ? "Account nahi hai? " : "Already account hai? "}
              <span
                style={styles.switchLink}
                onClick={() => { setIsLogin(!isLogin); setError(""); setSuccess(""); }}
              >
                {isLogin ? "Sign Up" : "Login"}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const styles = {
  overlay: {
    position: "fixed", inset: 0, zIndex: 3000,
    background: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(10px)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  modal: {
    background: "#0d1b2a",
    border: "0.5px solid rgba(99,179,237,0.2)",
    borderRadius: "22px",
    padding: "40px 36px",
    width: "100%", maxWidth: "420px",
    position: "relative",
    margin: "16px",
  },
  closeBtn: {
    position: "absolute", top: "16px", right: "16px",
    background: "rgba(255,255,255,0.05)",
    border: "none", color: "#718096",
    cursor: "pointer", borderRadius: "8px",
    padding: "6px", display: "flex",
    transition: "all 0.2s",
  },
  logo: {
    fontSize: "22px", fontWeight: "700",
    color: "#fff", textAlign: "center",
    marginBottom: "24px",
  },
  accent: { color: "#63b3ed" },
  tabs: {
    display: "flex", gap: "0",
    borderBottom: "0.5px solid rgba(255,255,255,0.06)",
    marginBottom: "24px",
  },
  tab: {
    flex: 1, padding: "12px",
    background: "none", border: "none",
    fontSize: "15px", fontWeight: "600",
    cursor: "pointer", transition: "all 0.2s",
  },
  successMsg: {
    background: "rgba(104,211,145,0.1)",
    border: "0.5px solid rgba(104,211,145,0.3)",
    color: "#68d391", fontSize: "13px",
    padding: "10px 14px", borderRadius: "8px",
    marginBottom: "16px", textAlign: "center",
  },
  errorMsg: {
    background: "rgba(252,129,129,0.1)",
    border: "0.5px solid rgba(252,129,129,0.3)",
    color: "#fc8181", fontSize: "13px",
    padding: "10px 14px", borderRadius: "8px",
    marginBottom: "16px", textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  inputGroup: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { color: "#718096", fontSize: "13px", fontWeight: "500" },
  input: {
    background: "rgba(255,255,255,0.04)",
    border: "0.5px solid rgba(99,179,237,0.15)",
    borderRadius: "10px", padding: "12px 16px",
    color: "#e2e8f0", fontSize: "14px",
    fontFamily: "inherit", outline: "none",
    width: "100%", transition: "border-color 0.2s",
  },
  passwordWrap: { position: "relative" },
  eyeBtn: {
    position: "absolute", right: "12px", top: "50%",
    transform: "translateY(-50%)",
    background: "none", border: "none",
    color: "#4a5568", cursor: "pointer",
    display: "flex", alignItems: "center",
  },
  submitBtn: {
    background: "linear-gradient(135deg, #3182ce, #63b3ed)",
    color: "#fff", border: "none",
    padding: "14px", borderRadius: "10px",
    fontSize: "15px", fontWeight: "600",
    cursor: "pointer", marginTop: "4px",
  },
  switchText: { color: "#4a5568", fontSize: "13px", textAlign: "center", marginTop: "20px" },
  switchLink: { color: "#63b3ed", cursor: "pointer", fontWeight: "600" },
};

export default AuthModal;