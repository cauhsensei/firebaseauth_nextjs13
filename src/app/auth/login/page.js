'use client'

import React, { useState, useContext } from 'react';
import useAuthentication from '@/hooks/useAuthentication';
import { useRouter } from 'next/navigation'; 

export default function Login() {
    const { login, error, loading } = useAuthentication();
    const router = useRouter();

    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials);
            alert('Login bem-sucedido!');
            router.push('/');
        } catch (err) {
            alert('Erro no login. Por favor, verifique suas credenciais.');
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={credentials.email} onChange={handleInputChange} required />
                </div>
                <div>
                    <label>Senha:</label>
                    <input type="password" name="password" value={credentials.password} onChange={handleInputChange} required />
                </div>
                <div>
                    <button type="submit" disabled={loading}>Login</button>
                </div>
            </form>
        </div>
    );
}
