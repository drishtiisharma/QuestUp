import React from 'react';

interface GreetingProps {
    name: string;
    todayCount: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, todayCount }) => {
    const hour = new Date().getHours();
    let time = 'evening';
    if (hour < 12) time = 'morning';
    else if (hour < 17) time = 'afternoon';

    return (
        <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span className="text-2xl">👋</span> Good {time}, {name}
            </h2>
            <p className="text-sm mt-1 flex items-center gap-1.5 text-slate-500">
                <span className={`inline-block w-1.5 h-1.5 rounded-full ${todayCount > 0 ? 'bg-emerald-400' : 'bg-slate-400'}`}></span>
                You've practiced <strong className="text-slate-700">{todayCount}</strong> skills today. Keep it up!
            </p>
        </div>
    );
};

export default Greeting;