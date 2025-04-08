import React, { useState } from "react";
import Header from "../../../components/layout/Header";
import NavigationBar from "../../../components/layout/NavigationBar";
import AccessibilityWidget from "../../../components/accessibility/AccessibilityWidget";
import faqs from "../../../models/FAQS.json";

const Help = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleNavigationBar = () => {
        setIsOpen(!isOpen);
    };

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all" style={{ fontFamily: 'Kanit, sans-serif' }}>
            <Header toggleNavigationBar={toggleNavigationBar} isOpen={isOpen} />
            <div className="flex flex-1">
                <NavigationBar isOpen={isOpen} toggleNavigationBar={toggleNavigationBar} />
                <div className="flex-1 min-h-screen">
                    <div 
                        className="p-6 min-h-screen bg-gray-100 dark:bg-gray-900"
                        style={{ marginLeft: isOpen ? "280px" : "0px", transition: "margin-left 0.3s ease" }}
                    >
                        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                                FREQUENTLY ASKED QUESTIONS
                            </h1>
                            <div className="space-y-4">
                                {faqs.map((faq, index) => {
                                    const isOpenFaq = openFaqIndex === index;
                                    return (
                                        <div key={index} className="border-b border-gray-300 dark:border-gray-700 pb-4">
                                            <button
                                                onClick={() => toggleFaq(index)}
                                                className="w-full flex justify-between items-center text-left focus:outline-none text-lg font-semibold text-gray-800 dark:text-white"
                                            >
                                                <span>{faq.question}</span>
                                                <span className="text-xl text-gray-600 dark:text-gray-400">
                                                    {isOpenFaq ? "−" : "+"}
                                                </span>
                                            </button>
                                            {isOpenFaq && (
                                                <p className="mt-2 text-gray-700 dark:text-gray-300 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                                    {faq.answer}
                                                </p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AccessibilityWidget />
        </div>
    );
};

export default Help;
