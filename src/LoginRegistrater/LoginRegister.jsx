import React, { useState } from "react";
import './LoginRegister.css';
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoginRegister = ({ setIsAuthenticated }) => {
  // toggle btween login and register 
  const [isRegister, setIsRegister] = useState(false);
  // redirect afrer login/register
  const navigate = useNavigate();

  //reg form
  const showRegister = () => setIsRegister(true);
  // login form
  const showLogin = () => setIsRegister(false);

  const handleRegister = (e) => {
    e.preventDefault();

    // Simulate successful registration lead to dash 
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate successful login
    setIsAuthenticated(true);
    navigate("/dashboard");
  };
// animation
  const variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="wrapper">
      <AnimatePresence mode="wait">
        {!isRegister ? (

          // login form
          <motion.div
            key="login"
            className="form-box login"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <form onSubmit={handleLogin}>
              <h1>Login</h1>

              {/* username input */}
              <div className="input-box">
                <input type="text" placeholder="Username" required />
                <FaUser className="icon" />
              </div>

              {/* password input */}
              <div className="input-box">
                <input type="password" placeholder="Password" required />
                <FaLock className="icon" />
              </div>


              <div className="remember-forgot">
                <label><input type="checkbox" /> Remember Me</label>
                <button type="button" className="link-button">Forgot password?</button>
              </div>


              <button type="submit">Login</button>
              <div className="register-link">
                <p>
                  Don’t have an account?{" "}
                  <button type="button" onClick={showRegister} className="link-button">
                    Register
                  </button>
                </p>
              </div>
            </form>


          </motion.div>
        ) : (
          <motion.div
            key="register"
            className="form-box register"
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <form onSubmit={handleRegister}>
              <h1>Registration</h1>
              <div className="input-box">
                <input type="text" placeholder="Username" required />
                <FaUser className="icon" />
              </div>


              <div className="input-box">
                <input type="email" placeholder="Email" required />
                <FaEnvelope className="icon" />
              </div>


              <div className="input-box">
                <input type="password" placeholder="Password" required />
                <FaLock className="icon" />
              </div>


              <div className="remember-forgot">
                <label><input type="checkbox" /> I agree to the terms & conditions</label>
                <button type="button" className="link-button">Forgot password?</button>
              </div>


              <button type="submit">Register</button>
              <div className="register-link">
                <p>
                  Already have an account?{" "}
                  <button type="button" onClick={showLogin} className="link-button">
                    Login
                  </button>
                </p>
              </div>
            </form>

            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginRegister;
