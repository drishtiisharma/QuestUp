import React, { useState } from 'react';
import { Skill, Session } from '../types/Skill';

interface LogSessionProps {
    skills: Skill[];
    onLogSession: (session: Omit<Session, 'id' | 'date' | 'dateLabel'>) => void;
}

const LogSession: React.FC<LogSessionProps> = ({ skills, onLogSession }) => {
    const [selectedSkill, setSelectedSkill] = useState('');
    const [duration, setDuration] = useState<number>(30);
    const [note, setNote] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedSkill) return;

        onLogSession({
            skillName: selectedSkill,
            duration,
            note: note || 'Practiced ' + selectedSkill,
        });

        setSelectedSkill('');
        setDuration(30);
        setNote('');
    };

    const durationOptions = [15, 30, 45, 60, 90, 120];

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <i className="fas fa-pen text-blue-500 text-xs"></i> Log Session
            </h4>
            <form onSubmit={handleSubmit} className="space-y-3">
                {/* Skill Dropdown */}
                <div>
                    <label className="text-xs text-slate-500 block mb-1">Skill</label>
                    <select
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                        required
                    >
                        <option value="">Select a skill</option>
                        {skills.map((skill) => (
                            <option key={skill.name} value={skill.name}>
                                {skill.name} ({skill.hours}h)
                            </option>
                        ))}
                    </select>
                    {skills.length === 0 && (
                        <p className="text-[10px] text-slate-400 mt-1">Add a skill first!</p>
                    )}
                </div>

                {/* Duration Dropdown */}
                <div>
                    <label className="text-xs text-slate-500 block mb-1">Duration (minutes)</label>
                    <select
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                    >
                        {durationOptions.map((d) => (
                            <option key={d} value={d}>
                                {d} min {d >= 60 ? `(${d / 60}h)` : ''}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Note Input */}
                <div>
                    <label className="text-xs text-slate-500 block mb-1">Note (optional)</label>
                    <input
                        type="text"
                        placeholder="What did you practice?"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <button
                    type="submit"
                    disabled={skills.length === 0}
                    className={`w-full py-2 text-sm font-medium rounded-lg transition ${skills.length === 0
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                >
                    <i className="fas fa-plus mr-1.5"></i> Log Session
                </button>
            </form>
        </div>
    );
};

export default LogSession;