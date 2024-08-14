"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import MainLayout from "@/components/MainLayout";
import Header from "@/components/Header";

export default function NovaDividaCartao() {
  const [nome, setNome] = useState("");
  const [numeroParcelas, setNumeroParcelas] = useState(1);
  const [valorParcela, setValorParcela] = useState("");
  const [mesInicio, setMesInicio] = useState("");
  const router = useRouter();
  const { cartaoId } = router.query; // Obter o id do cartão dos parâmetros da rota

  const handleAddDivida = async (e) => {
    e.preventDefault();
    const novaDivida = {
      cartaoId,
      nome,
      numeroParcelas,
      valorParcela: parseFloat(valorParcela),
      mesInicio,
    };
    // Adicione lógica para salvar a dívida no backend
    try {
      const response = await fetch('http://localhost:3001/api/cartaoDividas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaDivida),
      });
      if (response.ok) {
        router.push(`/cartao/${cartaoId}`);
      } else {
        console.error('Failed to add debt');
      }
    } catch (error) {
      console.error('Failed to add debt', error);
    }
  };

  return (
    <MainLayout>
      <Header title="Adicionar Dívida" centered backLink={`/cartao/${cartaoId}`} />
      <main className="w-full max-w-2xl p-4 mt-6">
        <form onSubmit={handleAddDivida} className="space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nome da Dívida"
              />
            </div>
            <div>
              <label htmlFor="numeroParcelas" className="block text-sm font-medium text-gray-700">
                Número de Parcelas
              </label>
              <input
                id="numeroParcelas"
                name="numeroParcelas"
                type="number"
                value={numeroParcelas}
                onChange={(e) => setNumeroParcelas(Number(e.target.value))}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Número de Parcelas"
              />
            </div>
            <div>
              <label htmlFor="valorParcela" className="block text-sm font-medium text-gray-700">
                Valor da Parcela
              </label>
              <input
                id="valorParcela"
                name="valorParcela"
                type="number"
                step="0.01"
                value={valorParcela}
                onChange={(e) => setValorParcela(Number(e.target.value))}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Valor da Parcela"
              />
            </div>
            <div>
              <label htmlFor="mesInicio" className="block text-sm font-medium text-gray-700">
                Mês de Início
              </label>
              <input
                id="mesInicio"
                name="mesInicio"
                type="month"
                value={mesInicio}
                onChange={(e) => setMesInicio(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Adicionar Dívida
            </button>
          </div>
        </form>
      </main>
    </MainLayout>
  );
}
