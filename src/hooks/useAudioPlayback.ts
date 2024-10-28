import { useState, useEffect, useCallback } from 'react';
import { AudioService } from '../services/audio';
import { ApiKeyError, AudioError } from '../services/errors';

export function useAudioPlayback() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let audioService: AudioService | null = null;
    try {
      audioService = AudioService.getInstance();
      audioService.setOnEnded(() => setIsPlaying(false));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize audio service'));
    }

    return () => {
      if (audioService) {
        try {
          audioService.cleanup();
        } catch (err) {
          // Ignore cleanup errors
        }
      }
    };
  }, []);

  const play = useCallback(async (text: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const audioService = AudioService.getInstance();
      await audioService.generateSpeech(text);
      setIsPlaying(true);
    } catch (err) {
      if (err instanceof ApiKeyError || err instanceof AudioError) {
        setError(err);
      } else {
        setError(new Error('Failed to play audio'));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const pause = useCallback(() => {
    try {
      AudioService.getInstance().pause();
      setIsPlaying(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to pause audio'));
    }
  }, []);

  const stop = useCallback(() => {
    try {
      AudioService.getInstance().stop();
      setIsPlaying(false);
      setIsLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to stop audio'));
    }
  }, []);

  return {
    isPlaying,
    isLoading,
    error,
    play,
    pause,
    stop
  };
}