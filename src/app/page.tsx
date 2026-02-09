"use client";

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

const HomePage = () => {
  const router = useRouter();

  const handleOpenHeart = () => {
    router.push('/envelope');
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, filter: 'blur(10px)' }}
        animate={{ opacity: 1, filter: 'blur(0px)' }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      >
        <h1 className={styles.title}>Ethereal Midnight</h1>
        <p className={styles.subtitle}>A Journey of the Heart</p>

        <motion.button
          className={styles.ctaButton}
          onClick={handleOpenHeart}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(212, 175, 55, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          Open Your Heart
          <div className={styles.glow} />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default HomePage;
