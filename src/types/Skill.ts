// Skills tracked by user
export interface Skill {
    id: string;
    name: string;
    hours: number;
    streak: number;
    progress: number;
    weeklyGoal: number;
    color: string;
    sessions: Session[];
}

// Single session
export interface Session {
    id: string;
    skillName: string;
    duration: number;
    note: string;
    date: Date;
    dateLabel: string;
}

// Single day in Activity Heatmap
export interface HeatmapDay {
    date: Date;
    totalMinutes: number;
    sessions: Session[];
    skillNames: string[];
}

// Navbar Stats
export interface HeatmapStats {
    currentStreak: number;
    longestStreak: number;
    totalHours: number;
    activeDays: number;
    totalSessions: number;
    bestDay: {
        date: Date;
        minutes: number;
    } | null;
}