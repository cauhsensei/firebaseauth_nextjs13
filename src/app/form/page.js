'use client'

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db, auth } from '@/firebase/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function CommentForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        // Observa mudanças no estado de autenticação
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    // Função para buscar categorias
    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesCollection = collection(db, 'categories');
            const categorySnapshot = await getDocs(categoriesCollection);
            const categoryList = categorySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setCategories(categoryList);
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert('Você precisa estar logado para comentar.');
            return;
        }
        try {
            await addDoc(collection(db, 'comments'), {
                uid: currentUser.uid,
                username: currentUser.displayName,
                title,
                description,
                category: selectedCategory,
                categoryId: categories.find(cat => cat.name === selectedCategory)?.id || ''
            });
            setTitle('');
            setDescription('');
            setSelectedCategory('');
            alert('Comentário enviado com sucesso!');
        } catch (error) {
            console.error('Erro ao enviar comentário:', error);
            alert('Erro ao enviar comentário. Por favor, tente novamente.');
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Deixe seu Comentário</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Título:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-2 p-2 w-full border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descrição:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-2 p-2 w-full border rounded"
                        rows="5"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Categoria:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mt-2 p-2 w-full border rounded"
                        required
                    >
                        <option value="">Selecione uma categoria</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="p-2 bg-blue-500 text-white rounded">
                    Enviar Comentário
                </button>
            </form>
        </div>
    );
}
