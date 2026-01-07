import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const socialLinks = [
        { icon: FaGithub, url: "https://github.com/3bsalam-1", label: "GitHub" },
        { icon: FaLinkedin, url: "https://linkedin.com/in/ahmed-mohamed", label: "LinkedIn" },
        { icon: FaEnvelope, url: "mailto:3bsalam0@gmail.com", label: "Email" }
    ];

    return (
        <footer className="footer">
            <div className="container">
                <motion.div
                    className="footer-content"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {/* Left Section - Branding */}
                    <div className="footer-section">
                        <h3 className="footer-brand">Ahmed Mohamed</h3>
                        <p className="footer-tagline">ML Engineer | AI Enthusiast | Problem Solver</p>
                    </div>

                    {/* Center Section - Social Links */}
                    <div className="footer-section social-section">
                        <h4 className="footer-section-title">Connect</h4>
                        <div className="social-links">
                            {socialLinks.map((link, index) => {
                                const Icon = link.icon;
                                return (
                                    <motion.a
                                        key={link.label}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-icon"
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                    >
                                        <Icon />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Section - Back to Top */}
                    <div className="footer-section">
                        <motion.button
                            onClick={scrollToTop}
                            className="scroll-top-btn"
                            whileHover={{ y: -3 }}
                            whileTap={{ y: 0 }}
                        >
                            <FaArrowUp />
                            <span>Back to Top</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* Bottom Section - Copyright */}
                <div className="footer-bottom">
                    <div className="divider"></div>
                    <div className="copyright-wrapper">
                        <p className="copyright">
                            &copy; {new Date().getFullYear()} Ahmed Mohamed. Built with passion for <span className="highlight">AI & Machine Learning</span>.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .footer {
                    background: var(--glass-bg);
                    backdrop-filter: var(--glass-blur);
                    border-top: 1px solid var(--glass-border);
                    padding: 4rem 2rem 2rem;
                    margin-top: 6rem;
                    position: relative;
                    overflow: hidden;
                }

                .footer::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(
                        to right,
                        transparent,
                        rgba(255, 211, 105, 0.3),
                        transparent
                    );
                }

                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 3rem;
                    margin-bottom: 3rem;
                    max-width: 1200px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .footer-section {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                /* Branding Section */
                .footer-brand {
                    font-size: 1.4rem;
                    font-weight: 800;
                    background: var(--gradient-main);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin: 0;
                }

                .footer-tagline {
                    color: var(--text-secondary);
                    font-size: 0.95rem;
                    margin: 0;
                    font-weight: 500;
                }

                /* Section Title */
                .footer-section-title {
                    font-size: 0.95rem;
                    color: var(--text-primary);
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    font-weight: 700;
                    margin: 0 0 1rem 0;
                }

                /* Social Links */
                .social-section {
                    align-items: flex-start;
                }

                .social-links {
                    display: flex;
                    gap: 1.5rem;
                }

                .social-icon {
                    width: 45px;
                    height: 45px;
                    border-radius: 10px;
                    background: rgba(255, 211, 105, 0.08);
                    border: 1px solid rgba(255, 211, 105, 0.2);
                    color: var(--accent-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }

                .social-icon:hover {
                    background: var(--gradient-main);
                    border-color: var(--accent-primary);
                    color: #000;
                    box-shadow: 0 8px 20px rgba(255, 211, 105, 0.3);
                }

                /* Scroll Top Button */
                .scroll-top-btn {
                    display: flex;
                    align-items: center;
                    gap: 0.6rem;
                    background: rgba(255, 211, 105, 0.1);
                    border: 1.5px solid var(--accent-primary);
                    color: var(--accent-primary);
                    padding: 0.8rem 1.5rem;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    width: fit-content;
                }

                .scroll-top-btn:hover {
                    background: var(--gradient-main);
                    color: #000;
                    box-shadow: 0 0 20px rgba(255, 211, 105, 0.4);
                    border-color: var(--accent-primary);
                }

                .scroll-top-btn:focus-visible {
                    outline: 2px solid var(--accent-primary);
                    outline-offset: 2px;
                }

                /* Bottom Section */
                .footer-bottom {
                    text-align: center;
                }

                .divider {
                    height: 1px;
                    background: linear-gradient(
                        to right,
                        transparent,
                        rgba(255, 211, 105, 0.2),
                        transparent
                    );
                    margin-bottom: 1.5rem;
                }

                .copyright-wrapper {
                    padding-top: 1rem;
                }

                .copyright {
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    margin: 0;
                    line-height: 1.6;
                }

                .copyright .highlight {
                    color: var(--accent-primary);
                    font-weight: 600;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .footer {
                        padding: 3rem 1rem 1.5rem;
                        margin-top: 4rem;
                    }

                    .footer-content {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .social-section {
                        align-items: center;
                    }

                    .social-links {
                        justify-content: center;
                    }

                    .scroll-top-btn {
                        width: 100%;
                        justify-content: center;
                    }

                    .copyright {
                        font-size: 0.85rem;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
