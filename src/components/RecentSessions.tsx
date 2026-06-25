import React from 'react';
import { Session } from '../types/Skill';

interface RecentSessionsProps {
  sessions: Session[];
  onClearAll?: () => void;
}

const RecentSessions: React.FC<RecentSessionsProps> = ({ sessions, onClearAll }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
          <i className="fas fa-list-ul text-slate-400 text-xs"></i> Recent Sessions
        </span>
        <div className="flex items-center gap-2">
          {sessions.length > 0 && onClearAll && (
            <button
              onClick={onClearAll}
              className="text-xs font-medium text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded transition flex items-center gap-1"
            >
              <i className="fas fa-trash-alt text-[10px]"></i>
              Clear All
            </button>
          )}
          <button className="text-xs font-medium text-blue-600 hover:text-blue-800 transition flex items-center gap-1">
            View all <i className="fas fa-arrow-right text-[10px]"></i>
          </button>
        </div>
      </div>
      <div className="space-y-3">
        {sessions.length === 0 ? (
          <div className="text-center py-4 text-slate-400 text-sm">
            <i className="fas fa-inbox text-2xl block mb-2 text-slate-300"></i>
            No sessions recorded yet
          </div>
        ) : (
          sessions.slice(0, 5).map((session, i) => (
            <div key={i} className="border-b border-slate-100/70 last:border-0 pb-3 last:pb-0">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <span className="text-sm font-semibold text-slate-800">{session.skillName}</span>
                  <p className="text-xs text-slate-500 leading-relaxed mt-0.5 line-clamp-2">{session.note}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap">
                    {session.duration}min
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5">{session.dateLabel}</div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecentSessions;