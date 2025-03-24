import React, { useState } from "react";
import { motion } from "framer-motion";

const ManagerOverview = () => {

    // Progress Bar Values
    const teamCapacity = 75;
    const absenceRequests = 40;

    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="bg-blue-100 dark:bg-gray-700 p-8 rounded-lg mb-8 transition-all duration-300">
            <div className="text-xl text-black dark:text-white mb-4" style={{ fontFamily: "Kanit, sans-serif" }}>
                Team Overview
            </div>
            <div className="grid grid-cols-2 gap-8 items-center">
                {/* Team Capacity Progress */}
                <div className="text-center">
                    <div className="relative w-full">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gray-300 dark:bg-[#123352] rounded-full"></div>
                        <motion.div
                            className="relative h-2 bg-blue-900 dark:bg-gray-400 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: hoveredIndex === "team" ? `${teamCapacity}%` : `${teamCapacity}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            whileHover={{ scale: 1.1 }}
                            onMouseEnter={() => setHoveredIndex("team")}
                            onMouseLeave={() => setHoveredIndex(null)}
                        ></motion.div>
                    </div>
                    <p className="mt-2 text-black dark:text-white">{teamCapacity}% Team Capacity</p>
                </div>

                {/* Employee Absence Requests Pending */}
                <div className="text-center">
                    <div className="relative w-full">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gray-300 dark:bg-[#123352] rounded-full"></div>
                        <motion.div
                            className="relative h-2 bg-blue-900 dark:bg-gray-400 rounded-full"
                            initial={{ width: "0%" }}
                            animate={{ width: hoveredIndex === "absence" ? `${absenceRequests}%` : `${absenceRequests}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            whileHover={{ scale: 1.1 }}
                            onMouseEnter={() => setHoveredIndex("absence")}
                            onMouseLeave={() => setHoveredIndex(null)}
                        ></motion.div>
                    </div>
                    <p className="mt-2 text-black dark:text-white">{absenceRequests}% Employee Absence Requests Pending</p>
                </div>
            </div>
        </div>
    );
};

export default ManagerOverview;