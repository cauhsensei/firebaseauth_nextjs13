'use client'

import { useState, useEffect } from 'react';
import { db, auth } from '@/firebase/firebaseConfig';
import { collection, addDoc, getDoc, doc, setDoc } from 'firebase/firestore';
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

    // Adicione essa nova função no seu hook useAuthentication

    const registerCompany = async (companyData) => {
        setLoading(true);
    
        // Gerar uma senha aleatória. Certifique-se de adequar às políticas de senha do Firebase.
        const randomPassword = Math.random().toString(36).slice(-8);
    
        try {
            const authResult = await createUserWithEmailAndPassword(auth, companyData.email, randomPassword);
            
            await setDoc(doc(db, 'users', authResult.user.uid), {
                uid: authResult.user.uid,
                email: companyData.email,
                nome: companyData.nome,
                fantasia: companyData.fantasia,
                telefone: companyData.telefone,
                atividadePrincipal: companyData.atividadePrincipal,
                situacao: companyData.situacao,
                isCompany: true
            });
    
            setLoading(false);
            return { user: authResult.user };
        } catch (err) {
            setError(err.message);
            setLoading(false);
            throw err;
        }
    };
    

    const register = async (userData) => {
        setLoading(true);
        const randomPassword = Math.random().toString(36).slice(-8);
    
        try {
            const authResult = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            
            await setDoc(doc(db, 'users', authResult.user.uid), {
                uid: authResult.user.uid,
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
    
            console.log("UID:", authResult.user.uid); 
    
            const userDoc = await getDoc(doc(db, 'users', authResult.user.uid));
    
            if (!userDoc.exists()) { 
                throw new Error("Documento de usuário não encontrado");
            }
    
            const isCompany = userDoc.data().isCompany;
    
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userType', isCompany ? 'company' : 'user');
            setUser({ token: token, type: isCompany ? 'company' : 'user' });
    
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
        registerCompany,
        loading,
        error
    };
}
