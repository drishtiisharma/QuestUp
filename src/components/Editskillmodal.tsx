import React, { useState, useEffect } from 'react';
import type { Skill } from '../types/Skill';

interface EditSkillModalProps {
    isOpen: boolean;
    onClose: () => void;
    skill: Skill | null;
    onSave: (updated: Skill) => void;
}

const EditSkillModal: React.FC<EditSkillModalProps> = ({ isOpen, onClose, skill, onSave }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#3b6cb7');
    const [weeklyGoal, setWeeklyGoal] = useState(5);

    useEffect(() => {
        if (skill) {
            setName(skill.name);
            setColor(skill.color);
            setWeeklyGoal(skill.weeklyGoal ?? 5);
        }
    }, [skill]);

    if (!isOpen || !skill) return null;

    const handleSave = () => {
        if (!name.trim()) return;
        onSave({ ...skill, name: name.trim(), color, weeklyGoal });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm mx-4">
                <h3 className="text-base font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-pen text-blue-500 text-sm"></i> Edit Skill
                </h3>

                <div className="space-y-3">
                    <div>
                        <label className="text-xs font-medium text-slate-500 mb-1 block">Skill name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-500 mb-1 block">Weekly goal (hours)</label>
                        <input
                            type="number"
                            min={0.5}
                            step={0.5}
                            value={weeklyGoal}
                            onChange={e => setWeeklyGoal(parseFloat(e.target.value))}
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-slate-500 mb-1 block">Color</label>
                        <div className="flex items-center gap-2">
                            <input
                                type="color"
                                value={color}
                                onChange={e => setColor(e.target.value)}
                                className="h-9 w-12 cursor-pointer border border-slate-200 rounded-lg"
                            />
                            <span className="text-xs text-slate-400">{color}</span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 mt-5">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditSkillModal;