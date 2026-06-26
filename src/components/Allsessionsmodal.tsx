import React from 'react';
import type { Session } from '../types/Skill';

interface AllSessionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    sessions: Session[];
}

const AllSessionsModal: React.FC<AllSessionsModalProps> = ({ isOpen, onClose, sessions }) => {
    if (!isOpen) return null;

    const sorted = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 flex flex-col max-h-[80vh]">
                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
                    <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
                        <i className="fas fa-list text-slate-400 text-sm"></i> All Sessions
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition p-1"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="overflow-y-auto flex-1 px-5 py-3 space-y-2">
                    {sorted.length === 0 ? (
                        <p className="text-sm text-slate-400 text-center py-8">No sessions logged yet.</p>
                    ) : (
                        sorted.map(session => (
                            <div key={session.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                                <div>
                                    <p className="text-sm font-medium text-slate-800">{session.skillName}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{session.notes || `Practiced ${session.skillName}`}</p>
                                </div>
                                <div className="text-right shrink-0 ml-4">
                                    <p className="text-sm font-semibold text-slate-700">{session.duration}min</p>
                                    <p className="text-xs text-slate-400">{session.dateLabel}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AllSessionsModal;