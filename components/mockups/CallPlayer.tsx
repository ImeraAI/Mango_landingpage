'use client';

import * as React from 'react';
import { Play, Pause } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Waveform } from './Waveform';

/**
 * Tap-to-play recording of a real call handled by Mango.
 *
 * The whole panel is a single <button>: one accessible name, one focus ring,
 * native Space/Enter, and no nested-interactive hazard.
 *
 * `preload="none"` means nothing is fetched until the visitor presses play.
 * The consequence is that a missing file cannot be detected at render time —
 * the button looks fine on load and only reports the problem after the first
 * press. That is deliberate: probing the file on mount would defeat the point.
 */
function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function CallPlayer({
  src = '/audio/demo-call.mp4',
  className,
}: {
  src?: string;
  className?: string;
}) {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [duration, setDuration] = React.useState<number | null>(null);
  const [failed, setFailed] = React.useState(false);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      return;
    }
    // Chrome rejects this promise on a 404; Safari sometimes only fires the
    // element's error event. Handle both so the state is never stuck.
    audio.play().catch(() => {
      setFailed(true);
      setPlaying(false);
    });
  }

  const status = failed
    ? 'Recording coming soon'
    : playing
      ? 'Playing…'
      : 'Tap to play';

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={failed}
      aria-label={
        failed
          ? 'Call recording unavailable'
          : playing
            ? 'Pause the recorded call'
            : 'Play a recorded call handled by Mango'
      }
      className={cn(
        'group relative flex w-full max-w-[240px] shrink-0 flex-col rounded-2xl border border-slate-200/70 bg-slate-50/80 p-4 text-left transition-all duration-200',
        'hover:border-brand-200 hover:bg-white hover:shadow-card',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:border-slate-200/70 disabled:hover:bg-slate-50/80 disabled:hover:shadow-none',
        className
      )}
    >
      <div className="mb-3 flex items-center justify-between text-2xs font-medium uppercase tracking-wide text-slate-400">
        Real call
        <span className="tabular-nums">
          {duration ? formatTime(duration) : '—:—'}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm transition-transform duration-200 group-hover:scale-105 group-active:scale-95 group-disabled:bg-slate-300"
        >
          {playing ? (
            <Pause className="h-4 w-4 fill-current" />
          ) : (
            <Play className="h-4 w-4 translate-x-px fill-current" />
          )}
        </span>
        {/* bars animate only while audio is actually playing */}
        <Waveform className="h-9 flex-1" bars={16} active={playing} />
      </div>

      <div
        aria-hidden
        className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-slate-200"
      >
        <div
          className="h-full rounded-full bg-brand-500 transition-[width] duration-150 ease-linear"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div
        aria-live="polite"
        className="mt-3 text-xs font-medium text-slate-600"
      >
        {status}
      </div>

      <audio
        ref={audioRef}
        src={src}
        preload="none"
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration;
          if (Number.isFinite(d)) setDuration(d);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
        onError={() => {
          setFailed(true);
          setPlaying(false);
        }}
        onTimeUpdate={(e) => {
          const el = e.currentTarget;
          if (el.duration) setProgress(el.currentTime / el.duration);
        }}
      />
    </button>
  );
}
