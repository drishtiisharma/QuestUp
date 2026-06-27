import React, { useState } from 'react';
import { Skill } from '../types/Skill';
import Greeting from './Greeting';
import SkillCard from './SkillCard';
import LogSessionModal from './LogSessionModal';
import AddSkillModal from './AddSkillModal';
import EditSkillModal from './Editskillmodal';

interface LeftPanelProps {
    name: string;
    skills: Skill[];
    onDeleteAll?: () => void;
    onDeleteSkill?: (skillName: string) => void;
    onLogSession: (session: any) => void;
    onAddSkill: (skill: any) => void;
    onEditSkill?: (updated: Skill) => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
    name,
    skills,
    onDeleteAll,
    onDeleteSkill,
    onLogSession,
    onAddSkill,
    onEditSkill,
}) => {
    const [isLogModalOpen, setIsLogModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

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
                        <span className="bg-blue-600 text-white text-sm px-2 py-0.5 rounded-md">Q</span> QuestUp
                    </span>
                </div>

                <div className="flex items-center gap-1">

                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="text-xs font-medium text-white text-green-600 bg-green-600 hover:text-green-700 hover:bg-green-100 px-2 py-1.5 rounded-lg transition flex items-center gap-1"
                    >
                        <i className="fas fa-plus text-[12px]"></i>
                        <span className="hidden sm:inline">Add Skill</span>
                    </button>

                    <button
                        onClick={() => setIsLogModalOpen(true)}
                        className="text-xs font-medium text-white bg-blue-600 hover:text-blue-700 hover:bg-blue-100 px-2 py-1.5 rounded-lg transition flex items-center gap-1"
                    >
                        <i className="fas fa-pen text-[12px]"></i>
                        <span className="hidden sm:inline">Log Session</span>
                    </button>





                    {skills.length > 0 && onDeleteAll && (
                        <button
                            onClick={onDeleteAll}
                            className="text-xs font-medium text-white bg-red-600 hover:text-red-700 hover:bg-red-100 px-2 py-1.5 rounded-lg transition flex items-center gap-1"
                        >
                            <i className="fas fa-trash-alt text-[12px]"></i>
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
                            onEdit={onEditSkill ? setEditingSkill : undefined}
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

            <EditSkillModal
                isOpen={!!editingSkill}
                onClose={() => setEditingSkill(null)}
                skill={editingSkill}
                onSave={(updated) => {
                    onEditSkill?.(updated);
                    setEditingSkill(null);
                }}
            />
        </div>
    );
};

export default LeftPanel;