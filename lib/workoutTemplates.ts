// Lodge — V1 Workout Templates
// These are static for V1 and edited directly in code when schedules change.

export type WorkoutCategory = "run" | "strength" | "sport";
export type WorkoutType = "fixed" | "flexible";

export interface WorkoutTemplate {
  id: string;
  name: string;
  category: WorkoutCategory;
  type: WorkoutType;

  // UI
  color: string;

  // Flexible workouts
  durationMinutes?: number;

  // Fixed-time workouts (run club)
  fixedDayOfWeek?: number; // 0 = Sunday, 6 = Saturday
  fixedStartTime?: string; // "HH:MM" (24h)
  fixedEndTime?: string;   // "HH:MM" (24h)
}

export const workoutTemplates: WorkoutTemplate[] = [
  // =========================
  // RUN CLUB — FIXED TIME
  // =========================
  {
    id: "run-club-speed-5k",
    name: "Speed 5k (Run Club)",
    category: "run",
    type: "fixed",
    fixedDayOfWeek: 2, // Tuesday
    fixedStartTime: "18",
    fixedEndTime: "19:15",
    color: "#2563EB", // blue
  },
  {
    id: "run-club-thursday-5k",
    name: "Thursday Evening 5k (Run Club)",
    category: "run",
    type: "fixed",
    fixedDayOfWeek: 4, // Thursday
    fixedStartTime: "18",
    fixedEndTime: "19:15",
    color: "#2563EB", // blue
  },
  {
    id: "run-club-saturday-long-run-10k",
    name: "Saturday Morning Long Run 10k (Run Club)",
    category: "run",
    type: "fixed",
    fixedDayOfWeek: 6, // Saturday
    fixedStartTime: "08:45",
    fixedEndTime: "10:30",
    color: "#2563EB", // blue
  },
  {
    id: "run-club-sunday-5k",
    name: "Sunday Morning 5k (Run Club)",
    category: "run",
    type: "fixed",
    fixedDayOfWeek: 0, // Sunday
    fixedStartTime: "08:45",
    fixedEndTime: "10:00",
    color: "#2563EB", // blue
  },

  // =========================
  // STRENGTH & CORE — FLEXIBLE
  // =========================
  {
    id: "strength-push-day",
    name: "Strength – Push Day",
    category: "strength",
    type: "flexible",
    durationMinutes: 120,
    color: "#F97316", // orange
  },
  {
    id: "strength-pull-day",
    name: "Strength – Pull Day",
    category: "strength",
    type: "flexible",
    durationMinutes: 120,
    color: "#F97316", // orange
  },
  {
    id: "strength-leg-day",
    name: "Strength – Leg Day",
    category: "strength",
    type: "flexible",
    durationMinutes: 120,
    color: "#F97316", // orange
  },
  {
    id: "core-exercises",
    name: "Core Exercises",
    category: "strength",
    type: "flexible",
    durationMinutes: 30,
    color: "#A855F7", // purple
  },

  // =========================
  // SOLO RUNS — FLEXIBLE
  // =========================
  {
    id: "solo-run-1-mile",
    name: "Solo 1 Mile Run",
    category: "run",
    type: "flexible",
    durationMinutes: 15,
    color: "#14B8A6", // teal
  },
  {
    id: "solo-run-2-mile",
    name: "Solo 2 Mile Run",
    category: "run",
    type: "flexible",
    durationMinutes: 30,
    color: "#14B8A6", // teal

  },
  {
    id: "solo-run-5k",
    name: "Solo 5k Run",
    category: "run",
    type: "flexible",
    durationMinutes: 45,
    color: "#14B8A6", // teal
  },

  // =========================
  // SPORTS — FLEXIBLE
  // =========================
  {
    id: "pickleball",
    name: "Pickleball",
    category: "sport",
    type: "flexible",
    durationMinutes: 60,
    color: "#22C55E", // green
  },
];
