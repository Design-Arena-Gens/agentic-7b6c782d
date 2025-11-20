"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Lightbulb,
  Palette,
  Pause,
  PenTool,
  Play,
  Sparkles,
  Waves,
} from "lucide-react";

type MoodBoard = {
  id: string;
  title: string;
  gradient: string;
  narrative: string;
  keywords: string[];
  energy: string;
};

type Concept = {
  id: string;
  codename: string;
  elevatorPitch: string;
  anchors: string[];
  palette: string[];
  runway: string;
};

type Milestone = {
  time: string;
  label: string;
  owner: string;
  highlight: string;
};

type Signal = {
  team: string;
  focus: string;
  status: string;
  tone: string;
};

type Soundscape = {
  id: string;
  title: string;
  length: string;
  energy: string;
  waveform: string;
};

const moodBoards: MoodBoard[] = [
  {
    id: "neon-bloom",
    title: "Neon Bloom Reverie",
    gradient: "from-[#3f27ff] via-[#ff4fa8] to-[#ffd166]",
    narrative:
      "A midnight greenhouse flooded with ultraviolet ink, suspended florals, and liquid typography that breathes with the score.",
    keywords: ["sci-fi botanics", "fluid neon", "immersive typography"],
    energy: "Vibrant kinetic",
  },
  {
    id: "silver-waves",
    title: "Silver Waves Collective",
    gradient: "from-[#0f172a] via-[#1f2937] to-[#64748b]",
    narrative:
      "Liquid metal surfaces reflecting choreographed drones, framed by monolithic serif title cards over drifting fog.",
    keywords: ["liquid reflections", "monoliths", "ceremonial pacing"],
    energy: "Low frequency tension",
  },
  {
    id: "aurora-veil",
    title: "Aurora Veil Runway",
    gradient: "from-[#1a1aff] via-[#4ff1ff] to-[#38ef7d]",
    narrative:
      "An arctic soundstage with refracted light columns, translucent choreo capes, and a 3D printed ice throne finale.",
    keywords: ["refracted light", "ritual choreography", "glacial couture"],
    energy: "Electric serenity",
  },
];

const conceptDeck: Concept[] = [
  {
    id: "chromatic-uprising",
    codename: "Chromatic Uprising",
    elevatorPitch:
      "Transform the launch film into a color storm that awakens the brand core, using motion-triggered gradients that respond to choreography.",
    anchors: ["Immersive LED corridor", "Gesture-reactive type", "Slow-burn hero reveal"],
    palette: ["#F72585", "#4CC9F0", "#480CA8", "#4C1D95"],
    runway: "Final mix & spatial grade lock on Thursday",
  },
  {
    id: "noir-haiku",
    codename: "Noir Haiku",
    elevatorPitch:
      "Build a poetic micro-series of 9-second vignettes, each pairing whispered lines with bold negative space and liquid chrome overlays.",
    anchors: ["Split-diopter shots", "Chrome calligraphy", "Shadow choreography"],
    palette: ["#0F0F10", "#1F2933", "#94A3B8", "#F8FAFC"],
    runway: "In-camera tests complete, editorial prototypes due tomorrow",
  },
  {
    id: "solar-atelier",
    codename: "Solar Atelier",
    elevatorPitch:
      "Merge artisanal craftsmanship with future-forward tech through a rotating orb set-piece casting programmable murals across couture silhouettes.",
    anchors: ["Sun dial stage rig", "Holographic tailoring", "Analog-to-digital transitions"],
    palette: ["#FDB813", "#FF6F61", "#2E2A68", "#0B1026"],
    runway: "Set design lock pending, lighting previs reviews tonight",
  },
];

