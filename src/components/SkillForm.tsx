import React, { useState } from 'react';
import type { Skill } from '../types/Skill';

interface SkillFormProps {
    onAddSkill: (skill: Omit<Skill, 'sessions'>) => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ onAddSkill }) => {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#3b6cb7');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim()) return;
        onAddSkill({
            name,
            hours: 0,
            streak: 0,
            progress: 0,
            color
        });
        setName('');
        setColor('#3b6cb7');
    };

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <i className="fas fa-plus-circle text-blue-500"></i> Add New Skill
            </h4>
            <form onSubmit={handleSubmit} className="flex gap-3">
                <input
                    type="text"
                    placeholder="Skill name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-10 w-12 cursor-pointer border border-slate-200 rounded-lg"
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition whitespace-nowrap"
                >
                    Add Skill
                </button>
            </form>
        </div>
    );
};

export default SkillForm;