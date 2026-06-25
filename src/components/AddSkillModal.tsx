import React, { useState } from 'react';
import type { Skill } from '../types/Skill';

interface AddSkillModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddSkill: (skill: Omit<Skill, 'id' | 'sessions'>) => void;
}

const AddSkillModal: React.FC<AddSkillModalProps> = ({ isOpen, onClose, onAddSkill }) => {
    const [name, setName] = useState('');
    const [weeklyGoal, setWeeklyGoal] = useState<number>(5);
    const [color, setColor] = useState('#3b6cb7');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAddSkill({
            name,
            hours: 0,
            streak: 0,
            progress: 0,
            weeklyGoal,
            color
        });
        setName('');
        setWeeklyGoal(5);
        setColor('#3b6cb7');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">Add New Skill</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1">Skill Name</label>
                        <input
                            type="text"
                            placeholder="JavaScript"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1">Weekly Goal (hours)</label>
                        <input
                            type="number"
                            min="1"
                            max="40"
                            step="0.5"
                            value={weeklyGoal}
                            onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-slate-700 block mb-1">Color</label>
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-full h-12 cursor-pointer border border-slate-200 rounded-lg"
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
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Add Skill
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddSkillModal;