export interface CameraWaypoint {
  p: [number, number, number]; // Position
  t: [number, number, number]; // Look-at target
  fov: number;
}

export interface ChapterDef {
  id: string;
  key: "home" | "services" | "projects" | "team" | "benefits" | "reviews" | "contact";
  accent: string;
  waypointIndex: number;
}

export const CINEMATIC_WAYPOINTS: CameraWaypoint[] = [
  // 0: A quiet emergence with space around the hero copy.
  { p: [0.0, 2.4, 14.2], t: [0.0, 1.0, -10.0], fov: 42 },
  // 1: A lateral move as the field separates into layers.
  { p: [-3.6, 1.2, 9.6], t: [1.4, 0.6, -8.0], fov: 46 },
  // 2: A closer, more dimensional view of the material.
  { p: [3.4, 1.9, 4.8], t: [-1.6, 0.8, -12.0], fov: 44 },
  // 3: A calmer, elevated view for the team chapter.
  { p: [-1.6, 2.4, 0.4], t: [0.6, 1.4, -14.0], fov: 40 },
  // 4: Space opens around the distant field.
  { p: [2.0, 1.5, -4.2], t: [-0.8, 1.0, -18.0], fov: 45 },
  // 5: A quiet atmospheric drift for reviews.
  { p: [-1.2, 2.8, -8.6], t: [0.2, 1.8, -22.0], fov: 42 },
  // 6: The field converges for the closing chapter.
  { p: [0.0, 1.6, -13.0], t: [0.0, 1.2, -28.0], fov: 48 },
];

export const CINEMATIC_CHAPTERS: ChapterDef[] = [
  { id: "home", key: "home", accent: "#38bdf8", waypointIndex: 0 },
  { id: "services", key: "services", accent: "#8b5cf6", waypointIndex: 1 },
  { id: "projects", key: "projects", accent: "#0ea5e9", waypointIndex: 2 },
  { id: "team", key: "team", accent: "#a855f7", waypointIndex: 3 },
  { id: "why-choose", key: "benefits", accent: "#38bdf8", waypointIndex: 4 },
  { id: "reviews", key: "reviews", accent: "#818cf8", waypointIndex: 5 },
  { id: "contact", key: "contact", accent: "#38bdf8", waypointIndex: 6 },
];

export const CINEMATIC_PERFORMANCE = {
  maxDpr: 1.75,
  mobileDpr: 1.25,
  targetFps: 60,
  lerpSpeed: 0.075,
  pointerStrength: 0.45,
} as const;
