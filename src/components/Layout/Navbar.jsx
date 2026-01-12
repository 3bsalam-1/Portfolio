import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

// Throttle utility function for better performance
const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef(null);
  const nodeRefs = useRef([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrolled(window.scrollY > 50);
    }, 16); // Max 60fps (16ms per frame)

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Canvas drawing effect for neural connections
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d');

    const updateCanvasSize = () => {
      const rect = wrapper.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();

    const animateConnections = () => {
      const rect = wrapper.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = `rgba(255, 211, 105, 0.3)`;
      ctx.lineWidth = 1;

      // Get positions of all nodes
      const nodePositions = nodeRefs.current
        .map(ref => {
          if (!ref) return null;
          const nodeRect = ref.getBoundingClientRect();
          const relX = nodeRect.left - rect.left + nodeRect.width / 2;
          const relY = nodeRect.top - rect.top + nodeRect.height / 2;
          return { x: relX, y: relY };
        })
        .filter(pos => pos !== null);

      // Center point (avatar)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw lines from center to each node
      nodePositions.forEach(pos => {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      });

      // Draw lines between nearby nodes (creating network effect)
      // Adaptive connection distance based on wrapper size
      const connectionDistance = canvas.width > 100 ? 50 : 35;
      for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
          const dx = nodePositions[i].x - nodePositions[j].x;
          const dy = nodePositions[i].y - nodePositions[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            ctx.strokeStyle = `rgba(255, 211, 105, ${0.2 * (1 - distance / connectionDistance)})`;
            ctx.beginPath();
            ctx.moveTo(nodePositions[i].x, nodePositions[i].y);
            ctx.lineTo(nodePositions[j].x, nodePositions[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animateConnections);
    };

    animateConnections();

    // Handle window resize
    const resizeHandler = () => {
      updateCanvasSize();
    };

    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <a href="#home" className="logo">
          <div className="logo-wrapper" ref={wrapperRef}>
            {/* Dynamic Canvas for Neural Connections */}
            <canvas ref={canvasRef} className="neural-canvas"></canvas>

            {/* Moving Neural Network Nodes - Increased to 8 */}
            <div
              className="neural-node node-1"
              ref={el => nodeRefs.current[0] = el}
            ></div>
            <div
              className="neural-node node-2"
              ref={el => nodeRefs.current[1] = el}
            ></div>
            <div
              className="neural-node node-3"
              ref={el => nodeRefs.current[2] = el}
            ></div>
            <div
              className="neural-node node-4"
              ref={el => nodeRefs.current[3] = el}
            ></div>
            <div
              className="neural-node node-5"
              ref={el => nodeRefs.current[4] = el}
            ></div>
            <div
              className="neural-node node-6"
              ref={el => nodeRefs.current[5] = el}
            ></div>
            <div
              className="neural-node node-7"
              ref={el => nodeRefs.current[6] = el}
            ></div>
            <div
              className="neural-node node-8"
              ref={el => nodeRefs.current[7] = el}
            ></div>

            {/* Center Avatar */}
            <img src="https://avatars.githubusercontent.com/u/121203923?v=4" alt="Ahmed Mohamed" className="logo-image" />
          </div>
        </a>



        {/* Desktop Menu */}
        <div className="nav-menu desktop-only">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
        </div>

        <div className="nav-actions desktop-only">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
            {theme === 'dark' ? <FaMoon /> : <FaSun />}
          </button>
          <a href={`${import.meta.env.BASE_URL}cv.pdf`} download className="cv-btn">
            Resume
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle mobile-only" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="mobile-link"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="mobile-actions">
                <button className="theme-toggle mobile" onClick={() => { toggleTheme(); setIsOpen(false); }}>
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                  {theme === 'dark' ? <FaMoon /> : <FaSun />}
                </button>
                <a href={`${import.meta.env.BASE_URL}cv.pdf`} download className="cv-btn mobile" onClick={() => setIsOpen(false)}>
                  Download Resume
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        .nav {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 1200px;
          z-index: 1000;
          padding: 0.2rem 2rem;
          background: rgba(15, 15, 20, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50px;
          transition: all 0.3s ease;
        }

        [data-theme="light"] .nav {
          background: rgba(255, 255, 255, 0.7);
          border-color: rgba(0, 0, 0, 0.05);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .nav.scrolled {
          background: rgba(10, 10, 10, 0.85);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
          width: 85%;
        }

        [data-theme="light"] .nav.scrolled {
          background: rgba(255, 255, 255, 0.9);
        }

        .nav-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          text-decoration: none;
          font-weight: 700;
          font-size: 1.1rem;
          color: var(--text-primary);
          position: relative;
        }

        /* Neural Network Wrapper */
        .logo-wrapper {
          position: relative;
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Canvas for Dynamic Connections */
        .neural-canvas {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 2;
          pointer-events: none;
        }

        /* Clean Circular Avatar */
        .logo-image {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 2.5px solid var(--accent-primary);
          position: relative;
          z-index: 5;
          box-shadow: 0 0 12px rgba(255, 211, 105, 0.4);
          transition: all 0.3s ease;
        }

        /* Moving Neural Network Nodes */
        .neural-node {
          position: absolute;
          width: 6px;
          height: 6px;
          background: var(--accent-primary);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--accent-primary), 0 0 20px rgba(255, 211, 105, 0.3);
          top: 50%;
          left: 50%;
          z-index: 3;
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        /* Random Movement Animations for Each Node - Slower */
        .node-1 {
          animation: moveNode1 16s ease-in-out infinite;
        }

        .node-2 {
          animation: moveNode2 20s ease-in-out infinite;
        }

        .node-3 {
          animation: moveNode3 18s ease-in-out infinite;
        }

        .node-4 {
          animation: moveNode4 22s ease-in-out infinite;
        }

        .node-5 {
          animation: moveNode5 14s ease-in-out infinite;
        }

        .node-6 {
          animation: moveNode6 19s ease-in-out infinite;
        }

        .node-7 {
          animation: moveNode7 17s ease-in-out infinite;
        }

        .node-8 {
          animation: moveNode8 21s ease-in-out infinite;
        }

        /* Random Circular Movement Paths */
        @keyframes moveNode1 {
          0% { transform: translate(-35px, -5px); }
          25% { transform: translate(-10px, -35px); }
          50% { transform: translate(25px, -20px); }
          75% { transform: translate(15px, 30px); }
          100% { transform: translate(-35px, -5px); }
        }

        @keyframes moveNode2 {
          0% { transform: translate(30px, -15px); }
          25% { transform: translate(35px, 20px); }
          50% { transform: translate(5px, 38px); }
          75% { transform: translate(-30px, 15px); }
          100% { transform: translate(30px, -15px); }
        }

        @keyframes moveNode3 {
          0% { transform: translate(10px, 35px); }
          25% { transform: translate(-35px, 25px); }
          50% { transform: translate(-25px, -15px); }
          75% { transform: translate(20px, -30px); }
          100% { transform: translate(10px, 35px); }
        }

        @keyframes moveNode4 {
          0% { transform: translate(-25px, 30px); }
          25% { transform: translate(-15px, -25px); }
          50% { transform: translate(35px, -10px); }
          75% { transform: translate(25px, 28px); }
          100% { transform: translate(-25px, 30px); }
        }

        @keyframes moveNode5 {
          0% { transform: translate(35px, 15px); }
          25% { transform: translate(15px, 35px); }
          50% { transform: translate(-30px, 10px); }
          75% { transform: translate(-20px, -25px); }
          100% { transform: translate(35px, 15px); }
        }

        @keyframes moveNode6 {
          0% { transform: translate(-30px, -20px); }
          25% { transform: translate(20px, -30px); }
          50% { transform: translate(35px, 5px); }
          75% { transform: translate(10px, 35px); }
          100% { transform: translate(-30px, -20px); }
        }

        @keyframes moveNode7 {
          0% { transform: translate(15px, -32px); }
          25% { transform: translate(-32px, -10px); }
          50% { transform: translate(-15px, 32px); }
          75% { transform: translate(32px, 20px); }
          100% { transform: translate(15px, -32px); }
        }

        @keyframes moveNode8 {
          0% { transform: translate(-35px, 5px); }
          25% { transform: translate(-5px, 35px); }
          50% { transform: translate(30px, -15px); }
          75% { transform: translate(-10px, -35px); }
          100% { transform: translate(-35px, 5px); }
        }

        /* Hover Effects */
        .logo:hover .logo-image {
          box-shadow: 0 0 24px rgba(255, 211, 105, 0.7);
          transform: scale(1.08);
        }

        .logo:hover .neural-node {
          box-shadow: 0 0 16px var(--accent-primary), 0 0 30px rgba(255, 211, 105, 0.5);
          opacity: 1;
          animation-play-rate: 1.5;
        }

        /* Canvas-based Dynamic Connections - No static SVG needed */

        .nav-menu {
          display: flex;
          align-items: center;
          gap: 2.5rem;
        }

        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-primary);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .theme-toggle {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 1.1rem;
          transition: transform 0.3s ease, color 0.3s ease;
          display: flex;
          align-items: center;
        }

        .theme-toggle:hover {
          transform: rotate(15deg);
          color: var(--accent-primary);
        }

        .cv-btn {
          background: var(--accent-primary);
          color: var(--bg-primary);
          padding: 0.6rem 1.4rem;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .cv-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 211, 105, 0.4);
          filter: brightness(1.1);
        }

        .mobile-only {
          display: none;
        }

        @media (max-width: 768px) {
          .nav {
            top: 0;
            left: 0;
            transform: none;
            width: 100%;
            max-width: none;
            border-radius: 0;
            padding: 1rem 1.2rem;
            background: rgba(15, 15, 20, 0.98);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            border: none;
          }

          .nav.scrolled {
            width: 100%;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
          }

          [data-theme="light"] .nav {
            background: rgba(255, 255, 255, 0.98);
          }

          /* Reduce logo size on mobile */
          .logo-wrapper {
            width: 70px;
            height: 70px;
          }

          .logo-image {
            width: 38px;
            height: 38px;
            border-width: 2px;
          }

          /* Reduce node animation area on mobile */
          .neural-node {
            width: 5px;
            height: 5px;
            box-shadow: 0 0 8px var(--accent-primary), 0 0 16px rgba(255, 211, 105, 0.2);
          }

          .desktop-only {
            display: none;
          }

          .mobile-only {
            display: block;
          }

          .mobile-toggle {
            background: none;
            border: none;
            color: var(--text-primary);
            font-size: 1.4rem;
            cursor: pointer;
            transition: color 0.3s ease;
            padding: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-toggle:hover {
            color: var(--accent-primary);
          }

          .mobile-menu {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            max-height: calc(100vh - 70px);
            background: var(--bg-primary);
            border-bottom: 1px solid var(--glass-border);
            padding: 1.5rem 1.2rem;
            display: flex;
            flex-direction: column;
            gap: 1.2rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            overflow-y: auto;
            z-index: 999;
          }

          [data-theme="light"] .mobile-menu {
            background: rgba(255, 255, 255, 0.98);
          }

          .mobile-link {
            color: var(--text-primary);
            text-decoration: none;
            font-size: 1rem;
            font-weight: 600;
            text-align: center;
            padding: 0.8rem;
            border-radius: 8px;
            transition: all 0.3s ease;
          }

          .mobile-link:active {
            background: rgba(255, 211, 105, 0.1);
            color: var(--accent-primary);
          }

          .mobile-actions {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-top: 1rem;
            border-top: 1px solid var(--glass-border);
            padding-top: 1.5rem;
          }

          .theme-toggle.mobile {
            justify-content: center;
            gap: 0.8rem;
            padding: 0.8rem;
            background: rgba(255, 211, 105, 0.08);
            border: 1px solid rgba(255, 211, 105, 0.2);
            border-radius: 8px;
            font-size: 0.95rem;
            color: var(--text-primary);
          }

          .cv-btn.mobile {
            text-align: center;
            width: 100%;
            padding: 0.8rem 1.2rem;
            background: var(--accent-primary);
            color: var(--bg-primary);
            border-radius: 8px;
            font-size: 0.95rem;
          }

          .cv-btn.mobile:active {
            transform: scale(0.98);
          }
        }

        @media (max-width: 480px) {
          .nav {
            padding: 0.8rem 1rem;
          }

          .logo-wrapper {
            width: 60px;
            height: 60px;
          }

          .logo-image {
            width: 32px;
            height: 32px;
          }

          .mobile-menu {
            top: 60px;
            max-height: calc(100vh - 60px);
            padding: 1rem;
            gap: 1rem;
          }

          .mobile-link {
            font-size: 0.95rem;
            padding: 0.6rem;
          }

          .mobile-toggle {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
