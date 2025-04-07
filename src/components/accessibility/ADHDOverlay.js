import React, { useState, useEffect } from 'react';

const ADHDOverlay = ({ isActive }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setCursorPosition({ x: event.clientX, y: event.clientY });
        };

        if (isActive) {
            window.addEventListener('mousemove', handleMouseMove);
        } else {
            setCursorPosition({ x: 0, y: 0 });
            window.removeEventListener('mousemove', handleMouseMove);
        }

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isActive]);

    if (!isActive) {
        return null;
    }

    return (
        <div
            className="adhd-overlay"
            style={{
                '--cursor-x': `${cursorPosition.x}px`,
                '--cursor-y': `${cursorPosition.y}px`,
            }}
        ></div>
    );
};

export default ADHDOverlay;