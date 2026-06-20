export type SfxId =
  | "rain"
  | "paper"
  | "phone-vibrate"
  | "monitor-startup"
  | "evidence-connect"
  | "document-open";

export type AmbientLoopId = "rain";

type SoundEntry = {
  src: string | null;
  volume: number;
  loop?: boolean;
};

const SOUND_REGISTRY: Record<SfxId | AmbientLoopId, SoundEntry> = {
  rain: { src: null, volume: 0.25, loop: true },
  paper: { src: null, volume: 0.5 },
  "phone-vibrate": { src: null, volume: 0.4 },
  "monitor-startup": { src: null, volume: 0.6 },
  "evidence-connect": { src: null, volume: 0.55 },
  "document-open": { src: null, volume: 0.45 },
};

export class AudioManager {
  private cache = new Map<string, HTMLAudioElement>();
  private muted = false;
  private ambientLoops = new Map<AmbientLoopId, HTMLAudioElement>();

  register(id: SfxId | AmbientLoopId, src: string) {
    SOUND_REGISTRY[id].src = src;
    this.cache.delete(id);
  }

  setMuted(muted: boolean) {
    this.muted = muted;
    this.ambientLoops.forEach((el) => {
      el.muted = muted;
    });
  }

  private getOrCreate(id: string): HTMLAudioElement | null {
    const entry = SOUND_REGISTRY[id as SfxId];
    if (!entry?.src) return null;
    if (!this.cache.has(id)) {
      const audio = new Audio(entry.src);
      audio.volume = entry.volume;
      audio.loop = Boolean(entry.loop);
      this.cache.set(id, audio);
    }
    return this.cache.get(id) ?? null;
  }

  play(id: SfxId) {
    if (this.muted) return;
    const audio = this.getOrCreate(id);
    if (!audio) return;
    const clone = audio.cloneNode() as HTMLAudioElement;
    clone.volume = SOUND_REGISTRY[id].volume;
    void clone.play().catch(() => {});
  }

  startAmbient(id: AmbientLoopId) {
    if (this.muted) return;
    const audio = this.getOrCreate(id);
    if (!audio) return;
    audio.loop = true;
    this.ambientLoops.set(id, audio);
    void audio.play().catch(() => {});
  }

  stopAmbient(id: AmbientLoopId) {
    const audio = this.ambientLoops.get(id);
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      this.ambientLoops.delete(id);
    }
  }

  preloadAll() {
    Object.keys(SOUND_REGISTRY).forEach((id) => this.getOrCreate(id));
  }
}

export const audioManager = new AudioManager();
