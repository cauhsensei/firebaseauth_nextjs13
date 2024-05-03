'use client'

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function Categories() {
    const router = useRouter();
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const categoriesCollection = collection(db, 'categories');
            const categorySnapshot = await getDocs(categoriesCollection);
            const categoryList = categorySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setCategories(categoryList);
        };

        fetchCategories();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Categorias</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {categories.map(category => (
                    <div key={category.id} className="p-4 border rounded shadow">
                        {category.name}
                        <button 
                            onClick={() => router.push(`/categories/${category.id}`)}
                            className="mt-4 inline-block bg-blue-500 text-white rounded px-4 py-2">
                            Ver mais
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
