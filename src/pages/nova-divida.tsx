"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import Header from '../components/Header';

export default function NovaDivida() {
  const [nome, setNome] = useState('');
  const [numeroParcelas, setNumeroParcelas] = useState(1);
  const [valorParcela, setValorParcela] = useState('');
  const [mesInicio, setMesInicio] = useState(format(new Date(), 'yyyy-MM'));
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/dividas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          numeroParcelas,
          valorParcela,
          mesInicio
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create debt');
      }

      router.push('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-[#F7FAFC] text-[#0D141C] min-h-screen flex flex-col items-center font-work-sans">
      <Header title="Criar novo gasto" centered backLink={'/home'} />

      <main className="w-full max-w-2xl p-4 mt-6">
        <div className="bg-[#FFFFFF] text-[#0D141C] rounded-lg shadow-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="nome" className="sr-only">Nome</label>
                <input
                  id="nome"
                  name="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#6C7A89] focus:border-[#6C7A89] focus:z-10 sm:text-sm"
                  placeholder="Nome"
                />
              </div>
              <div>
                <label htmlFor="numeroParcelas" className="sr-only">Número de Parcelas</label>
                <input
                  id="numeroParcelas"
                  name="numeroParcelas"
                  type="number"
                  value={numeroParcelas}
                  onChange={(e) => setNumeroParcelas(Number(e.target.value))}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6C7A89] focus:border-[#6C7A89] focus:z-10 sm:text-sm"
                  placeholder="Número de Parcelas"
                />
              </div>
              <div>
                <label htmlFor="valorParcela" className="sr-only">Valor da Parcela</label>
                <input
                  id="valorParcela"
                  name="valorParcela"
                  type="number"
                  step="0.01"
                  value={valorParcela}
                  onChange={(e) => setValorParcela(Number(e.target.value))}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#6C7A89] focus:border-[#6C7A89] focus:z-10 sm:text-sm"
                  placeholder="Valor da Parcela"
                />
              </div>
              <div>
                <label htmlFor="mesInicio" className="sr-only">Mês de Início</label>
                <input
                  id="mesInicio"
                  name="mesInicio"
                  type="month"
                  value={mesInicio}
                  onChange={(e) => setMesInicio(e.target.value)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#6C7A89] focus:border-[#6C7A89] focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-[#FFFFFF] bg-[#6C7A89] hover:bg-[#5B687A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6C7A89]"
              >
                Cadastrar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
