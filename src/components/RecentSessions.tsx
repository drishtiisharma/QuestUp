import React, { useState } from 'react';
import type { Session } from '../types/Skill';
import AllSessionsModal from './Allsessionsmodal';

interface RecentSessionsProps {
  sessions: Session[];
  onClearAll?: () => void;
}

const RecentSessions: React.FC<RecentSessionsProps> = ({ sessions, onClearAll }) => {
  const [showAll, setShowAll] = useState(false);

  const sorted = [...sessions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const visible = sorted.slice(0, 3);

  const canViewAll = sorted.length > 0;
  const hasMore = sorted.length > 3;

  return (
    <>
      <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-5 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <i className="fas fa-list text-slate-400"></i> Recent Sessions
          </h3>
          <div className="flex items-center gap-3">
            {onClearAll && sessions.length > 0 && (
              <button
                onClick={onClearAll}
                className="text-xs text-red-400 hover:text-red-600 transition flex items-center gap-1"
              >
                <i className="fas fa-trash-alt text-[10px]"></i> Clear All
              </button>
            )}

            {canViewAll && (
              <button
                onClick={() => setShowAll(true)}
                className="text-xs text-blue-500 hover:text-blue-700 transition font-medium flex items-center gap-1"
              >
                View all <i className="fas fa-arrow-right text-[10px]"></i>
              </button>
            )}
          </div>
        </div>

        <div className="space-y-0.5">
          {visible.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-6">No sessions yet. Log one to get started!</p>
          ) : (
            visible.map(session => (
              <div key={session.id} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-800">{session.skillName}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{session.note || `Practiced ${session.skillName}`}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-sm font-semibold text-slate-700">{session.duration}min</p>
                  <p className="text-xs text-slate-400">{session.dateLabel}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {hasMore && (
          <button
            onClick={() => setShowAll(true)}
            className="w-full mt-3 text-xs text-slate-400 hover:text-slate-600 transition text-center py-1"
          >
            +{sorted.length - 3} more sessions
          </button>
        )}
      </div>

      <AllSessionsModal
        isOpen={showAll}
        onClose={() => setShowAll(false)}
        sessions={sessions}
      />
    </>
  );
};

export default RecentSessions;