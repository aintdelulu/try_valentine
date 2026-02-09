"use client";

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import styles from './AudioToggle.module.css';

const AudioToggle = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // We'll use a placeholder lo-fi track or let the user provide one
        audioRef.current = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audioRef.current.loop = true;

        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, []);

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play().catch(err => console.log("Audio play blocked", err));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button className={styles.toggle} onClick={toggleAudio}>
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
    );
};

export default AudioToggle;
