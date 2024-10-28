import { AudioError, ApiKeyError } from './errors';

export class AudioService {
  private static instance: AudioService;
  private audio: HTMLAudioElement | null = null;
  private voiceId = 'pNInz6obpgDQGcFmaJgB';
  private apiKey: string;

  private constructor() {
    const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
    
    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim() === '') {
      throw new ApiKeyError('ElevenLabs API key is not configured. Please check your environment variables.');
    }

    this.apiKey = apiKey;
    this.audio = new Audio();
    this.audio.preload = 'auto';
  }

  public static getInstance(): AudioService {
    if (!AudioService.instance) {
      AudioService.instance = new AudioService();
    }
    return AudioService.instance;
  }

  public async generateSpeech(text: string): Promise<void> {
    if (!text || text.trim() === '') {
      throw new AudioError('Text cannot be empty', 400);
    }

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${this.voiceId}`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': this.apiKey
        },
        body: JSON.stringify({
          text: text.trim(),
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new AudioError(
          errorData.detail || `Failed to generate speech: ${response.statusText}`,
          response.status
        );
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      if (this.audio) {
        this.stop();
        this.audio.src = audioUrl;
        await this.audio.load();
        try {
          await this.audio.play();
        } catch (error) {
          console.error('Playback error:', error);
          throw new AudioError('Failed to play audio', 500);
        }
      }
    } catch (error) {
      console.error('Speech generation error:', error);
      if (error instanceof ApiKeyError) {
        throw error;
      }
      throw new AudioError(
        error instanceof Error ? error.message : 'Failed to generate speech',
        error instanceof AudioError ? error.statusCode : 500
      );
    }
  }

  public pause(): void {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
  }

  public resume(): void {
    if (this.audio && this.audio.paused && this.audio.src) {
      this.audio.play().catch(error => {
        console.error('Failed to resume audio:', error);
      });
    }
  }

  public stop(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      if (this.audio.src) {
        URL.revokeObjectURL(this.audio.src);
        this.audio.removeAttribute('src');
      }
    }
  }

  public setOnEnded(callback: () => void): void {
    if (this.audio) {
      this.audio.onended = callback;
    }
  }

  public isPlaying(): boolean {
    return this.audio ? !this.audio.paused : false;
  }

  public cleanup(): void {
    this.stop();
    if (this.audio) {
      this.audio.onended = null;
      this.audio = null;
    }
    AudioService.instance = null as any;
  }
}