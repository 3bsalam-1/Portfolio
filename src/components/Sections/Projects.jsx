import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { projects, categories } from '../../data/projects';
import './Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const scrollContainer = useRef(null);

  const scroll = (direction) => {
    const container = scrollContainer.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '100px' }}
          >
            Engineering Case Studies
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '100px' }}
            transition={{ delay: 0.1 }}
          >
            Technical deep dives into solving real-world problems.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <div className="filter-container">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${filter === category.id ? 'active' : ''}`}
              onClick={() => setFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects Grid Wrapper with Controls */}
        <div className="projects-carousel-wrapper">
          <button className="scroll-btn left" onClick={() => scroll('left')} aria-label="Scroll Left">
            <FaChevronLeft />
          </button>

          <div className="projects-grid" ref={scrollContainer}>
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => {
                const Icon = project.icon;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="project-card"
                  >
                    {/* Header */}
                    <div className="card-header">
                      <div className="header-content">
                        <h3>{project.title}</h3>
                        <span className="category">{categories.find(c => c.id === project.category)?.name}</span>
                      </div>
                      <div className="project-icon">
                        <Icon />
                      </div>
                    </div>

                    {/* Body */}
                    <div className="card-body">
                      <div className="problem-statement">
                        <span className="label">The Challenge</span>
                        <p>{project.problem}</p>
                      </div>

                      <div className="problem-statement">
                        <span className="label">The Solution</span>
                        <p>{project.solution}</p>
                      </div>

                      <div className="metrics">
                        <span className="label">Key Impact</span>
                        <p>{project.metrics}</p>
                      </div>

                      <div className="tech-stack">
                        {project.techStack.map(tech => (
                          <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="card-footer">
                      <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="btn-code">
                        View Code & Architecture
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <button className="scroll-btn right" onClick={() => scroll('right')} aria-label="Scroll Right">
            <FaChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
