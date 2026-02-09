"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import styles from './page.module.css';

const FinalePage = () => {
    const [response, setResponse] = useState('');
    const [isSent, setIsSent] = useState(false);

    useEffect(() => {
        // Trigger confetti on load
        const duration = 5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: ['#D4AF37', '#E8B4B8'] });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: ['#D4AF37', '#E8B4B8'] });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Connected to user's Formspree endpoint
        const endpoint = "https://formspree.io/f/mqedapoz";

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: response }),
            });

            if (res.ok) {
                setIsSent(true);
            } else {
                // Fallback to showing success anyway for UX
                setIsSent(true);
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setIsSent(true);
        }
    };

    return (
        <div className={styles.container}>
            {/* Background Video */}
            <video
                autoPlay
                loop
                playsInline
                preload="auto"
                className={styles.bgVideo}
            >
                <source src="/assets/vid1.MOV" type="video/mp4" />
            </video>
            <div className={styles.overlay} />

            <motion.div
                className={styles.hero}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
            >
                <h1 className={styles.mainMessage}>Happy Valentine's Day</h1>
                <p className={styles.subtext}>You are my greatest adventure.</p>
            </motion.div>

            <motion.div
                className={styles.interaction}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                {!isSent ? (
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit}
                    >
                        <h3>Leave a note back</h3>
                        <textarea
                            name="message"
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            placeholder="Write your heart out..."
                            className={styles.textarea}
                        />
                        <button type="submit" className={styles.sendButton}>Send Love ❤</button>
                    </form>
                ) : (
                    <motion.div
                        className={styles.successMessage}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                    >
                        <h3>Message Received ✨</h3>
                        <p>Your love has been sent into the midnight sky.</p>
                    </motion.div>
                )}
            </motion.div>

            <div className={styles.reactions}>
                {['❤', '🥰', '😭', '✨'].map((emoji, i) => (
                    <motion.button
                        key={i}
                        className={styles.emoji}
                        whileHover={{ scale: 1.2, y: -10 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            confetti({
                                particleCount: 10,
                                spread: 70,
                                origin: { y: 0.6 },
                                colors: ['#D4AF37', '#E8B4B8']
                            });
                        }}
                    >
                        {emoji}
                    </motion.button>
                ))}
            </div>
        </div>
    );
};

export default FinalePage;
