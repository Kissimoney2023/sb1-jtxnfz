import React from 'react';
import { Play, Pause, RotateCcw, Volume2 } from 'lucide-react';
import { useAudioPlayback } from '../hooks/useAudioPlayback';

interface AudioControlsProps {
  text: string;
}

export function AudioControls({ text }: AudioControlsProps) {
  const { isPlaying, isLoading, error, play, pause, stop } = useAudioPlayback();

  const handlePlayPause = async () => {
    if (isLoading) return;
    if (isPlaying) {
      pause();
    } else {
      await play(text);
    }
  };

  if (error) {
    return (
      <div className="text-red-500 text-sm mt-2 bg-red-50 p-3 rounded-lg">
        {error.message}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handlePlayPause}
        disabled={isLoading}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          isPlaying 
            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
            : 'bg-blue-600 text-white hover:bg-blue-700'
        } transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : isPlaying ? (
          <>
            <Pause size={20} />
            <span>Pause</span>
          </>
        ) : (
          <>
            <Play size={20} />
            <span>Listen</span>
          </>
        )}
      </button>

      {isPlaying && (
        <button
          onClick={stop}
          className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Stop"
        >
          <RotateCcw size={20} />
        </button>
      )}

      <Volume2 className="w-5 h-5 text-gray-400 ml-2" />
    </div>
  );
}