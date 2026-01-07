import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Typewriter = ({ text, delay = 0, speed = 50 }) => {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    useEffect(() => {
        let timeoutId;
        let intervalId;

        // Reset text initially
        setDisplayText('');
        setIsTyping(true);

        timeoutId = setTimeout(() => {
            let currentIndex = 0;

            intervalId = setInterval(() => {
                currentIndex++;
                setDisplayText(text.substring(0, currentIndex));

                if (currentIndex >= text.length) {
                    clearInterval(intervalId);
                    setIsTyping(false);
                }
            }, speed);
        }, delay * 1000);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, [text, delay, speed]);

    return (
        <span style={{ position: 'relative', display: 'inline-block' }}>
            {displayText}
            {isTyping && (
                <motion.span
                    style={{
                        position: 'absolute',
                        display: 'inline-block',
                        width: '2px',
                        height: '1.2em',
                        background: 'var(--accent-primary)',
                        marginLeft: '4px',
                        verticalAlign: 'middle',
                    }}
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                />
            )}
        </span>
    );
};

export default Typewriter;
