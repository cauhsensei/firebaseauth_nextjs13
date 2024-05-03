'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebaseConfig';
import { useParams } from 'next/navigation';

function CompanyDetails() {
    const params = useParams();
    const companyId = params ? params.companyId : null;
    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!companyId) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            const docRef = doc(db, 'users', companyId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists() && docSnap.data().isCompany) {
                setCompanyData(docSnap.data());
            } else {
                setCompanyData(null);
            }
            setLoading(false);
        };

        fetchData();
    }, [companyId]);

    if (loading) return <p>Carregando...</p>;

    if (!companyData) {
        return <p>Não existe nenhuma empresa com este ID.</p>;
    }

    return (
        <div>
            <h1>{companyData.username}</h1>
            {/* Renderize outros detalhes da empresa como desejado */}
        </div>
    );
}

export default CompanyDetails;
