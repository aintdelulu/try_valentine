"use client";

import Envelope from '@/components/Envelope';
import styles from './page.module.css';

export default function EnvelopePage() {
    return (
        <div className={styles.container}>
            <Envelope />
        </div>
    );
}
