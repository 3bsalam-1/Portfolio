/**
 * Animation Configuration
 * Centralized constants for all animation values across the portfolio
 */

export const typewriterConfig = {
  speed: 80,        // Characters per second (lower = faster)
  delay: 0.8,       // Delay before starting (in seconds)
};

export const transitionConfig = {
  fast: { duration: 0.2 },
  normal: { duration: 0.3 },
  slow: { duration: 0.5 },
};

export const motionConfig = {
  // Viewport configuration for whileInView animations
  viewport: {
    once: true,
    margin: '100px', // Trigger animation 100px before element enters viewport
  },
};

export const sectionAnimations = {
  title: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  subtitle: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.1 },
  },
  card: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  },
};

export const navbarConfig = {
  scrollThrottleLimit: 16, // Milliseconds (60fps)
  scrollTriggerDistance: 50, // Pixels
};

export const neuralBackgroundConfig = {
  nodeCount: 35,
  connectionDistance: 150,
  nodeColor: {
    dark: 'rgba(255, 211, 105, 0.95)',
    light: 'rgba(255, 192, 0, 0.8)',
  },
  connectionColor: {
    dark: 'rgba(255, 211, 105, ',
    light: 'rgba(255, 192, 0, ',
  },
};
