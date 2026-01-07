import React from 'react';
import { motion } from 'framer-motion';
import Typewriter from '../Effects/Typewriter';
import { FaArrowRight } from 'react-icons/fa';
import { typewriterConfig } from '../../config/animationConfig';

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <motion.div
          className="hero-content glass-panel"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="badge-dot"></span>
            <span className="badge-text">Welcome to my creative space</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ML Engineer <span className="gradient-text">obsessed with real-world impact</span>
          </motion.h1>

          {/* Subtitle with Typewriter */}
          <motion.h2
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Typewriter text="Production pipelines meet cutting-edge models" delay={typewriterConfig.delay} speed={typewriterConfig.speed} />
          </motion.h2>

          {/* Description */}
          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Recent CS grad specializing in end-to-end AI solutions. Expert in building robust ML architectures, optimizing inference performance, and shipping production systems with FastAPI, TensorFlow, and PyTorch. 10+ projects across CV, NLP, RL, and ML infrastructure.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="cta-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <a href="#projects" className="btn btn-primary">
              <span>View My Work</span>
              <FaArrowRight className="btn-icon" />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Start a Conversation
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="stat">
              <span className="stat-value">10+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">2+</span>
              <span className="stat-label">Years Exp</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <span className="stat-value">∞</span>
              <span className="stat-label">Passion</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          padding: 120px 2rem 4rem;
          overflow: hidden;
        }

        .hero-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          max-width: 900px;
          margin: 0 auto;
        }

        /* Glass Panel Content */
        .hero-content.glass-panel {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 3rem 2.5rem;
          box-shadow: var(--glass-shadow);
          text-align: center;
        }

        /* Badge */
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(255, 211, 105, 0.08);
          border: 1px solid rgba(255, 211, 105, 0.2);
          border-radius: 50px;
          padding: 0.6rem 1.2rem;
          margin-bottom: 2rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-primary);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: var(--accent-primary);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        /* Title */
        .hero-title {
          font-size: 3.2rem;
          font-weight: 800;
          margin-bottom: 1.2rem;
          line-height: 1.3;
          color: var(--text-primary);
        }

        .gradient-text {
          background: var(--gradient-main);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        /* Subtitle */
        .hero-subtitle {
          font-size: 1.6rem;
          font-weight: 500;
          color: var(--accent-primary);
          margin-bottom: 1.5rem;
          min-height: 2.5rem;
          letter-spacing: 0.5px;
        }

        /* Description */
        .hero-description {
          font-size: 1.05rem;
          color: var(--text-secondary);
          max-width: 700px;
          margin: 0 auto 2.5rem;
          line-height: 1.7;
          font-weight: 400;
        }

        /* CTA Buttons */
        .cta-buttons {
          display: flex;
          gap: 1.2rem;
          justify-content: center;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .btn {
          padding: 0.9rem 2rem;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          letter-spacing: 0.5px;
          border: none;
          cursor: pointer;
        }

        .btn:focus-visible {
          outline: 2px solid var(--accent-primary);
          outline-offset: 2px;
        }

        /* Primary Button */
        .btn-primary {
          background: transparent;
          color: var(--accent-primary);
          border: 2px solid var(--accent-primary);
          box-shadow: 0 0 20px rgba(255, 211, 105, 0.2), inset 0 0 20px rgba(255, 211, 105, 0.05);
          position: relative;
          overflow: visible;
          animation: goldGlow 3s ease-in-out infinite;
        }

        @keyframes goldGlow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 211, 105, 0.2), inset 0 0 20px rgba(255, 211, 105, 0.05);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 211, 105, 0.4), inset 0 0 20px rgba(255, 211, 105, 0.1);
          }
        }

        .btn-primary:hover {
          background: var(--gradient-main);
          color: #000;
          border-color: var(--accent-primary);
          box-shadow: 0 0 40px rgba(255, 211, 105, 0.6), inset 0 0 20px rgba(255, 211, 105, 0.2);
          transform: translateY(-2px);
          animation: none;
        }

        .btn-primary .btn-icon {
          transition: transform 0.3s ease;
          font-size: 0.8rem;
        }

        .btn-primary:hover .btn-icon {
          transform: translateX(8px);
        }

        /* Secondary Button */
        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-primary);
          border: 1px solid rgba(255, 211, 105, 0.3);
        }

        .btn-secondary:hover {
          background: rgba(255, 211, 105, 0.1);
          border-color: var(--accent-primary);
          transform: translateY(-2px);
        }

        /* Stats Section */
        .hero-stats {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 211, 105, 0.1);
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
        }

        .stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          background: var(--gradient-main);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .stat-divider {
          width: 1px;
          height: 30px;
          background: rgba(255, 211, 105, 0.2);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero {
            padding: 100px 1rem 2rem;
          }

          .hero-content.glass-panel {
            padding: 2rem 1.5rem;
            border-radius: 16px;
          }

          .hero-title {
            font-size: 2.2rem;
            margin-bottom: 1rem;
          }

          .hero-subtitle {
            font-size: 1.2rem;
            min-height: auto;
          }

          .hero-description {
            font-size: 0.95rem;
            margin-bottom: 1.5rem;
          }

          .cta-buttons {
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .btn {
            width: 100%;
          }

          .hero-stats {
            gap: 1rem;
            padding-top: 1.5rem;
            flex-wrap: wrap;
          }

          .stat-divider {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
