"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import styles from './page.module.css';

const JourneyPage = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <div ref={containerRef} className={styles.container}>
            <Chapter1 />
            <Chapter2 />
            <Chapter3 />
            <Chapter5 />
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

const Chapter5 = () => {
    const [activeVideo, setActiveVideo] = useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const videos = [
        { id: 0, src: "/assets/vid1.MOV", title: "Midnight Memories" },
        { id: 1, src: "/assets/vid2.MOV", title: "Captured Joy" },
        { id: 2, src: "/assets/vid3.MOV", title: "Our Future" },
    ];

    return (
        <section ref={ref} className={styles.section}>
            <motion.div style={{ scale, opacity }} className={styles.videoGallery}>
                <h2 className={styles.chapterTitle}>Captured in Motion</h2>

                <div className={styles.mainVideoContainer}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeVideo}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.5 }}
                            className={styles.videoFrame}
                        >
                            <video
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="auto"
                                className={styles.journeyVideo}
                            >
                                <source src={videos[activeVideo].src} type="video/mp4" />
                            </video>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className={styles.videoPicker}>
                    {videos.map((vid) => (
                        <motion.div
                            key={vid.id}
                            className={`${styles.videoThumb} ${activeVideo === vid.id ? styles.activeThumb : ''}`}
                            onClick={() => setActiveVideo(vid.id)}
                            whileHover={{ scale: 1.1, zIndex: 10 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <div className={styles.thumbOverlay}>
                                <span>{vid.title}</span>
                            </div>
                            <video muted className={styles.thumbPreview}>
                                <source src={vid.src} type="video/mp4" />
                            </video>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default JourneyPage;
