import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaArrowRight } from 'react-icons/fa';

const Contact = () => {
  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "3bsalam0@gmail.com",
      link: "mailto:3bsalam0@gmail.com"
    },
    {
      icon: FaPhone,
      title: "Phone",
      value: "+20 100 328 0029",
      link: "tel:+201003280029"
    },
    {
      icon: FaLinkedin,
      title: "LinkedIn",
      value: "Connect with me",
      link: "https://linkedin.com/in/ahmed-mohamed"
    },
    {
      icon: FaGithub,
      title: "GitHub",
      value: "@3bsalam-1",
      link: "https://github.com/3bsalam-1"
    }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '100px' }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '100px' }}
          >
            Let's <span className="gradient-text">collaborate</span>
          </motion.h2>

          <motion.p
            className="contact-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '100px' }}
            transition={{ delay: 0.1 }}
          >
            I'm always open to discussing new projects, creative ideas, or opportunities to contribute to innovative AI/ML solutions. Reach out and let's build something amazing together.
          </motion.p>
        </motion.div>

        <div className="contact-grid">
          {contactInfo.map((item, index) => (
            <motion.a
              key={item.title}
              href={item.link}
              target={item.title === 'Phone' || item.title === 'Email' ? '_self' : '_blank'}
              rel="noopener noreferrer"
              className="contact-card"
              aria-label={`Contact via ${item.title}: ${item.value}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="card-content">
                <div className="icon-wrapper">
                  <div className="icon-bg"></div>
                  <item.icon className="contact-icon" />
                </div>
                <h3>{item.title}</h3>
                <span className="contact-value">{item.value}</span>
              </div>
              <div className="card-arrow">
                <FaArrowRight />
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        .contact-section {
          padding: 8rem 2rem;
        }

        .contact-header {
          text-align: center;
          margin-bottom: 4rem;
        }

        .contact-header .section-title {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .contact-subtitle {
          max-width: 700px;
          margin: 0 auto;
          color: var(--text-secondary);
          font-size: 1.1rem;
          line-height: 1.7;
          font-weight: 400;
        }

        .contact-grid {
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          flex-wrap: wrap;
        }

        .contact-card {
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          padding: 2rem;
          border-radius: 16px;
          text-decoration: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          overflow: hidden;
          flex: 1;
          min-width: 220px;
          max-width: 280px;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 211, 105, 0.1) 0%, transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .contact-card:hover::before {
          opacity: 1;
        }

        .contact-card:hover {
          border-color: var(--accent-primary);
          box-shadow: 0 15px 40px rgba(255, 211, 105, 0.15);
        }

        .contact-card:focus-visible {
          outline: 2px solid var(--accent-primary);
          outline-offset: 2px;
          border-color: var(--accent-primary);
        }

        .card-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .icon-wrapper {
          position: relative;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(255, 211, 105, 0.1);
          border: 1.5px solid rgba(255, 211, 105, 0.3);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .contact-card:hover .icon-bg {
          background: var(--gradient-main);
          border-color: var(--accent-primary);
          box-shadow: 0 0 20px rgba(255, 211, 105, 0.3);
          transform: scale(1.1);
        }

        .contact-icon {
          font-size: 1.8rem;
          color: var(--accent-primary);
          transition: color 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .contact-card:hover .contact-icon {
          color: #000;
        }

        .contact-card h3 {
          color: var(--text-primary);
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0;
        }

        .contact-value {
          color: var(--text-secondary);
          font-size: 0.95rem;
          font-weight: 500;
          transition: color 0.3s ease;
          display: block;
          word-break: break-all;
        }

        .contact-card:hover .contact-value {
          color: var(--accent-primary);
        }

        .card-arrow {
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
          color: var(--accent-primary);
          font-size: 1.2rem;
        }

        .contact-card:hover .card-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        .gradient-text {
          background: var(--gradient-main);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @media (max-width: 768px) {
          .contact-section {
            padding: 5rem 1rem;
          }

          .contact-header .section-title {
            font-size: 2rem;
          }

          .contact-subtitle {
            font-size: 1rem;
          }

          .contact-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
