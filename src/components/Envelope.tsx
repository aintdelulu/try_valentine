"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import styles from './Envelope.module.css';

const Envelope = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLetterOnly, setShowLetterOnly] = useState(false);
    const [hasReachedBottom, setHasReachedBottom] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const router = useRouter();

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const reachedBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 50;
        if (reachedBottom && showLetterOnly) {
            setHasReachedBottom(true);
        }
    };

    const handleOpen = () => {
        setIsOpen(true);
        setTimeout(() => {
            setShowLetterOnly(true);
        }, 2000); // Trigger fade after letter slides out
    };

    const handleContinue = () => {
        setIsTransitioning(true);
        setTimeout(() => {
            router.push('/journey');
        }, 1500);
    };

    return (
        <div className={styles.wrapper}>
            <motion.div
                className={`${styles.envelope} ${isOpen ? styles.open : ''} ${showLetterOnly ? styles.showLetterOnly : ''}`}
                initial={{ y: 50, opacity: 0.5 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className={styles.front}>
                    <div className={styles.flap}></div>
                    <div className={styles.body}></div>
                    <motion.div
                        className={styles.seal}
                        onClick={handleOpen}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className={styles.sealInner}>❤</div>
                    </motion.div>
                </div>

                <div className={styles.back} onScroll={handleScroll}>
                    <div className={styles.letterContent}>
                        <h2>Happy Valentine’s Day, Buds!</h2>
                        <p>
                            I may not have chocolates, flowers, or fancy gifts to give, but I hope you know that my love and appreciation for you are real and constant.
                            Thank you for being my safe space, my laughter on hard days, and my strength when I feel low.
                            You mean so much to me, not because of what you give, but because of who you are.
                            I’m grateful for every memory, every joke, every moment we share.
                            Today and always, you have my heart, my support, and my sincerest love. 💕
                        </p>
                        <p>
                            P.S. Scroll all the way down to see where our journey takes us next...
                        </p>
                    </div>
                </div>

                {/* Petals Explosion Effect */}
                <AnimatePresence>
                    {isOpen && (
                        <div className={styles.petalsContainer}>
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className={styles.petal}
                                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                                    animate={{
                                        scale: Math.random() * 1.5 + 0.5,
                                        x: (Math.random() - 0.5) * 600,
                                        y: (Math.random() - 0.5) * 600 - 200,
                                        rotate: Math.random() * 360,
                                        opacity: 0
                                    }}
                                    transition={{ duration: 2, ease: "easeOut" }}
                                />
                            ))}
                        </div>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {showLetterOnly && hasReachedBottom && !isTransitioning && (
                    <motion.button
                        className={styles.continueButton}
                        onClick={handleContinue}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Continue Our Journey →
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Mask Transition Overlay */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        className={styles.mask}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Envelope;
