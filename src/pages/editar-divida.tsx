"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Header from '../components/Header';
import { FaTrash } from 'react-icons/fa';

interface Debt {
  id: string;
  nome: string;
  numeroParcelas: number;
  valorParcela: number;
  mesInicio: string;
}

export default function EditarDivida() {
  const router = useRouter();
  const { query } = router;

  const [debt, setDebt] = useState<Debt>({
    id: '',
    nome: '',
    numeroParcelas: 1,
    valorParcela: 0,
    mesInicio: '',
  });

  useEffect(() => {
    if (query.id) {
      setDebt({
        id: query.id as string,
        nome: query.nome as string,
        numeroParcelas: Number(query.numeroParcelas),
        valorParcela: Number(query.valorParcela),
        mesInicio: formatDateToMonth(new Date(query.mesInicio as string)),
      });
    }
  }, [query]);

  const formatDateToMonth = (date: Date) => {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/dividas`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(debt),
      });
      if (response.ok) {
        router.push('/home');
      } else {
        console.error('Failed to update debt');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/dividas?id=${debt.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.push('/home');
      } else {
        console.error('Failed to delete debt');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDebt((prevDebt) => ({
      ...prevDebt,
      [name]: name === 'numeroParcelas' || name === 'valorParcela' ? Number(value) : value,
    }));
  };

  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen flex flex-col items-center">
      <Header title="Editar gasto" centered backLink="/home" />
      <main className="w-full max-w-2xl p-4 mt-6">
        <div className="bg-white text-gray-800 rounded-lg shadow-lg p-8 relative">
          <button
            type="button"
            onClick={handleDelete}
            className="absolute top-4 right-4 text-red-600 hover:text-red-800 focus:outline-none"
          >
            <FaTrash />
          </button>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  value={debt.nome}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Nome"
                />
              </div>
              <div>
                <label htmlFor="numeroParcelas" className="block text-sm font-medium text-gray-700">Número de Parcelas</label>
                <input
                  id="numeroParcelas"
                  name="numeroParcelas"
                  type="number"
                  value={debt.numeroParcelas}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Número de Parcelas"
                />
              </div>
              <div>
                <label htmlFor="valorParcela" className="block text-sm font-medium text-gray-700">Valor da Parcela</label>
                <input
                  id="valorParcela"
                  name="valorParcela"
                  type="number"
                  step="0.01"
                  value={debt.valorParcela}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Valor da Parcela"
                />
              </div>
              <div>
                <label htmlFor="mesInicio" className="block text-sm font-medium text-gray-700">Mês de Início</label>
                <input
                  id="mesInicio"
                  name="mesInicio"
                  type="month"
                  value={debt.mesInicio}
                  onChange={handleChange}
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition ease-in-out"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
