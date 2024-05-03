// pages/consulta-cnpj.js
'use client'

import { useState } from 'react';
import useAuthentication from '@/hooks/useAuthentication';

export default function ConsultaCnpj() {
  const [cnpj, setCnpj] = useState('');
  const [empresaData, setEmpresaData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { registerCompany } = useAuthentication();

  async function buscarCnpj() {
    if (!cnpj) {
      alert('Por favor, insira um CNPJ.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/companydata?cnpj=${encodeURIComponent(cnpj)}`);
      if (!response.ok) {
        throw new Error('Falha na busca do CNPJ');
      }
      const data = await response.json();
      setEmpresaData(data);
    } catch (error) {
      alert('Erro ao buscar informações do CNPJ. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  // Função para registrar a empresa
const handleRegisterCompany = async () => {
    try {
        if (!empresaData) {
            alert('Não há dados de empresa para registrar.');
            return;
        }
        await registerCompany(empresaData);
        alert('Empresa registrada com sucesso.');
    } catch (error) {
        alert(`Erro ao registrar empresa: ${error.message}`);
    }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700">
          CNPJ
        </label>
        <div className="mt-1">
          <input
            type="text"
            id="cnpj"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="00.000.000/0000-00"
          />
        </div>
        <button
          onClick={buscarCnpj}
          className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      {empresaData && (
        <>
        <div className="mt-6 p-4 bg-white shadow rounded-lg">
          <p><strong>Nome:</strong> {empresaData.nome}</p>
          <p><strong>Nome Fantasia:</strong> {empresaData.fantasia}</p>
          <p><strong>Email:</strong> {empresaData.email}</p>
          <p><strong>Telefone:</strong> {empresaData.telefone}</p>
          <p><strong>Atividade Principal:</strong> {empresaData.atividadePrincipal}</p>
          <p><strong>Situação:</strong> {empresaData.situacao}</p>
        </div>
            <button
            onClick={handleRegisterCompany}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
            Esta é a empresa que procuro
            </button>
      </>
      )}
    </div>
  );
}
