import React, { useState } from 'react';
import { Skill, Session } from '../types/Skill';

interface LogSessionModalProps {
    isOpen: boolean;
    onClose: () => void;
    skills: Skill[];
    onLogSession: (session: Omit<Session, 'id' | 'date' | 'dateLabel'>) => void;
}

const LogSessionModal: React.FC<LogSessionModalProps> = ({
    isOpen,
    onClose,
    skills,
    onLogSession
}) => {
    const [selectedSkill, setSelectedSkill] = useState('');
    const [duration, setDuration] = useState<number>(30);
    const [note, setNote] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSkill) return;

        onLogSession({
            skillName: selectedSkill,
            duration,
            note: note || `Practiced ${selectedSkill}`,
        });

        setSelectedSkill('');
        setDuration(30);
        setNote('');
        onClose();
    };

    const durationOptions = [15, 30, 45, 60, 90, 120];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">Log Session</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1">Skill</label>
                        <select
                            value={selectedSkill}
                            onChange={(e) => setSelectedSkill(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            required
                        >
                            <option value="">Select a skill</option>
                            {skills.map((skill) => (
                                <option key={skill.id} value={skill.name}>
                                    {skill.name} ({skill.hours.toFixed(1)}h)
                                </option>
                            ))}
                        </select>
                        {skills.length === 0 && (
                            <p className="text-xs text-slate-400 mt-1">Add a skill first!</p>
                        )}
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1">Duration (minutes)</label>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                        >
                            {durationOptions.map((d) => (
                                <option key={d} value={d}>
                                    {d} min {d >= 60 ? `(${d / 60}h)` : ''}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1">Note (optional)</label>
                        <input
                            type="text"
                            placeholder="What did you practice?"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={skills.length === 0}
                            className={`flex-1 px-4 py-2 rounded-lg transition ${skills.length === 0
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                        >
                            Log Session
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LogSessionModal;