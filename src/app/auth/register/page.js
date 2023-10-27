'use client'

import { useState } from 'react';
import { db } from '@/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import useAuthentication from '@/hooks/useAuthentication';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    isCompany: false,
  });

  const { register } = useAuthentication();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIsCompanyChange = (e) => {
    setFormData((prev) => ({ ...prev, isCompany: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('Usuário registrado com sucesso!');
      setFormData({
        name: '',
        email: '',
        password: '',
        isCompany: false,
      });
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>
        <label>
          Senha:
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
        </label>
        <label>
          É uma empresa?
          <input type="checkbox" checked={formData.isCompany} onChange={handleIsCompanyChange} />
        </label>
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}