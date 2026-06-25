import React, { useState } from 'react';
import { Skill } from '../types/Skill';
import Greeting from './Greeting';
import SkillCard from './SkillCard';
import LogSessionModal from './LogSessionModal';
import AddSkillModal from './AddSkillModal';

interface LeftPanelProps {
    name: string;
    skills: Skill[];
    onDeleteAll?: () => void;
    onDeleteSkill?: (skillName: string) => void;
    onLogSession: (session: any) => void;
    onAddSkill: (skill: any) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
    name,
    skills,
    onDeleteAll,
    onDeleteSkill,
    onLogSession,
    onAddSkill
}) => {
    const [isLogModalOpen, setIsLogModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const todayCount = skills.filter(skill =>
        skill.sessions.some(s => {
            const today = new Date();
            const sessionDate = new Date(s.date);
            return sessionDate.toDateString() === today.toDateString();
        })
    ).length;

    const mostPracticed = skills.length > 0
        ? skills.reduce((a, b) => a.sessions.length > b.sessions.length ? a : b)
        : null;

    return (
        <div className="h-full bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-1.5">
                    <span className="text-xl font-bold text-slate-800 flex items-center gap-1.5">
                        <span className="bg-blue-600 text-white text-sm px-2 py-0.5 rounded-md">Q</span> questup
                    </span>
                    <span className="text-[10px] font-medium text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-full">beta</span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setIsLogModalOpen(true)}
                        className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1.5 rounded-lg transition flex items-center gap-1"
                    >
                        <i className="fas fa-pen text-[10px]"></i>
                        <span className="hidden sm:inline">Log</span>
                    </button>

                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="text-xs font-medium text-green-600 hover:text-green-700 hover:bg-green-50 px-2 py-1.5 rounded-lg transition flex items-center gap-1"
                    >
                        <i className="fas fa-plus text-[10px]"></i>
                        <span className="hidden sm:inline">Add</span>
                    </button>

                    {skills.length > 0 && onDeleteAll && (
                        <button
                            onClick={onDeleteAll}
                            className="text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1.5 rounded-lg transition flex items-center gap-1"
                            title="Delete all skills (sessions stay)"
                        >
                            <i className="fas fa-trash-alt text-[10px]"></i>
                        </button>
                    )}
                </div>
            </div>

            <Greeting name={name} todayCount={todayCount} />

            <div className="space-y-3 mt-4">
                {skills.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-sm">
                        <i className="fas fa-inbox text-3xl block mb-2 text-slate-300"></i>
                        No skills added yet
                    </div>
                ) : (
                    skills.map((skill) => (
                        <SkillCard
                            key={skill.id}
                            skill={skill}
                            isPrimary={skill.id === mostPracticed?.id && skill.sessions.length > 0}
                            onDelete={onDeleteSkill}
                        />
                    ))
                )}
            </div>

            <LogSessionModal
                isOpen={isLogModalOpen}
                onClose={() => setIsLogModalOpen(false)}
                skills={skills}
                onLogSession={onLogSession}
            />

            <AddSkillModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddSkill={onAddSkill}
            />
        </div>
    );
};

export default LeftPanel;