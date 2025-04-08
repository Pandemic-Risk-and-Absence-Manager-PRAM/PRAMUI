import React, { useState } from "react";
import "./SSO.css";
import mockCredentials from "../../models/MockCredentials.json";

function SSO({ handleLogin, closeModal }) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleId = (e) => {
        setId(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = Object.entries(mockCredentials).find(([role, credentials]) =>
            credentials.id === id && credentials.password === password
        );
        if (user) {
            const [role] = user;
            handleLogin(role);
        } else {
            alert('Wrong ID or password combination');
        }
    };

    return (
        <div className="login-page" style={{ fontFamily: "Kanit, sans-serif" }}>
            <h2>Login</h2>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="sso-field">
                    <input
                        type="text"
                        className="form-control"
                        id="employeeID"
                        placeholder="Enter employee ID"
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
