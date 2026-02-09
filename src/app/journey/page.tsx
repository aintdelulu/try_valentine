"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './page.module.css';

const JourneyPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className={styles.container}>
            <Chapter1 />
            <Chapter2 />
            <Chapter3 />
            <Chapter4 />
        </div>
    );
};

const Chapter1 = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

    return (
        <section ref={ref} className={styles.section}>
            <motion.div style={{ y, opacity }} className={styles.glassCard}>
                <h2 className={styles.chapterTitle}>The Day Everything Changed</h2>
                <div className={styles.date}>February 14, 2024</div>
                <p className={styles.storyText}>
                    In the quiet stillness of that winter morning, our paths finally crossed.
                    A simple coffee, a shared laugh, and the world suddenly felt brighter than ever before.
                </p>
                <div className={styles.photoFrame}>
                    <img src="/assets/img1.jpg" alt="The day we met" className={styles.heroImage} />
                </div>
            </motion.div>
        </section>
    );
};

const Chapter2 = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const x = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

    const polaroids = [
        { id: 2, src: "/assets/img2.jpg", caption: "Love looks good on me 💖" },
        { id: 3, src: "/assets/img3.jpg", caption: "Proof that love is real 💍" },
        { id: 4, src: "/assets/img4.jpg", caption: "Cupid understood the assignment 🏹💞" },
        { id: 5, src: "/assets/img5.jpg", caption: "All hearts, no regrets 💘" },
    ];

    return (
        <section ref={ref} className={styles.section}>
            <h2 className={styles.chapterTitle}>Adventures Together</h2>
            <motion.div style={{ x }} className={styles.horizontalGallery}>
                {polaroids.map((p, i) => (
                    <motion.div
                        key={p.id}
                        className={styles.polaroid}
                        whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 3 : -3 }}
                    >
                        <div className={styles.photoContainer}>
                            <img src={p.src} alt={p.caption} className={styles.polaroidImg} />
                        </div>
                        <p className={styles.caption}>{p.caption}</p>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

const Chapter3 = () => {
    const reasons = [
        "Your laugh lights up my world",
        "The way you make coffee",
        "Your endless kindness",
        "How you always listen",
        "Your creative spirit",
        "The way you dream big",
        "Your gentle heart",
        "Your infectious energy"
    ];

    return (
        <section className={styles.section}>
            <h2 className={styles.chapterTitle}>All The Reasons</h2>
            <div className={styles.grid}>
                {reasons.map((reason, i) => (
                    <motion.div
                        key={i}
                        className={styles.noteCard}
                        initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 10 - 5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10, boxShadow: "0 10px 20px rgba(0,0,0,0.3)" }}
                    >
                        <p>{reason}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

const Chapter4 = () => {
    return (
        <section className={styles.section}>
            <div className={styles.countdownWrapper}>
                <h2 className={styles.chapterTitle}>Our Next Chapter Begins In...</h2>
                <div className={styles.timer}>
                    <div className={styles.timeUnit}><span>364</span><small>Days</small></div>
                    <div className={styles.timeUnit}><span>23</span><small>Hrs</small></div>
                    <div className={styles.timeUnit}><span>59</span><small>Mins</small></div>
                    <div className={styles.timeUnit}><span>59</span><small>Secs</small></div>
                </div>
                <motion.button
                    className={styles.finaleButton}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => window.location.href = '/finale'}
                >
                    See The Surprise
                </motion.button>
            </div>
        </section>
    );
};

export default JourneyPage;
