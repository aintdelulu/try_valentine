"use client";

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import styles from './AudioToggle.module.css';

const AudioToggle = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio('/assets/Ikaw at ako.mp3');
        audioRef.current.loop = true;

        // Attempt to autoplay the music
        audioRef.current.play().catch(err => {
            console.log("Autoplay blocked by browser", err);
            // If autoplay is blocked, update state to reflect actual playing status
            setIsPlaying(false);
        });

        return () => {
            audioRef.current?.pause();
            audioRef.current = null;
        };
    }, []);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(err => {
                console.log("Audio play blocked", err);
                // Handle browsers that block autoplay with sound
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <button className={styles.toggle} onClick={toggleAudio} title={isPlaying ? "Mute" : "Unmute"}>
            {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
    );
};

export default AudioToggle;
