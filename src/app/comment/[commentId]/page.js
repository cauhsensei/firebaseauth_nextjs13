'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';

export default function CommentPage({ params }) {
    const [comment, setComment] = useState(null);
    const { commentId } = params;

    useEffect(() => {
        const fetchComment = async () => {
            const commentRef = doc(db, 'comments', commentId);
            const commentData = await getDoc(commentRef);

            if (commentData.exists()) {
                setComment({
                    ...commentData.data(),
                    id: commentData.id
                });
            }
        };

        if (commentId) {
            fetchComment();
        }
    }, [commentId]);

    if (!comment) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">{comment.title}</h1>
            <p>{comment.description}</p>
            <p><strong>Username:</strong> {comment.username || "Anônimo"}</p>
            {/* Renderize outros detalhes do comentário como desejado */}
        </div>
    );
}
