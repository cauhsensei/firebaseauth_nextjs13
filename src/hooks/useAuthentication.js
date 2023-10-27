'use client'

import { useState, useEffect } from 'react';
import { db, auth } from '@/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default function useAuthentication() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        const userType = sessionStorage.getItem('userType');

        console.log('Token no sessionStorage:', storedToken);
        console.log('UserType no sessionStorage:', userType);

        if (storedToken) {
            setUser({ token: storedToken, type: userType });
        }
    }, []);

    const register = async (userData) => {
        setLoading(true);

        try {
        
            const authResult = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            
            
            await addDoc(collection(db, 'users'), {
                username: userData.name,
                email: userData.email,
                isCompany: userData.isCompany
            });

            const token = await authResult.user.getIdToken();
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userType', userData.isCompany ? 'company' : 'user');
            setUser({ token: token, type: userData.isCompany ? 'company' : 'user' });

            setLoading(false);
            return { user: authResult.user };
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        try {
            const authResult = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
            const token = await authResult.user.getIdToken();
            
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userType', credentials.isCompany ? 'company' : 'user');
            setUser({ token: token, type: credentials.isCompany ? 'company' : 'user' });

            setLoading(false);
            return { user: authResult.user };
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };

    const logout = () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('userType');
        signOut(auth);
        setUser(null);
    };

    return {
        user,
        register,
        login,
        logout,
        loading,
        error
    };
}
