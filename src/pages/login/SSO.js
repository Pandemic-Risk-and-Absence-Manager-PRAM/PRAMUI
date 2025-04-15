import React, { useState } from "react";
import "./SSO.css";
import mockCredentials from "../../models/MockCredentials.json";

function SSO({ handleLogin, closeModal, targetRole }) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    // Handle form submission based on entered credentials
    const handleSubmit = (e) => {
        e.preventDefault();

        if (mockCredentials[targetRole] && mockCredentials[targetRole].id === id && mockCredentials[targetRole].password === password) {
            handleLogin(targetRole);
        } else {
            alert(`Wrong ID or password combination for the ${targetRole.charAt(0).toUpperCase() + targetRole.slice(1)} Portal`);
        }
    };

    return (
        <div className="login-page" style={{ fontFamily: "Kanit, sans-serif" }}>
            <h2>Login for {targetRole.charAt(0).toUpperCase() + targetRole.slice(1)} Portal</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="sso-field">
                    <input
                        type="text"
                        className="form-control"
                        id="employeeID"
                        placeholder={`Enter ${targetRole} ID`}
                        onChange={handleId}
                    />
                </div>
                <div className="sso-field">
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        onChange={handlePassword}
                    />
                </div>
                <button type="submit" className="sso-button">
                    Submit
                </button>
            </form>

            {/* Close Button */}
            <button onClick={closeModal} className="sso-button close-button">
                Close
            </button>
        </div>
    );
}

export default SSO;