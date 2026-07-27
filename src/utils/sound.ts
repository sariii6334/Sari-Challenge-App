// Web Audio API Synthesizer & Vibration Manager for 100% Offline Audio

class SoundManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private vibrationEnabled: boolean = true;

  constructor() {
    // AudioContext lazily initialized on first user interaction
  }

  private bgMusicInterval: ReturnType<typeof setInterval> | null = null;
  private bgMusicStep: number = 0;

  public updateSettings(sound: boolean, vibration: boolean) {
    this.soundEnabled = sound;
    this.vibrationEnabled = vibration;
    if (!sound) {
      this.stopBackgroundMusic();
    }
  }

  public startBackgroundMusic(tempoMs: number = 260) {
    if (!this.soundEnabled) return;
    this.stopBackgroundMusic();
    this.initCtx();

    // Rhythmic playful pentatonic melody sequence
    const notes = [
      { freq: 261.63, bass: 130.81 }, // C4, C3
      { freq: 329.63, bass: 130.81 }, // E4
      { freq: 392.00, bass: 196.00 }, // G4, G3
      { freq: 523.25, bass: 196.00 }, // C5
      { freq: 440.00, bass: 174.61 }, // A4, F3
      { freq: 349.23, bass: 174.61 }, // F4
      { freq: 392.00, bass: 196.00 }, // G4, G3
      { freq: 293.66, bass: 146.83 }, // D4, D3
    ];

    this.bgMusicStep = 0;
    this.bgMusicInterval = setInterval(() => {
      if (!this.soundEnabled || !this.ctx) {
        this.stopBackgroundMusic();
        return;
      }
      const note = notes[this.bgMusicStep % notes.length];
      this.playSoftNote(note.freq, 0.15, 'sine', 0.035);
      if (this.bgMusicStep % 2 === 0) {
        this.playSoftNote(note.bass, 0.2, 'triangle', 0.04);
      }
      this.bgMusicStep++;
    }, tempoMs);
  }

  public stopBackgroundMusic() {
    if (this.bgMusicInterval) {
      clearInterval(this.bgMusicInterval);
      this.bgMusicInterval = null;
    }
  }

  public playSoftNote(freq: number, duration: number = 0.15, type: OscillatorType = 'sine', volume: number = 0.05) {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(volume, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio error
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playClick() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      console.warn('Audio play error:', e);
    }
  }

  public playTone(freq: number, duration: number = 0.15, type: OscillatorType = 'sine') {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Tone error:', e);
    }
  }

  public playTick() {
    this.playTone(800, 0.04, 'triangle');
  }

  public playWin() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.25, 'sine');
      }, idx * 120);
    });

    this.vibrate([100, 50, 100, 50, 200]);
  }

  public playLose() {
    if (!this.soundEnabled) return;
    this.initCtx();
    if (!this.ctx) return;

    const notes = [400, 350, 300, 220];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 0.2, 'sawtooth');
      }, idx * 150);
    });

    this.vibrate([200, 100, 300]);
  }

  public playSuccess() {
    this.playTone(880, 0.12, 'sine');
    this.vibrate([40]);
  }

  public playError() {
    this.playTone(180, 0.25, 'square');
    this.vibrate([100, 50, 100]);
  }

  public vibrate(pattern: number | number[] = 50) {
    if (!this.vibrationEnabled) return;
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Ignore if unsupported
      }
    }
  }
}

export const soundManager = new SoundManager();
