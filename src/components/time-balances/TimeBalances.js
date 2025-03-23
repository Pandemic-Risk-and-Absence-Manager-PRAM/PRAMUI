import React from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import users from '../../models/users.json';

const TimeBalances = () => {
    const { dashboardType } = useParams();
    const user = users[dashboardType];

    const remainingDays = user.totalDays - user.usedDays;

    return (
        <div className="bg-blue-100 p-8 rounded-lg mb-8">
        <div className="text-xl text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
        Time Balances
        </div>
        <div className="grid grid-cols-3 gap-4 p-5">
        {/* Days Remaining */}
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 relative flex items-center justify-center">
            <CircularProgressbar
                value={(remainingDays / user.totalDays) * 100}
                styles={buildStyles({
                textSize: "24px",
                pathColor: "#123352",
                textColor: "transparent",
                trailColor: "#ddd"
                })}
            />
            <div className="absolute text-black font-bold text-lg">
                {remainingDays}
            </div>
            </div>
            <span className="mt-2" style={{ fontFamily: 'Kanit, sans-serif' }}>Days Remaining</span>
        </div>

        {/* Days Used */}
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 relative flex items-center justify-center">
            <CircularProgressbar
                value={(user.usedDays / user.totalDays) * 100}
                styles={buildStyles({
                textSize: '24px',
                pathColor: '#123352',
                textColor: "transparent",
                trailColor: '#ddd',
                textAnchor: 'middle',
                })}
            />
            <div className="absolute text-black font-bold text-lg">
                {user.usedDays}
            </div>
            </div>
            <span className="mt-2" style={{ fontFamily: 'Kanit, sans-serif' }}>Days Used</span>
        </div>

        {/* Sick Days */}
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 relative flex items-center justify-center">
            <CircularProgressbar
                value={(user.sickDays / user.totalDays) * 100}
                styles={buildStyles({
                textSize: '24px',
                pathColor: '#123352',
                textColor: "transparent",
                trailColor: '#ddd',
                textAnchor: 'middle',
                })}
            />
            <div className="absolute text-black font-bold text-lg">
                {user.sickDays}
            </div>
            </div>
            <span className="mt-2" style={{ fontFamily: 'Kanit, sans-serif' }}>Sick Days</span>
        </div>
        </div>
    </div>
  );
};

export default TimeBalances;   