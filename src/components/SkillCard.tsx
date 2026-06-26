import React, { useState } from 'react';
import type { Skill } from '../types/Skill';

interface SkillCardProps {
    skill: Skill;
    isPrimary?: boolean;
    onDelete?: (skillName: string) => void;
    onEdit?: (skill: Skill) => void;
}

const SkillCard: React.FC<SkillCardProps> = ({ skill, isPrimary = false, onDelete, onEdit }) => {
    const { name, hours, streak, progress, color, sessions, weeklyGoal } = skill;
    const [expanded, setExpanded] = useState(false);

    const lastSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;

    const showDetails = isPrimary || expanded;

    return (
        <div className={`bg-white rounded-xl px-4 py-3.5 shadow-sm border ${isPrimary ? 'ring-2 ring-blue-500/20 border-blue-200 bg-blue-50/30' : 'border-slate-100'} group`}>
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-slate-800">{name}</span>
                        {isPrimary && (
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                                most practiced
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 text-sm text-slate-500 flex-wrap">
                        <span className="flex items-center gap-1">
                            <i className="far fa-clock text-slate-400 text-xs"></i> {hours.toFixed(1)}h
                        </span>
                        <span className="flex items-center gap-1">
                            <i className="far fa-calendar-alt text-slate-400 text-xs"></i> {streak}-day streak
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="text-right min-w-[44px]">
                        <span className="text-sm font-semibold text-slate-700">{Math.round(progress)}%</span>
                    </div>
                    {/* Edit button */}
                    {onEdit && (
                        <button
                            onClick={() => onEdit(skill)}
                            className="text-slate-300 hover:text-blue-500 transition opacity-0 group-hover:opacity-100 p-0.5"
                            title="Edit skill"
                        >
                            <i className="fas fa-pen text-xs"></i>
                        </button>
                    )}
                    {/* View/collapse toggle — only for non-primary cards */}
                    {!isPrimary && (
                        <button
                            onClick={() => setExpanded(v => !v)}
                            className="text-slate-300 hover:text-slate-500 transition opacity-0 group-hover:opacity-100 p-0.5"
                            title={expanded ? 'Collapse' : 'View details'}
                        >
                            <i className={`fas fa-chevron-${expanded ? 'up' : 'down'} text-xs`}></i>
                        </button>
                    )}
                    {onDelete && (
                        <button
                            onClick={() => onDelete(name)}
                            className="text-slate-300 hover:text-red-500 transition opacity-0 group-hover:opacity-100 p-0.5"
                            title="Delete skill"
                        >
                            <i className="fas fa-times text-xs"></i>
                        </button>
                    )}
                </div>
            </div>

            <div className="h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: color }}></div>
            </div>

            {showDetails && (
                <>
                    <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-slate-500 border-t border-slate-200/60 pt-2">
                        <div><span className="font-medium text-slate-700 block">{Math.round((hours / (weeklyGoal || 1)) * 100)}%</span> weekly goal</div>
                        <div><span className="font-medium text-slate-700 block">{hours.toFixed(1)}h</span> total hours</div>
                        <div><span className="font-medium text-slate-700 block">{streak}</span> day streak</div>
                    </div>
                    {lastSession && (
                        <div className="mt-1.5 text-xs text-slate-400 flex items-center gap-1">
                            <i className="fas fa-history text-[10px]"></i>
                            Last session: {lastSession.dateLabel} — {lastSession.duration}min
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SkillCard;