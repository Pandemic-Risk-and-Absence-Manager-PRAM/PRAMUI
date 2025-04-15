import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DepartmentAbsences = () => {
    const percentages = [
        50,
        75,
        25,
        12.5,
    ];
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="bg-blue-100 dark:bg-gray-700 p-8 rounded-lg mb-8 transition-all duration-300">
            <div className="text-xl text-black dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                Absences by Department
            </div>
            {/* Displaying Absences by Department in circular diagram */}
            <div className="grid grid-cols-4 gap-4 p-5" style={{ fontFamily: 'Kanit, sans-serif' }}>
                {[{
                    label: "Department 1",
                    value: 4,
                }, {
                    label: "Department 2",
                    value: 6,
                }, {
                    label: "Department 3",
                    value: 2,
                }, {
                    label: "Department 4",
                    value: 1,
                }].map(({ label, value }, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <motion.div
                            className="w-20 h-20 relative flex items-center justify-center"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                        >
                            <svg
                                className="w-full h-full"
                                viewBox="0 0 100 100"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    stroke="#ddd"
                                    strokeWidth="10"
                                    fill="none"
                                    className="dark:stroke-[#123352]"
                                />
                                {/* Animated circle for percentage */}
                                <motion.circle
                                    cx="50"
                                    cy="50"
                                    r="45"
                                    stroke="#123352"
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    fill="none"
                                    strokeDasharray="283"
                                    strokeDashoffset={283 - (percentages[index] / 100) * 283}
                                    animate={hoveredIndex === index ? { strokeDashoffset: [283, 283 - (percentages[index] / 100) * 283] } : {}}
                                    transition={{ duration: 1, ease: 'easeInOut' }}
                                    transform="rotate(-90 50 50)"
                                    className="dark:stroke-gray-400"
                                />
                            </svg>
                            <div className="absolute text-black dark:text-white font-bold text-lg">
                                {value}
                            </div>
                        </motion.div>
                        <span className="mt-2 text-black dark:text-gray-300 font-kanit">
                            {label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DepartmentAbsences;
