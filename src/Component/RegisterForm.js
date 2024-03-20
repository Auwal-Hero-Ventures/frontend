import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For redirection after registration

const RegisterForm = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'customer', // default role, can be adjusted based on user selection
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Example fetch call for registration
        // Remember to replace 'http://localhost:8000/api/register/' with your actual endpoint
        fetch('http://localhost:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                setMessage(data.error);
            } else {
                setMessage('Registration successful! Redirecting...');
                setTimeout(() => navigate('/signin'), 3000); // Redirect to sign-in page after registration
            }
        })
        .catch((error) => setMessage('An error occurred. Please try again later.'));
    };

    return (
        <div className="form-container"> {/* Use similar container class as SignIn for consistent styling */}
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="input-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="role">Role</label>
                    <select name="role" id="role" value={userData.role} onChange={handleChange}>
                        <option value="customer">Customer</option>
                        <option value="agent">Agent</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Register</button>
                {message && <div className="message">{message}</div>}
            </form>
        </div>
    );
};

export default RegisterForm;
