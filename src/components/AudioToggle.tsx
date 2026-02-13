"use client";

import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import styles from './AudioToggle.module.css';

// Singleton audio instance - created only once and persists across all navigations
let audioInstance: HTMLAudioElement | null = null;

const getAudioInstance = () => {
    if (!audioInstance) {
        audioInstance = new Audio('/assets/Ikaw at ako.mp3');
        audioInstance.loop = true;
    }
    return audioInstance;
};

const AudioToggle = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Get the singleton instance instead of creating a new one
        audioRef.current = getAudioInstance();

        // Attempt to autoplay only if not already playing
        if (audioRef.current.paused) {
            audioRef.current.play().catch(err => {
                console.log("Autoplay blocked by browser", err);
                // If autoplay is blocked, update state to reflect actual playing status
                setIsPlaying(false);
            });
        } else {
            // If already playing (from previous navigation), sync the state
            setIsPlaying(true);
        }

        // Don't cleanup the audio on unmount - let it persist across navigations
        return () => {
            // audioRef.current is intentionally NOT paused/destroyed here
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
