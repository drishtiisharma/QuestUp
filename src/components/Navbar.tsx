import React from 'react';

interface NavbarProps {
    userName: string;
}

const Navbar: React.FC<NavbarProps> = ({ userName }) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-800 flex items-center gap-1.5">
                    <span className="bg-blue-600 text-white text-sm px-2 py-0.5 rounded-md">Q</span> questup
                </span>
                <span className="text-[10px] font-medium text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-full">beta</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
                <i className="fas fa-bell text-slate-400"></i>
                <span className="h-6 w-px bg-slate-200"></span>
                <span className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-medium">
                        {userName.charAt(0).toUpperCase()}
                    </span>
                    <span className="hidden sm:inline text-slate-700 text-sm">{userName}</span>
                </span>
            </div>
        </div>
    );
};

export default Navbar;