const dailyMilestones: Milestone[] = [
  {
    time: "08:30",
    label: "Creative standup",
    owner: "Maya (CD)",
    highlight: "Align hero treatment + soundscape mapping",
  },
  {
    time: "11:00",
    label: "Storyboard sync",
    owner: "Akira (VFX)",
    highlight: "Approve volumetric lighting passes",
  },
  {
    time: "14:15",
    label: "Wardrobe alignment",
    owner: "Leah (Styling)",
    highlight: "Lock iridescent fabric transitions",
  },
  {
    time: "17:45",
    label: "Executive playback",
    owner: "Julian (EP)",
    highlight: "Deliver Chromatic Uprising draft cut",
  },
];

const teamSignals: Signal[] = [
  {
    team: "Design",
    focus: "Hero motion rig + UI overlays",
    status: "In progress · 78%",
    tone: "bg-emerald-400/10 text-emerald-200 border-emerald-400/30",
  },
  {
    team: "Cinematography",
    focus: "Lens tests · drone choreography",
    status: "On deck · 45%",
    tone: "bg-sky-400/10 text-sky-200 border-sky-400/30",
  },
  {
    team: "Sound",
    focus: "Spatial mix iteration 02",
    status: "In session · due 22:00",
    tone: "bg-rose-400/10 text-rose-200 border-rose-400/30",
  },
  {
    team: "Experience",
    focus: "Interactive lobby cues",
    status: "Prototype live · gather feedback",
    tone: "bg-amber-400/10 text-amber-100 border-amber-400/30",
  },
];

const soundscapes: Soundscape[] = [
  {
    id: "pulse",
    title: "Chromatic Pulse",
    length: "42m",
    energy: "Intense focus",
    waveform: "from-rose-500/40 via-purple-400/40 to-sky-400/40",
  },
  {
    id: "ambient",
    title: "Midnight Atelier",
    length: "33m",
    energy: "Deep work",
    waveform: "from-sky-500/40 via-slate-300/40 to-indigo-400/40",
  },
  {
    id: "ritual",
    title: "Glacial Ritual",
    length: "26m",
    energy: "Concept sculpting",
    waveform: "from-emerald-500/40 via-cyan-300/40 to-blue-500/40",
  },
];

