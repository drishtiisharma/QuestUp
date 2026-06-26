import React, { useState, useMemo } from 'react';
import { Session, HeatmapDay } from '../types/Skill';

interface ActivityHeatmapProps {
    sessions: Session[];
}

const ActivityHeatmap: React.FC<ActivityHeatmapProps> = ({ sessions }) => {
    const [hoveredDay, setHoveredDay] = useState<HeatmapDay | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

    const heatmapData = useMemo(() => {
        const data: HeatmapDay[] = [];
        const today = new Date();
        const oneYearAgo = new Date(today);
        oneYearAgo.setDate(oneYearAgo.getDate() - 364);


        const startDate = new Date(oneYearAgo);
        const dayOfWeek = startDate.getDay();

        startDate.setDate(startDate.getDate() - dayOfWeek);

        const sessionMap = new Map<string, Session[]>();
        sessions.forEach(session => {
            const dateKey = new Date(session.date).toDateString();
            if (!sessionMap.has(dateKey)) {
                sessionMap.set(dateKey, []);
            }
            sessionMap.get(dateKey)!.push(session);
        });


        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateKey = d.toDateString();
            const daySessions = sessionMap.get(dateKey) || [];
            const totalMinutes = daySessions.reduce((sum, s) => sum + s.duration, 0);
            const skillNames = [...new Set(daySessions.map(s => s.skillName))];

            data.push({
                date: new Date(d),
                totalMinutes,
                sessions: daySessions,
                skillNames,
            });
        }
        return data;
    }, [sessions]);


    const stats = useMemo(() => {
        let currentStreak = 0;
        let longestStreak = 0;
        let streak = 0;
        let activeDays = 0;
        let totalMinutes = 0;
        let bestDay: { date: Date; minutes: number } | null = null as { date: Date; minutes: number } | null;

        const todayNorm = new Date();
        todayNorm.setHours(0, 0, 0, 0);

        for (let i = 0; i < heatmapData.length; i++) {
            const day = heatmapData[heatmapData.length - 1 - i];
            const dayDate = new Date(day.date);
            dayDate.setHours(0, 0, 0, 0);
            const diffDays = Math.floor((todayNorm.getTime() - dayDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays < 0) continue;
            if (diffDays === currentStreak && day.totalMinutes > 0) {
                currentStreak++;
            } else if (diffDays === currentStreak && day.totalMinutes === 0) {
                break;
            }
        }


        heatmapData.forEach(day => {
            if (day.totalMinutes > 0) {
                streak++;
                activeDays++;
                totalMinutes += day.totalMinutes;

                if (!bestDay || day.totalMinutes > bestDay.minutes) {
                    bestDay = { date: day.date, minutes: day.totalMinutes };
                }
            } else {
                if (streak > longestStreak) {
                    longestStreak = streak;
                }
                streak = 0;
            }
        });

        if (streak > longestStreak) {
            longestStreak = streak;
        }

        return {
            currentStreak,
            longestStreak,
            totalHours: totalMinutes / 60,
            activeDays,
            totalSessions: sessions.length,
            bestDay: bestDay || null,
        };
    }, [heatmapData, sessions]);

    const getColorIntensity = (minutes: number) => {
        if (minutes === 0) return 'bg-slate-100';
        if (minutes < 15) return 'bg-blue-200';
        if (minutes < 30) return 'bg-blue-400';
        if (minutes < 60) return 'bg-blue-600';
        if (minutes < 120) return 'bg-blue-700';
        return 'bg-blue-800';
    };

    const getTooltipContent = (day: HeatmapDay) => {
        if (day.totalMinutes === 0) {
            return {
                date: day.date.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                }),
                minutes: 0,
                sessions: 0,
                skills: ['No activity']
            };
        }
        return {
            date: day.date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }),
            minutes: day.totalMinutes,
            sessions: day.sessions.length,
            skills: day.skillNames,
        };
    };


    const weeks: HeatmapDay[][] = [];
    for (let i = 0; i < heatmapData.length; i += 7) {
        weeks.push(heatmapData.slice(i, i + 7));
    }

    const monthLabels: { month: string; index: number }[] = [];
    let lastMonth = -1;
    heatmapData.forEach((day, index) => {
        const month = day.date.getMonth();
        if (month !== lastMonth) {
            monthLabels.push({ month: day.date.toLocaleString('default', { month: 'short' }), index });
            lastMonth = month;
        }
    });

    const achievements = useMemo(() => {
        const badges: { icon: string; label: string }[] = [];
        if (stats.totalHours >= 10) badges.push({ icon: '🌟', label: '10+ Hours' });
        if (stats.totalHours >= 50) badges.push({ icon: '⭐', label: '50+ Hours' });
        if (stats.totalHours >= 100) badges.push({ icon: '🏆', label: '100+ Hours' });
        if (stats.currentStreak >= 7) badges.push({ icon: '🔥', label: '7-Day Streak' });
        if (stats.currentStreak >= 30) badges.push({ icon: '⚡', label: '30-Day Streak' });
        if (stats.activeDays >= 30) badges.push({ icon: '📅', label: '30 Active Days' });
        if (stats.activeDays >= 100) badges.push({ icon: '🎯', label: '100 Active Days' });
        if (stats.totalSessions >= 50) badges.push({ icon: '💪', label: '50 Sessions' });
        if (stats.totalSessions >= 100) badges.push({ icon: '🚀', label: '100 Sessions' });
        return badges;
    }, [stats]);

    return (
        <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-1.5">
                        <span className="text-lg">🔥</span>
                        <div>
                            <p className="text-xs text-slate-500">Current Streak</p>
                            <p className="text-lg font-bold text-slate-800">{stats.currentStreak} days</p>
                        </div>
                    </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-1.5">
                        <span className="text-lg">🏆</span>
                        <div>
                            <p className="text-xs text-slate-500">Longest Streak</p>
                            <p className="text-lg font-bold text-slate-800">{stats.longestStreak} days</p>
                        </div>
                    </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-1.5">
                        <span className="text-lg">📊</span>
                        <div>
                            <p className="text-xs text-slate-500">Active Days</p>
                            <p className="text-lg font-bold text-slate-800">{stats.activeDays}</p>
                        </div>
                    </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50">
                    <div className="flex items-center gap-1.5">
                        <span className="text-lg">📚</span>
                        <div>
                            <p className="text-xs text-slate-500">Total Study</p>
                            <p className="text-lg font-bold text-slate-800">{stats.totalHours.toFixed(1)}h</p>
                        </div>
                    </div>
                </div>
            </div>

            {achievements.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {achievements.map((badge, i) => (
                        <span key={i} className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700">
                            {badge.icon} {badge.label}
                        </span>
                    ))}
                </div>
            )}

            <div className="relative">
                {/* Month Labels */}
                <div className="flex ml-6 mb-1">
                    {monthLabels.map(({ month, index }) => (
                        <span
                            key={month + index}
                            className="text-[10px] text-slate-500 flex-1"
                            style={{ marginLeft: index === 0 ? 0 : 'auto' }}
                        >
                            {month}
                        </span>
                    ))}
                </div>

                <div className="flex gap-0.5">
                    {/* Day labels */}
                    <div className="flex flex-col gap-0.5 mr-1">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, i) => (
                            <span key={day} className="text-[8px] text-slate-400 h-3 flex items-center justify-end pr-1">
                                {day}
                            </span>
                        ))}
                    </div>

                    {/* Heatmap grid */}
                    <div className="flex-1 overflow-x-auto">
                        <div className="flex gap-0.5 min-w-[600px]">
                            {weeks.map((week, weekIndex) => (
                                <div key={weekIndex} className="flex flex-col gap-0.5">
                                    {week.map((day, dayIndex) => {
                                        const isToday = new Date().toDateString() === day.date.toDateString();
                                        const minutes = day.totalMinutes;

                                        return (
                                            <div
                                                key={dayIndex}
                                                className={`w-3 h-3 rounded-sm ${getColorIntensity(minutes)} relative cursor-pointer transition-transform hover:scale-110 ${isToday ? 'ring-2 ring-blue-500 ring-offset-1' : ''
                                                    }`}
                                                onMouseEnter={(e) => {
                                                    setHoveredDay(day);
                                                    const rect = e.currentTarget.getBoundingClientRect();
                                                    setTooltipPosition({
                                                        x: rect.left + rect.width / 2,
                                                        y: rect.top - 10
                                                    });
                                                }}
                                                onMouseLeave={() => setHoveredDay(null)}
                                            />
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tooltip */}
                {hoveredDay && hoveredDay.totalMinutes > 0 && (
                    <div
                        className="fixed z-50 pointer-events-none p-3 rounded-lg shadow-lg max-w-xs transition-opacity bg-white text-slate-800 border border-slate-200"
                        style={{
                            left: tooltipPosition.x,
                            top: tooltipPosition.y - 10,
                            transform: 'translate(-50%, -100%)',
                        }}
                    >
                        <p className="text-xs font-semibold text-slate-600">{getTooltipContent(hoveredDay).date}</p>
                        <p className="text-sm font-bold text-blue-600">
                            {getTooltipContent(hoveredDay).minutes} min
                        </p>
                        {getTooltipContent(hoveredDay).sessions > 0 && (
                            <>
                                <p className="text-xs text-slate-500 mt-1">
                                    {getTooltipContent(hoveredDay).sessions} session{getTooltipContent(hoveredDay).sessions > 1 ? 's' : ''}
                                </p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {getTooltipContent(hoveredDay).skills.map((skill, i) => (
                                        <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-medium">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span>Less</span>
                    <div className="flex gap-0.5">
                        <div className="w-3 h-3 rounded-sm bg-slate-100"></div>
                        <div className="w-3 h-3 rounded-sm bg-blue-200"></div>
                        <div className="w-3 h-3 rounded-sm bg-blue-400"></div>
                        <div className="w-3 h-3 rounded-sm bg-blue-600"></div>
                        <div className="w-3 h-3 rounded-sm bg-blue-800"></div>
                    </div>
                    <span>More</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span>🔥 {stats.currentStreak}d streak</span>
                    <span>⭐ {stats.totalSessions} sessions</span>
                </div>
            </div>

            {/* Personal Best Highlight */}
            {stats.bestDay && stats.bestDay.minutes > 0 && (
                <div className="mt-3 p-2 rounded-lg text-center bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                    <p className="text-xs text-slate-600 font-medium">
                        🏅 Personal Best: {stats.bestDay.minutes} minutes on {stats.bestDay.date.toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ActivityHeatmap;