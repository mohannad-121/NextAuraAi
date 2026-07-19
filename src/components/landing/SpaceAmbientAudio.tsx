import { Volume2, VolumeX } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { homepageContent } from "@/i18n/homepageContent";
import { useLanguage } from "@/i18n/translations";

const AMBIENT_AUDIO_SRC = "/audio/space-ambience.mp3";
const AUDIO_PREFERENCE_KEY = "nextaura-space-audio-enabled";
const AMBIENT_VOLUME = 0.18;
const FADE_IN_DURATION_MS = 2_000;
const FADE_OUT_DURATION_MS = 600;

type AudioPreference = boolean | null;

function saveAudioPreference(value: boolean) {
  try {
    window.localStorage.setItem(AUDIO_PREFERENCE_KEY, String(value));
  } catch {
    // Audio remains usable when storage is unavailable or blocked.
  }
}

export function SpaceAmbientAudio() {
  const { language } = useLanguage();
  const copy = homepageContent[language].ambientAudio;
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeFrameRef = useRef<number | null>(null);
  const playRequestRef = useRef<Promise<void> | null>(null);
  const mountedRef = useRef(false);
  const [preference, setPreference] = useState<AudioPreference>(null);
  const [preferenceLoaded, setPreferenceLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const cancelFade = useCallback(() => {
    if (fadeFrameRef.current !== null) {
      window.cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = null;
    }
  }, []);

  const fadeVolume = useCallback(
    (targetVolume: number, duration: number, onComplete?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;

      cancelFade();
      const initialVolume = audio.volume;
      const startedAt = window.performance.now();

      const updateVolume = (now: number) => {
        if (!mountedRef.current) return;

        const progress = Math.min((now - startedAt) / duration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        audio.volume = initialVolume + (targetVolume - initialVolume) * easedProgress;

        if (progress < 1) {
          fadeFrameRef.current = window.requestAnimationFrame(updateVolume);
          return;
        }

        fadeFrameRef.current = null;
        onComplete?.();
      };

      fadeFrameRef.current = window.requestAnimationFrame(updateVolume);
    },
    [cancelFade],
  );

  const startAudio = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || playRequestRef.current) return;

    cancelFade();
    audio.muted = false;
    audio.volume = 0;

    const playRequest = audio.play();
    playRequestRef.current = playRequest;

    try {
      await playRequest;
      if (!mountedRef.current) return;

      setPreference(true);
      setIsPlaying(true);
      saveAudioPreference(true);
      fadeVolume(AMBIENT_VOLUME, FADE_IN_DURATION_MS);
    } catch {
      // Keep listening for a later user gesture when playback is browser-blocked.
    } finally {
      playRequestRef.current = null;
    }
  }, [cancelFade, fadeVolume]);

  const muteAudio = useCallback(() => {
    const audio = audioRef.current;
    setPreference(false);
    saveAudioPreference(false);

    if (!audio || audio.paused) {
      setIsPlaying(false);
      return;
    }

    fadeVolume(0, FADE_OUT_DURATION_MS, () => {
      audio.pause();
      audio.muted = true;
      setIsPlaying(false);
    });
  }, [fadeVolume]);

  useEffect(() => {
    mountedRef.current = true;
    const audio = audioRef.current;

    try {
      const storedPreference = window.localStorage.getItem(AUDIO_PREFERENCE_KEY);
      setPreference(
        storedPreference === "true" ? true : storedPreference === "false" ? false : null,
      );
    } catch {
      setPreference(null);
    }

    if (audio) {
      audio.volume = AMBIENT_VOLUME;
    }

    setPreferenceLoaded(true);

    return () => {
      mountedRef.current = false;
      cancelFade();
      audio?.pause();
    };
  }, [cancelFade]);

  useEffect(() => {
    if (!preferenceLoaded || preference === false || isPlaying) return;

    const beginAfterInteraction = (event: PointerEvent | KeyboardEvent) => {
      if (event instanceof KeyboardEvent && event.repeat) return;
      if (event.target instanceof Element && event.target.closest("[data-ambient-toggle]")) return;
      void startAudio();
    };

    window.addEventListener("pointerdown", beginAfterInteraction, { passive: true });
    window.addEventListener("keydown", beginAfterInteraction);

    return () => {
      window.removeEventListener("pointerdown", beginAfterInteraction);
      window.removeEventListener("keydown", beginAfterInteraction);
    };
  }, [isPlaying, preference, preferenceLoaded, startAudio]);

  const buttonLabel = isPlaying ? copy.mute : preference === false ? copy.unmute : copy.enable;

  return (
    <>
      <audio
        ref={audioRef}
        src={AMBIENT_AUDIO_SRC}
        loop
        preload="none"
        aria-hidden="true"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <button
        type="button"
        data-ambient-toggle
        aria-label={buttonLabel}
        aria-pressed={isPlaying}
        title={buttonLabel}
        onClick={() => {
          if (isPlaying) {
            muteAudio();
            return;
          }

          setPreference(true);
          saveAudioPreference(true);
          void startAudio();
        }}
        className="fixed end-4 top-[5.75rem] z-[60] inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-[#081326]/82 text-slate-100 shadow-[0_12px_32px_rgb(0_0_0_/_0.3)] backdrop-blur-md transition-colors duration-200 hover:border-cyan-300/55 hover:bg-[#10213a] hover:text-cyan-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030817] sm:end-5 sm:top-[6.5rem]"
      >
        {isPlaying ? (
          <Volume2 className="size-[1.15rem]" aria-hidden="true" />
        ) : (
          <VolumeX className="size-[1.15rem]" aria-hidden="true" />
        )}
      </button>
    </>
  );
}
