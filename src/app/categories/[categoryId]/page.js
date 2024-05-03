'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

export default function CategoryPage({ params }) {
    const [comments, setComments] = useState([]);
    const { categoryId } = params;

    console.log("Params recebidos:", params);

    useEffect(() => {
        const fetchComments = async () => {
            console.log("ID da Categoria:", categoryId);

            const commentsQuery = query(
                collection(db, 'comments'),
                where('categoryId', '==', categoryId)
            );

            const commentSnapshot = await getDocs(commentsQuery);
            const commentsList = commentSnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            console.log("Comentários recuperados:", commentsList);
            setComments(commentsList);
        };

        if (categoryId) {
            fetchComments();
        }
    }, [categoryId]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Comentários da Categoria</h1>
            {comments.map((comment) => (
                <div key={comment.id} className="p-4 border rounded shadow mb-4">
                    <h2 className="font-bold">{comment.title}</h2>
                    <p>{comment.description}</p>
                    {/* Renderize outros detalhes do comentário como desejado */}
                    <Link href={`/comment/${comment.id}`} className="text-blue-500 mt-2 inline-block">
                        Ler mais
                    </Link>
                </div>
            ))}
        </div>
    );
}
