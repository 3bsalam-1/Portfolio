import React, { useEffect, useRef } from 'react';

const NeuralBackground = ({ theme }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let nodes = [];

        // Configuration
        const nodeCount = 35;
        const connectionDistance = 150;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        class Node {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = theme === 'light'
                    ? 'rgba(255, 192, 0, 0.8)' // Increased from 0.6
                    : 'rgba(255, 211, 105, 0.95)'; // Increased opacity
                ctx.fill();
            }
        }

        const initNodes = () => {
            nodes = [];
            for (let i = 0; i < nodeCount; i++) {
                nodes.push(new Node());
            }
        };

        const drawConnections = () => {
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.5;
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = theme === 'light'
                            ? `rgba(255, 192, 0, ${opacity + 0.2})`  // Deep Gold, boosted opacity
                            : `rgba(255, 211, 105, ${opacity + 0.2})`; // Cyber Gold, boosted opacity
                        ctx.lineWidth = 0.8; // Thicker lines
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            nodes.forEach(node => {
                node.update();
                node.draw();
            });

            drawConnections();
            animationFrameId = requestAnimationFrame(animate);
        };

        // Initialize
        resizeCanvas();
        initNodes();
        animate();

        // Event listeners
        window.addEventListener('resize', () => {
            resizeCanvas();
            initNodes();
        });

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    // CSS for background positioning
    const style = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: theme === 'light' ? 0.5 : 0.4, // Increased from 0.3/0.15
        pointerEvents: 'none'
    };

    return <canvas ref={canvasRef} style={style} />;
};

export default NeuralBackground;
