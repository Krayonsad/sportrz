// src/hooks/useGameTimer.ts
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

const GLOBAL_TIMER_KEY = 'sportrz_global_trial_timer';

export function useGameTimer(isSubscribed: boolean, isAdmin: boolean = false): GameTimerState {
  // If user is admin, they're treated as having unlimited time
  const effectivelySubscribed = isSubscribed || isAdmin;
  
  const [timeLeft, setTimeLeft] = useState(TRIAL_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [totalTimeUsed, setTotalTimeUsed] = useState(0);
  const [isTrialExpired, setIsTrialExpired] = useState(false);

  // Load saved timer state - global now, no gameId
  useEffect(() => {
    // Admin bypass: If admin, always set trial as not expired
    if (effectivelySubscribed) {
      setIsTrialExpired(false);
      return;
    }

    const savedData = localStorage.getItem(GLOBAL_TIMER_KEY);
    if (savedData) {
      try {
        const { timeUsed, lastPlayed, checksum } = JSON.parse(savedData);

        const expectedChecksum = btoa(timeUsed.toString() + 'sportrz_security');
        if (checksum !== expectedChecksum) {
          localStorage.removeItem(GLOBAL_TIMER_KEY);
          resetTimerState();
          return;
        }

        const now = Date.now();
        const timeSinceLastPlayed = now - lastPlayed;

        if (timeSinceLastPlayed > 24 * 60 * 60 * 1000) {
          localStorage.removeItem(GLOBAL_TIMER_KEY);
          resetTimerState();
        } else {
          const remainingTime = Math.max(0, TRIAL_DURATION - timeUsed);
          setTimeLeft(remainingTime);
          setTotalTimeUsed(timeUsed);
          setIsTrialExpired(remainingTime <= 0);
        }
      } catch (e) {
        console.error('Error loading timer data:', e);
        resetTimerState();
      }
    } else {
      resetTimerState();
    }
  }, [effectivelySubscribed]);

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    // Admin bypass: Don't start countdown if admin
    if (isActive && timeLeft > 0 && !effectivelySubscribed) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          const newTotalUsed = TRIAL_DURATION - newTime;

          const saveData = {
            timeUsed: newTotalUsed,
            lastPlayed: Date.now(),
            checksum: btoa(newTotalUsed.toString() + 'sportrz_security'),
          };

          localStorage.setItem(GLOBAL_TIMER_KEY, JSON.stringify(saveData));

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
  }, [isActive, timeLeft, effectivelySubscribed]);

  const resetTimerState = () => {
    setTimeLeft(TRIAL_DURATION);
    setTotalTimeUsed(0);
    setIsTrialExpired(false);
    setIsActive(false);
  };

  const startTimer = useCallback(() => {
    // Admin bypass: Don't start timer for admins
    if (!effectivelySubscribed && !isTrialExpired) {
      setIsActive(true);
    }
  }, [effectivelySubscribed, isTrialExpired]);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    resetTimerState();
    localStorage.removeItem(GLOBAL_TIMER_KEY);
  }, []);

  const formatTime = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  // Admin bypass: If admin, always return max time and not expired
  if (isAdmin) {
    return {
      timeLeft: TRIAL_DURATION,
      totalTimeUsed: 0,
      isTrialExpired: false,
      startTimer,
      pauseTimer,
      resetTimer,
      formatTime,
    };
  }

  return {
    timeLeft,
    totalTimeUsed,
    isTrialExpired,
    startTimer,
    pauseTimer,
    resetTimer,
    formatTime,
  };
}