import React, { useMemo, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from '../Effects/Typewriter';
import { FaArrowRight } from 'react-icons/fa';
import { typewriterConfig } from '../../config/animationConfig';

const Hero = () => {
  const apiBase = useMemo(() => {
    const raw = import.meta.env.VITE_API_BASE || '';
    return raw.endsWith('/') ? raw.slice(0, -1) : raw;
  }, []);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Ask me anything about Ahmed — experience, projects, skills, or the PDF documents behind this portfolio.",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [citations, setCitations] = useState([]);

  const [showChat, setShowChat] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking'); // 'checking' | 'connected' | 'disconnected'
  const chatLogRef = useRef(null);

  // Arabic detection
  const isArabic = (text) => /[\u0600-\u06FF]/.test(text);

  // Auto-scroll to bottom of chat log
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Check backend health on mount
  React.useEffect(() => {
    const checkHealth = async () => {
      if (!apiBase) {
        setConnectionStatus('disconnected');
        return;
      }
      try {
        const res = await fetch(`${apiBase}/api/health`);
        if (res.ok) {
          setConnectionStatus('connected');
        } else {
          setConnectionStatus('disconnected');
        }
      } catch (e) {
        setConnectionStatus('disconnected');
      }
    };

    checkHealth();
  }, [apiBase]);

  const suggested = [
    "What’s Ahmed’s strongest ML project and why?",
    "Summarize Ahmed’s experience in 5 bullets.",
    "What tools does Ahmed use for deployment (FastAPI, Docker, etc.)?",
    "What’s in Ahmed’s CV?",
  ];

  const send = async (question) => {
    const q = (question || '').trim();
    if (!q || isLoading) return;

    setError('');
    setIsLoading(true);
    setCitations([]);

    setMessages((prev) => [...prev, { role: 'user', content: q }]);
    setInput('');

    try {
      const history = messages
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && m.content)
        .slice(-12);

      const res = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, messages: history }),
      });

      if (!res.ok) {
        const maybe = await res.json().catch(() => null);
        const detail = maybe?.detail || `Request failed (${res.status})`;
        throw new Error(detail);
      }

      // Consuming ReadableStream
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let assistantAnswer = '';

      // Initialize assistant message in state
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        // Process SSE lines
        const lines = chunkValue.split('\n');
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const dataStr = line.slice(6).trim();
            if (dataStr === '[DONE]') {
              done = true;
              break;
            }
            try {
              const data = JSON.parse(dataStr);
              if (data.type === 'citations') {
                setCitations(data.citations || []);
              } else if (data.type === 'content') {
                assistantAnswer += data.content;
                // Update ONLY the last message (the assistant one we just added)
                setMessages((prev) => {
                  const newMsgs = [...prev];
                  newMsgs[newMsgs.length - 1] = { role: 'assistant', content: assistantAnswer };
                  return newMsgs;
                });
              } else if (data.type === 'error') {
                throw new Error(data.detail || 'Streaming error');
              }
            } catch (e) {
              console.error("Error parsing stream chunk:", e);
            }
          }
        }
      }
    } catch (e) {
      setError(e?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="home" className="hero">
      <div className="container hero-container">
        <AnimatePresence mode="wait">
          {!showChat ? (
            <motion.div
              key="hero-content"
              className="hero-content glass-panel"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
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
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowChat(true)}
                >
                  Start a Conversation
                </button>
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
          ) : (
            <motion.div
              key="chat-interface"
              className="chat-interface glass-panel"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <button
                className="back-btn"
                onClick={() => setShowChat(false)}
              >
                ← Back to Home
              </button>

              <div className="chat-header">
                <div className="chat-title">
                  <span className="chat-dot" />
                  <span>Ask AI about me</span>
                </div>
                <span className="chat-hint">
                  Powered by my documents (RAG) + GitHub Models
                </span>
              </div>

              <div className="chat-suggestions">
                {suggested.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="chip"
                    onClick={() => send(q)}
                    disabled={isLoading}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <div className="chat-log" ref={chatLogRef} aria-live="polite">
                {messages.slice(-8).map((m, idx) => (
                  <div
                    key={`${m.role}-${idx}`}
                    className={`chat-bubble ${m.role === 'user' ? 'user' : 'assistant'}`}
                    style={{
                      direction: isArabic(m.content) ? 'rtl' : 'ltr',
                      textAlign: isArabic(m.content) ? 'right' : 'left'
                    }}
                  >
                    {m.content}
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                  <div className="chat-bubble assistant">
                    Thinking…
                  </div>
                )}
              </div>

              {!!error && <div className="chat-error">{error}</div>}

              <div className="chat-input-row">
                <textarea
                  className="chat-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about experience, skills... اسأل عن الخبرة والمهارات"
                  rows={2}
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                />
                <button
                  type="button"
                  className="chat-send"
                  onClick={() => send(input)}
                  disabled={isLoading || !input.trim()}
                >
                  Send
                </button>
              </div>

              <div className="chat-footer">
                <div className="connection-status">
                  <span
                    className={`status-dot ${connectionStatus}`}
                    aria-label={`Status: ${connectionStatus}`}
                  />
                  <span className="status-text">
                    {connectionStatus === 'checking' ? 'Connecting...' :
                      connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
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

        /* AI Chat */
        .hero-chat {
          margin: 0 auto 2.5rem;
          max-width: 760px;
          text-align: left;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 211, 105, 0.15);
          border-radius: 16px;
          padding: 1.25rem;
        }

        .chat-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 0.9rem;
        }

        .chat-title {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-weight: 800;
          color: var(--text-primary);
        }

        .chat-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: var(--accent-primary);
          box-shadow: 0 0 12px rgba(255, 211, 105, 0.35);
        }

        .chat-hint {
          color: var(--text-tertiary);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .chat-suggestions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }

        .chip {
          border: 1px solid rgba(255, 211, 105, 0.22);
          background: rgba(255, 211, 105, 0.06);
          color: var(--text-primary);
          padding: 0.45rem 0.75rem;
          border-radius: 999px;
          cursor: pointer;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }

        .chip:hover {
          transform: translateY(-1px);
          border-color: var(--accent-primary);
        }

        .chip:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .chat-log {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          padding: 0.8rem;
          padding-right: 1.2rem; /* Space for scrollbar */
          border: 1px solid rgba(255, 255, 255, 0.06);
          background: rgba(0, 0, 0, 0.12);
          border-radius: 12px;
          min-height: 0; /* Keyword for flex scrolling */
          overflow-y: auto;
          margin-bottom: 0.8rem;
          
          /* Custom Scrollbar */
          scrollbar-width: thin;
          scrollbar-color: var(--accent-primary) transparent;
        }

        .chat-log::-webkit-scrollbar {
          width: 6px;
        }

        .chat-log::-webkit-scrollbar-track {
          background: transparent;
        }

        .chat-log::-webkit-scrollbar-thumb {
          background-color: var(--accent-primary);
          border-radius: 20px;
          border: 2px solid transparent;
          background-clip: content-box;
        }

        [data-theme="light"] .chat-log {
          background: rgba(0, 0, 0, 0.04);
        }

        .chat-bubble {
          max-width: 92%;
          padding: 0.75rem 0.9rem;
          border-radius: 12px;
          line-height: 1.55;
          font-size: 0.95rem;
          white-space: pre-wrap;
        }

        .chat-bubble.user {
          align-self: flex-end;
          background: rgba(255, 211, 105, 0.14);
          border: 1px solid rgba(255, 211, 105, 0.28);
        }

        .chat-bubble.assistant {
          align-self: flex-start;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .chat-error {
          color: #ffb4b4;
          background: rgba(255, 0, 0, 0.08);
          border: 1px solid rgba(255, 0, 0, 0.18);
          padding: 0.6rem 0.8rem;
          border-radius: 12px;
          margin-bottom: 0.8rem;
          font-size: 0.9rem;
        }

        .chat-citations {
          margin-bottom: 0.8rem;
          padding: 0.8rem;
          border: 1px solid rgba(255, 211, 105, 0.14);
          background: rgba(255, 211, 105, 0.05);
          border-radius: 12px;
        }

        .citations-title {
          font-weight: 800;
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }

        .chat-citations ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 0.5rem;
        }

        .chat-citations li {
          display: grid;
          gap: 0.25rem;
        }

        .cite-source {
          color: var(--accent-primary);
          font-weight: 700;
          font-size: 0.85rem;
        }

        .cite-excerpt {
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .chat-input-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.75rem;
          align-items: stretch;
        }

        .chat-input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(0, 0, 0, 0.12);
          color: var(--text-primary);
          padding: 0.7rem 0.85rem;
          resize: none;
          outline: none;
          font-family: inherit;
          font-size: 0.95rem;
          line-height: 1.4;
        }

        [data-theme="light"] .chat-input {
          background: rgba(0, 0, 0, 0.04);
        }

        .chat-input:focus {
          border-color: rgba(255, 211, 105, 0.5);
          box-shadow: 0 0 0 3px rgba(255, 211, 105, 0.12);
        }

        .chat-send {
          border-radius: 12px;
          padding: 0 1.1rem;
          font-weight: 800;
          border: 1px solid rgba(255, 211, 105, 0.35);
          background: var(--gradient-main);
          color: #000;
          cursor: pointer;
          transition: transform 0.2s ease, filter 0.2s ease;
        }

        .chat-send:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }

        .chat-send:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .chat-footer {
          margin-top: 0.6rem;
          color: var(--text-tertiary);
          font-size: 0.8rem;
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

        .connection-status {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          justify-content: flex-end;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--text-tertiary);
        }

        .status-dot.connected {
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74, 222, 128, 0.4);
        }

        .status-dot.disconnected {
          background: #ef4444;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
        }

        .status-text {
          color: var(--text-tertiary);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero {
            padding: 80px 1rem 2rem;
          }

          .hero-content.glass-panel {
            padding: 1.5rem 1rem;
            border-radius: 16px;
          }

          .hero-title {
            font-size: 2rem;
            margin-bottom: 0.8rem;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .chat-interface.glass-panel {
            padding: 1rem;
            height: calc(100vh - 120px);
            max-height: none;
            border-radius: 16px;
          }

          .chat-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }

          .chat-log {
            padding: 0.5rem;
            padding-right: 0.7rem;
          }

          .chat-bubble {
            font-size: 0.85rem;
            padding: 0.6rem 0.8rem;
            max-width: 98%;
          }

          .chip {
            padding: 0.3rem 0.6rem;
            font-size: 0.72rem;
          }

          .chat-input-row {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }

          .chat-send {
            height: 40px;
            padding: 0;
            font-size: 0.85rem;
          }

          .connection-status {
            justify-content: center;
            margin-top: 0.5rem;
          }

          .cta-buttons {
            flex-direction: column;
          }
        }
        
        .chat-interface.glass-panel {
          width: 100%;
          height: 75vh; /* Fixed height for chat mode */
          max-height: 800px;
          display: flex;
          flex-direction: column;
          background: var(--glass-bg);
          backdrop-filter: var(--glass-blur);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: var(--glass-shadow);
        }

        .back-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.2s;
        }

        .back-btn:hover {
          color: var(--accent-primary);
        }
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
