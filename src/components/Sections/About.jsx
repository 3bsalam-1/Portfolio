import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/skills';
import { certificates } from '../../data/certificates';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';

const About = () => {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h2>

        <div className="about-wrapper glass-panel">
          <div className="about-grid">
            {/* Left Column: Image & Quick Stats */}
            <div className="profile-column">
              <motion.div
                className="profile-frame"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="hex-border"></div>
                <img
                  src="https://avatars.githubusercontent.com/u/121203923?v=4"
                  alt="Ahmed Mohamed"
                  className="profile-image"
                />
              </motion.div>

              <div className="quick-stats">
                <div className="stat-item">
                  <span className="stat-value">2+</span>
                  <span className="stat-label">Years Exp</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">10+</span>
                  <span className="stat-label">Projects</span>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Skills */}
            <div className="bio-column">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="profile-name">Ahmed Mohamed</h3>
                <h4 className="profile-role">AI / Machine Learning Engineer</h4>

                <p className="bio-text">
                  Recent Computer Science graduate specializing in building robust <span className="highlight">end-to-end ML solutions</span>.
                  From preprocessing complex datasets to deploying scalable models with FastAPI, I bridge the gap between data science and production engineering.
                </p>

                <div className="tech-section">
                  <h5 className="tech-header">Technical Arsenal</h5>
                  <div className="tech-grid">
                    {skills.map((skill) => (
                      <div key={skill.category} className="tech-category">
                        <span className="category-label">{skill.category}</span>
                        <div className="chip-container">
                          {skill.items.map(item => (
                            <span key={item} className="tech-chip">{item}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Certificates Ribbon */}
          <div className="certificates-ribbon">
            <h5 className="ribbon-header">Certifications</h5>
            <div className="cert-row">
              {certificates.map((cert, index) => (
                <a
                  key={index}
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-pill"
                >
                  <FaCertificate className="cert-icon" />
                  <span>{cert.title}</span>
                  <FaExternalLinkAlt className="link-icon" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          padding: 6rem 0;
        }

        .about-wrapper {
          padding: 3rem;
          border-radius: 24px;
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 4rem;
          margin-bottom: 3rem;
        }

        /* Profile Selection */
        .profile-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: center;
        }

        .profile-frame {
          position: relative;
          width: 200px;
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .profile-image {
          width: 180px;
          height: 180px;
          border-radius: 20px;
          object-fit: cover;
          position: relative;
          z-index: 2;
          border: 2px solid var(--accent-primary);
        }

        .hex-border {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 2px dashed var(--accent-primary);
          border-radius: 24px;
          animation: spin 20s linear infinite;
          opacity: 0.3;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .quick-stats {
          display: flex;
          gap: 2rem;
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--accent-primary);
        }

        .stat-label {
          font-size: 0.8rem;
          color: var(--text-tertiary);
          text-transform: uppercase;
        }

        /* Bio Section */
        .profile-name {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .profile-role {
          font-size: 1.25rem;
          color: var(--accent-primary);
          margin-bottom: 2rem;
          font-family: 'Fira Code', monospace;
        }

        .bio-text {
          font-size: 1.1rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 3rem;
          max-width: 800px;
        }

        .highlight {
          color: var(--accent-primary);
          font-weight: 600;
        }

        /* Tech Arsenal */
        .tech-header, .ribbon-header {
          font-size: 0.9rem;
          text-transform: uppercase;
          color: var(--text-tertiary);
          margin-bottom: 1rem;
          letter-spacing: 1px;
          font-weight: 700;
        }

        .tech-grid {
          display: grid;
          gap: 1.5rem;
        }

        .tech-category {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }

        .category-label {
          min-width: 100px;
          font-size: 0.9rem;
          color: var(--text-primary);
          font-weight: 600;
          padding-top: 0.4rem;
        }

        .chip-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
        }

        .tech-chip {
          padding: 0.4rem 1rem;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 50px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .tech-chip:hover {
          border-color: var(--accent-primary);
          color: var(--accent-primary);
          transform: translateY(-2px);
          background: rgba(255, 211, 105, 0.1);
        }

        /* Certificate Ribbon */
        .certificates-ribbon {
          border-top: 1px solid var(--glass-border);
          padding-top: 2rem;
          margin-top: 2rem;
        }

        .cert-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .cert-pill {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 0.8rem 1.5rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 8px;
          border: 1px solid transparent;
          text-decoration: none;
          color: var(--text-secondary);
          transition: all 0.3s ease;
        }

        .cert-pill:hover {
          background: rgba(255, 211, 105, 0.05);
          border-color: var(--accent-primary);
          color: var(--text-primary);
        }

        .cert-icon { color: var(--accent-primary); }
        .link-icon { font-size: 0.8rem; opacity: 0.5; }

        @media (max-width: 968px) {
          .about-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 3rem;
          }

          .profile-column {
            order: 1;
            margin: 0 auto;
          }
          
          .quick-stats {
            justify-content: center;
          }

          .tech-category {
            flex-direction: column;
            align-items: center;
          }

          .category-label {
            min-width: auto;
          }

          .chip-container, .cert-row {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