export default function Home() {
  const [activeMood, setActiveMood] = useState<string>(moodBoards[0]?.id ?? "");
  const [activeConcept, setActiveConcept] = useState<string>(conceptDeck[0]?.id ?? "");
  const [now, setNow] = useState(() => new Date());
  const [nowPlaying, setNowPlaying] = useState<string | null>(soundscapes[0]?.id ?? null);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 1000 * 60);
    return () => window.clearInterval(interval);
  }, []);

  const selectedMood = useMemo(
    () => moodBoards.find((board) => board.id === activeMood) ?? moodBoards[0],
    [activeMood],
  );

  const selectedConcept = useMemo(
    () => conceptDeck.find((concept) => concept.id === activeConcept) ?? conceptDeck[0],
    [activeConcept],
  );

  const formattedTime = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }).format(now),
    [now],
  );

  const formattedDate = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }).format(now),
    [now],
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,108,244,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(45,212,191,0.08),_transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[360px] w-[380px] rounded-full bg-sky-500/20 blur-[140px]" />
      </div>

      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-12 px-6 py-14 md:px-10 lg:px-14">
        <header className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-lg md:p-12">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-transparent" />
          <div className="relative flex flex-wrap items-start justify-between gap-8">
            <div className="max-w-xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-sm text-white/80 shadow-sm shadow-purple-500/10 backdrop-blur">
                <Sparkles className="h-4 w-4 text-violet-200" />
                Live project orchestration
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl lg:text-6xl">
                Creative Director&apos;s Room
              </h1>
              <p className="text-lg text-slate-200/90 md:text-xl">
                An immersive control center blending storyboards, mood-scapes, sound, and team
                signals. Every element in orbit around the launch moment.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-slate-200/80">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <CalendarDays className="h-4 w-4 text-sky-200" />
                  {formattedDate} · {formattedTime}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <Waves className="h-4 w-4 text-emerald-200" />
                  Stage: Pre-visualization sprint
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <Lightbulb className="h-4 w-4 text-amber-200" />
                  North star: Awe + intimacy
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-black/40 p-6 text-sm text-slate-200/90 shadow-xl shadow-indigo-500/20">
              <span className="text-xs uppercase tracking-[0.24em] text-white/60">
                Quick pulse
              </span>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Launch window</span>
                  <span className="font-medium text-white">+9 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Storyboard lock</span>
                  <span className="font-medium text-white">88%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Soundscape fit</span>
                  <span className="font-medium text-white">Iteration 02</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Exec sentiment</span>
                  <span className="font-medium text-emerald-300">Elevated</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <article className="col-span-1 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur lg:col-span-7">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Mood board orbit</h2>
                <p className="text-sm text-slate-300/80">
                  Tap a universe to surface the guiding energy and cinematic triggers.
                </p>
              </div>
              <Palette className="hidden h-10 w-10 text-violet-200/80 lg:block" />
            </div>

            <div className="flex flex-wrap gap-3">
              {moodBoards.map((board) => (
                <button
                  key={board.id}
                  onClick={() => setActiveMood(board.id)}
                  className={`rounded-full border px-4 py-2 text-sm transition-all ${
                    activeMood === board.id
                      ? "border-white/30 bg-white/10 text-white shadow shadow-purple-500/20"
                      : "border-white/10 bg-black/30 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {board.title}
                </button>
              ))}
            </div>

            <div
              className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br ${selectedMood.gradient} p-[1px]`}
            >
              <div className="relative h-full w-full rounded-[22px] bg-black/70 p-8">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                  <div className="flex-1 space-y-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/80">
                      Primary energy
                    </span>
                    <p className="text-lg leading-relaxed text-slate-100/90">
                      {selectedMood.narrative}
                    </p>
                  </div>
                  <div className="w-full max-w-xs space-y-4 rounded-2xl border border-white/20 bg-black/40 p-6">
                    <div>
                      <span className="text-xs uppercase tracking-[0.22em] text-white/50">
                        Keywords
                      </span>
                      <ul className="mt-2 space-y-1 text-sm text-white/80">
                        {selectedMood.keywords.map((keyword) => (
                          <li key={keyword} className="leading-tight">
                            • {keyword}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-100">
                      Energy signature:{" "}
                      <span className="font-medium text-white">{selectedMood.energy}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-[22px] border border-white/10" />
            </div>
          </article>

          <aside className="col-span-1 flex flex-col gap-6 rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur md:flex-row lg:col-span-5 lg:flex-col">
            <div className="w-full flex-1 space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Sound control</h2>
                <Sparkles className="h-5 w-5 text-amber-200" />
              </div>
              <div className="space-y-4">
                {soundscapes.map((sound) => {
                  const isActive = nowPlaying === sound.id;
                  return (
                    <button
                      key={sound.id}
                      onClick={() => setNowPlaying((prev) => (prev === sound.id ? null : sound.id))}
                      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border px-4 py-4 text-left transition ${
                        isActive
                          ? "border-white/30 bg-white/10 shadow-lg shadow-purple-500/20"
                          : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-white">{sound.title}</span>
                        <span className="text-xs text-slate-300/80">
                          {sound.energy} · {sound.length}
                        </span>
                      </div>
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${
                          isActive
                            ? "border-white/80 bg-white/20 text-white"
                            : "border-white/20 bg-black/40 text-white/70 group-hover:border-white/50 group-hover:text-white"
                        }`}
                      >
                        {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </span>
                      <span
                        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r ${sound.waveform}`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="w-full rounded-2xl border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">
                Signal
              </h3>
              <p className="mt-3 text-sm text-slate-200/80">
                Keep the chromatic crescendo alive. Monitor team velocity and surface blocks before
                tonight&apos;s executive playback.
              </p>
              <div className="mt-5 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.22em] text-white/50">
                <span className="rounded-full border border-white/10 px-3 py-1">Momentum</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Story</span>
                <span className="rounded-full border border-white/10 px-3 py-1">Resonance</span>
              </div>
            </div>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <article className="col-span-1 flex flex-col gap-6 rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur lg:col-span-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-white">Concept deck</h2>
                <p className="text-sm text-slate-300/80">
                  Activate a treatment to view anchors, runway, and palette direction.
                </p>
              </div>
              <PenTool className="h-8 w-8 text-emerald-200/80" />
            </div>
            <div className="flex flex-wrap gap-3">
              {conceptDeck.map((concept) => (
                <button
                  key={concept.id}
                  onClick={() => setActiveConcept(concept.id)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                    activeConcept === concept.id
                      ? "border-white/30 bg-white/10 text-white shadow shadow-emerald-500/20"
                      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <span className="block text-xs uppercase tracking-[0.3em] text-white/60">
                    Treatment
                  </span>
                  <span className="block text-base font-semibold text-white/90">
                    {concept.codename}
                  </span>
                </button>
              ))}
            </div>
            <div className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.04] p-7 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <p className="text-lg font-medium text-white/90">{selectedConcept.elevatorPitch}</p>
                <div className="mt-4 space-y-3">
                  {selectedConcept.anchors.map((anchor) => (
                    <div
                      key={anchor}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-slate-100/90"
                    >
                      <ArrowUpRight className="h-4 w-4 text-white/70" />
                      {anchor}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-5 rounded-xl border border-white/10 bg-black/40 p-5 lg:col-span-5">
                <div>
                  <span className="text-xs uppercase tracking-[0.3em] text-white/50">Palette</span>
                  <div className="mt-3 flex gap-2">
                    {selectedConcept.palette.map((swatch) => (
                      <span
                        key={swatch}
                        className="h-10 flex-1 rounded-full border border-white/20"
                        style={{ backgroundColor: swatch }}
                        title={swatch}
                      />
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                  Runway:{" "}
                  <span className="font-semibold text-white">{selectedConcept.runway}</span>
                </div>
              </div>
            </div>
          </article>

          <aside className="col-span-1 flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur lg:col-span-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Team signals</h2>
              <Lightbulb className="h-6 w-6 text-amber-200" />
            </div>
            <div className="space-y-4">
              {teamSignals.map((signal) => (
                <div
                  key={signal.team}
                  className={`rounded-2xl border px-5 py-4 text-sm ${signal.tone}`}
                >
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.32em]">
                    <span>{signal.team}</span>
                    <span>{signal.status}</span>
                  </div>
                  <p className="mt-2 text-base font-medium text-white/90">{signal.focus}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="grid grid-cols-1 gap-8 rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur lg:grid-cols-12">
          <div className="space-y-4 border-white/10 pb-6 lg:col-span-4 lg:border-r lg:pr-8">
            <h2 className="text-2xl font-semibold text-white">Mission control</h2>
            <p className="text-sm text-slate-300/80">
              Today&apos;s trajectory: orchestrate alignment before the executive playback, ensure
              each discipline reflects the chromatic crescendo.
            </p>
            <div className="space-y-3 text-sm text-slate-200/80">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-sky-200" />
                Show open animatics due by 19:00
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-pink-200" />
                Wardrobe hero look test stage 3 complete
              </div>
              <div className="flex items-center gap-2">
                <Waves className="h-4 w-4 text-emerald-200" />
                Spatial mix iteration ready for feedback loop
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 lg:pl-8">
            <div className="flex flex-col gap-4">
              {dailyMilestones.map((milestone) => (
                <div
                  key={milestone.time}
                  className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-white/80 md:flex-row md:items-center md:justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-black/40 text-base font-semibold text-white">
                      {milestone.time}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-white">{milestone.label}</p>
                      <p className="text-xs uppercase tracking-[0.28em] text-white/40">
                        {milestone.owner}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-200/90">{milestone.highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
