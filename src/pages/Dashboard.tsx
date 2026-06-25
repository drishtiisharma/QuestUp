import React, { useState, useEffect } from 'react';
import { Skill, Session } from '../types/Skill';
import LeftPanel from '../components/LeftPanel';
import ActivityHeatmap from '../components/ActivityHeatmap';
import RecentSessions from '../components/RecentSessions';

const Dashboard: React.FC = () => {
    const loadData = () => {
        const saved = localStorage.getItem('questup_data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                parsed.sessions = parsed.sessions.map((s: any) => ({
                    ...s,
                    date: new Date(s.date)
                }));
                parsed.skills = parsed.skills.map((s: any) => ({
                    ...s,
                    sessions: s.sessions.map((sess: any) => ({
                        ...sess,
                        date: new Date(sess.date)
                    }))
                }));
                return parsed;
            } catch (e) {
                console.error('Error loading data:', e);
            }
        }
        return { skills: [], sessions: [] };
    };

    const [skills, setSkills] = useState<Skill[]>([]);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const data = loadData();
        setSkills(data.skills);
        setSessions(data.sessions);
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('questup_data', JSON.stringify({ skills, sessions }));
        }
    }, [skills, sessions, isLoaded]);

    const handleAddSkill = (newSkill: Omit<Skill, 'id' | 'sessions'>) => {
        const skillWithId: Skill = {
            ...newSkill,
            id: Date.now().toString(),
            sessions: [],
        };
        setSkills([...skills, skillWithId]);
    };

    const handleLogSession = (sessionData: Omit<Session, 'id' | 'date' | 'dateLabel'>) => {
        const now = new Date();
        const newSession: Session = {
            ...sessionData,
            id: Date.now().toString(),
            date: now,
            dateLabel: now.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            }),
        };

        setSessions([...sessions, newSession]);

        setSkills(prevSkills =>
            prevSkills.map(skill =>
                skill.name === sessionData.skillName
                    ? { ...skill, sessions: [...skill.sessions, newSession] }
                    : skill
            )
        );
    };

    const handleDeleteAllSkills = () => {
        if (window.confirm('Delete all skills? (Sessions will be kept)')) {
            setSkills([]);
        }
    };

    const handleClearAllSessions = () => {
        if (window.confirm('Clear all sessions?')) {
            setSessions([]);
            setSkills(prevSkills =>
                prevSkills.map(skill => ({ ...skill, sessions: [] }))
            );
        }
    };

    const handleDeleteSkill = (skillName: string) => {
        if (window.confirm(`Delete "${skillName}"?`)) {
            setSkills(skills.filter(s => s.name !== skillName));
            setSessions(sessions.filter(s => s.skillName !== skillName));
        }
    };

    const updatedSkills = skills.map(skill => {
        const skillSessions = sessions.filter(s => s.skillName === skill.name);
        const totalHours = skillSessions.reduce((acc, s) => acc + (s.duration / 60), 0);

        let streak = 0;
        const sortedDates = skillSessions
            .map(s => new Date(s.date))
            .sort((a, b) => b.getTime() - a.getTime());

        if (sortedDates.length > 0) {
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            for (let i = 0; i < sortedDates.length; i++) {
                const sessionDate = new Date(sortedDates[i]);
                sessionDate.setHours(0, 0, 0, 0);
                const diffDays = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
                if (diffDays === i) {
                    streak++;
                } else {
                    break;
                }
            }
        }

        const progress = Math.min((totalHours / skill.weeklyGoal) * 100, 100);

        return {
            ...skill,
            hours: totalHours,
            streak: streak,
            progress: progress,
            sessions: skillSessions,
        };
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/80 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    <div className="lg:col-span-4">
                        <LeftPanel
                            name="Drishti"
                            skills={updatedSkills}
                            onDeleteAll={handleDeleteAllSkills}
                            onDeleteSkill={handleDeleteSkill}
                            onLogSession={handleLogSession}
                            onAddSkill={handleAddSkill}
                        />
                    </div>

                    <div className="lg:col-span-8 space-y-6">
                        {/* Activity Heatmap - Contains its own stats (streak, active days, etc.) */}
                        <ActivityHeatmap sessions={sessions} />

                        {/* Recent Sessions */}
                        <RecentSessions
                            sessions={sessions}
                            onClearAll={handleClearAllSessions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;