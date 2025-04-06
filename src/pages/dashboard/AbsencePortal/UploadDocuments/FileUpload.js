import React, { useState } from 'react';
import "./UploadDocument.css";

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    const handleFile = (event) => {
        const selectedFile = event.target.files?.[0] || null;
        if (selectedFile && selectedFile.type !== 'application/pdf') {
            setError('Please upload a PDF file.');
            setFile(null);
        } else {
            setError('');
            setFile(selectedFile);
        }
    };

    const handleFileUpload = async () => {
        alert('File uploaded successfully!');
    };

    return (
        <>
            <div className="input-group">
                <input id="file" type="file" onChange={handleFile} />
            </div>
            {error && <p className="error-message">{error}</p>}
            {file && (
                <section>
                    File details:
                    <ul>
                        <li>Name: {file.name}</li>
                        <li>Type: {file.type}</li>
                        <li>Size: {file.size} bytes</li>
                    </ul>
                </section>
            )}
            {file && (
                <button
                    onClick={handleFileUpload}
                    className="submit-button"
                >UPLOAD FILE</button>
            )}
        </>
    );
};

export default FileUpload;