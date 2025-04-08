import React, { useState } from "react";
import Header from "../../../components/layout/Header";
import NavigationBar from "../../../components/layout/NavigationBar";
import AccessibilityWidget from "../../../components/accessibility/AccessibilityWidget";

const faqs = [
    {
        question: "1. What is the Pandemic Risk and Absence Manager?",
        answer:
            "PRAM is a third-party system used to self-report absences, track employee health statistics, manage pandemic-related absences, and monitor risk levels.",
    },
    {
        question: "2. How do employees report symptoms or exposure?",
        answer:
            "Employees can self-report through the Absence portal. This can be accessed via the dashbooard, then through the 'Report Absence' option.",
    },
    {
        question: "3. Is employee health data kept confidential?",
        answer:
            "Yes, all personal health information is securely handled according to GDPR.",
    },
    {
        question: "4. Can managers automate return-to-work approvals?",
        answer:
            "Yes, return-to-work approvals can be automated based on risk level and submitted documentation.",
    },
    {
        question: "5. How does this help with compliance?",
        answer:
            "PRAM aligns with Government public health guidelines and allows secure access to reports.",
    },
    {
        question: "6. PRAM is not working for me. Who can I talk to for support?",
        answer:
            "As we are the third-party provider, it is best to reach out to your company's dedicated IT support team for assistance.",
    },
];

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
        <div className="flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-all">
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
                                                <span className="text-xl">
                                                    {isOpenFaq ? "−" : "+"}
                                                </span>
                                            </button>
                                            {isOpenFaq && (
                                                <p className="mt-2 text-gray-700 dark:text-gray-300">{faq.answer}</p>
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