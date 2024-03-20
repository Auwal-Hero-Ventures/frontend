// src/components/AssignTokens.js
import React, { useState } from 'react';
import axios from '../axiosConfig';

const AssignTokens = ({ role }) => {
    const [formData, setFormData] = useState({
        receiverId: '',
        amount: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = role === 'admin' ? 'assign-token/admin/' : 'assign-token/agent/';
        try {
            const response = await axios.post(endpoint, {
                receiver: formData.receiverId,
                amount: formData.amount,
            });
            console.log('Tokens assigned successfully', response.data);
            // Handle success (e.g., clear form, show message)
        } catch (error) {
            console.error('Error assigning tokens', error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="receiverId"
                value={formData.receiverId}
                onChange={handleChange}
                placeholder="Receiver ID"
                required
            />
            <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                required
            />
            <button type="submit">Assign Tokens</button>
        </form>
    );
};
