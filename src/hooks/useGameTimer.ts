import { useState, useEffect, useCallback } from 'react';

const TRIAL_DURATION = 1 * 60; // 5 minutes in seconds
const STORAGE_KEY = 'sportrz_game_timer';

interface GameTimerState {
  timeLeft: number;
  isTrialExpired: boolean;
  totalTimeUsed: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  formatTime: (seconds: number) => string;
}

export function useGameTimer(gameId: string, isSubscribed: boolean): GameTimerState {
  const [timeLeft, setTimeLeft] = useState(TRIAL_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [totalTimeUsed, setTotalTimeUsed] = useState(0);
  const [isTrialExpired, setIsTrialExpired] = useState(false);

  // Load saved timer state
  useEffect(() => {
    if (isSubscribed) {
      // If user is subscribed, don't apply timer restrictions
      setIsTrialExpired(false);
      return;
    }

    const savedData = localStorage.getItem(`${STORAGE_KEY}_${gameId}`);
    if (savedData) {
      try {
        const { timeUsed, lastPlayed, checksum } = JSON.parse(savedData);
        
        // Verify checksum to prevent tampering
        const expectedChecksum = btoa(timeUsed.toString() + gameId + 'sportrz_security');
        if (checksum !== expectedChecksum) {
          // Data might be tampered, reset
          localStorage.removeItem(`${STORAGE_KEY}_${gameId}`);
          setTimeLeft(TRIAL_DURATION);
          setTotalTimeUsed(0);
          setIsTrialExpired(false);
          return;
        }
        
        const now = Date.now();
        const timeSinceLastPlayed = now - lastPlayed;
        
        // If more than 24 hours have passed, reset the timer
        if (timeSinceLastPlayed > 24 * 60 * 60 * 1000) {
          setTimeLeft(TRIAL_DURATION);
          setTotalTimeUsed(0);
          setIsTrialExpired(false);
          localStorage.removeItem(`${STORAGE_KEY}_${gameId}`);
        } else {
          const remainingTime = Math.max(0, TRIAL_DURATION - timeUsed);
          setTimeLeft(remainingTime);
          setTotalTimeUsed(timeUsed);
          setIsTrialExpired(remainingTime <= 0);
        }
      } catch (error) {
        console.error('Error loading timer data:', error);
        // Reset on error
        setTimeLeft(TRIAL_DURATION);
        setTotalTimeUsed(0);
        setIsTrialExpired(false);
      }
    }
  }, [gameId, isSubscribed]);

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0 && !isSubscribed) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          const newTotalUsed = TRIAL_DURATION - newTime;
          
          // Save to localStorage with anti-tampering measures
          const saveData = {
            timeUsed: newTotalUsed,
            lastPlayed: Date.now(),
            checksum: btoa(newTotalUsed.toString() + gameId + 'sportrz_security')
          };
          
          localStorage.setItem(`${STORAGE_KEY}_${gameId}`, JSON.stringify(saveData));
          
          if (newTime <= 0) {
            setIsTrialExpired(true);
            setIsActive(false);
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, gameId, isSubscribed]);

  const startTimer = useCallback(() => {
    if (!isSubscribed && !isTrialExpired) {
      setIsActive(true);
    }
  }, [isSubscribed, isTrialExpired]);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(TRIAL_DURATION);
    setTotalTimeUsed(0);
    setIsTrialExpired(false);
    localStorage.removeItem(`${STORAGE_KEY}_${gameId}`);
  }, [gameId]);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  return {
    timeLeft,
    isTrialExpired,
    totalTimeUsed,
    startTimer,
    pauseTimer,
    resetTimer,
    formatTime
  };
}