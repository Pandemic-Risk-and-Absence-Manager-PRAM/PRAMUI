import React, { useState, useEffect } from 'react';

const FileUpload = ({ onFileSelected }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFile = (event) => {
        const selectedFile = event.target.files?.[0] || null;

        if (selectedFile && selectedFile.type !== 'application/pdf') {
            setError('Please upload a PDF file.');
            setFile(null);
            onFileSelected(null);
        } else {
            setError('');
            setFile(selectedFile);
            onFileSelected(selectedFile ? URL.createObjectURL(selectedFile) : null);
        }
    };

    const handleFileUpload = async () => {
        alert('File uploaded successfully!');
    };

    useEffect(() => {
        return () => {
            if (file) URL.revokeObjectURL(file);
        };
    }, [file]);

    return (
        <div className="space-y-6" style={{ fontFamily: 'Kanit, sans-serif' }}>
            {/* Upload Area */}
            <label
                htmlFor="file"
                className="w-full flex flex-col items-center justify-center border-2 border-dashed border-gray-400 hover:border-blue-600 rounded-lg p-6 cursor-pointer transition duration-300 bg-white dark:bg-gray-700"
            >
                <span className="text-sm text-gray-600 dark:text-gray-300">
                    Click to upload or drag a <strong>.pdf</strong> file here
                </span>
                <input
                    id="file"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFile}
                    className="hidden"
                />
            </label>

            {/* Error Message */}
            {error && (
                <p className="text-red-500 font-medium text-sm">{error}</p>
            )}

            {/* File Details */}
            {file && (
                <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-sm border">
                    <p className="font-semibold text-gray-800 dark:text-gray-200 mb-2">📄 File Details</p>
                    <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside">
                        <li><strong>Name:</strong> {file.name}</li>
                        <li><strong>Type:</strong> {file.type}</li>
                        <li><strong>Size:</strong> {(file.size / 1024).toFixed(2)} KB</li>
                    </ul>
                </div>
            )}

            {/* Upload Button */}
            {file && (
                <button
                    onClick={handleFileUpload}
                    className="bg-[#cce3c7] dark:bg-green-700 text-black dark:text-white px-4 py-2 rounded transition-colors"
                >
                    UPLOAD FILE
                </button>
            )}
        </div>
    );
};

export default FileUpload;