"use client";

import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";

export default function NovoCartao() {
  const [nomeCartao, setNomeCartao] = useState("");
  const [corCartao, setCorCartao] = useState("#000000");
  const [ultimosNumeros, setUltimosNumeros] = useState("");
  const router = useRouter();

  const handleCorChange = (e) => {
    setCorCartao(e.target.value);
  };

  const handleAddCartao = async (e) => {
    e.preventDefault();
    const novoCartao = {
      nome: nomeCartao,
      cor: corCartao,
      ultimos4: ultimosNumeros,
    };

    try {
      const response = await fetch('http://localhost:3001/api/cartoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoCartao),
      });

      if (response.ok) {
        router.push('/cartoes');
      } else {
        console.error('Failed to create card');
      }
    } catch (error) {
      console.error('Failed to create card', error);
    }
  };

  return (
    <MainLayout>
      <Header title="Criar Novo Cartão" centered backLink="/cartoes" />
      <main className="w-full max-w-2xl p-4 mt-6">
        <form onSubmit={handleAddCartao} className="space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="nomeCartao" className="block text-sm font-medium text-gray-700">
                Nome do Cartão
              </label>
              <input
                id="nomeCartao"
                name="nomeCartao"
                type="text"
                value={nomeCartao}
                onChange={(e) => setNomeCartao(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Nome do Cartão"
              />
            </div>
            <div>
              <label htmlFor="ultimosNumeros" className="block text-sm font-medium text-gray-700">
                Últimos 4 Dígitos
              </label>
              <input
                id="ultimosNumeros"
                name="ultimosNumeros"
                type="text"
                maxLength={4}
                value={ultimosNumeros}
                onChange={(e) => setUltimosNumeros(e.target.value)}
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="1234"
              />
            </div>
            <div>
              <label htmlFor="corCartao" className="block text-sm font-medium text-gray-700">
                Cor do Cartão
              </label>
              <input
                id="corCartao"
                name="corCartao"
                type="color"
                value={corCartao}
                onChange={handleCorChange}
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Adicionar Cartão
            </button>
          </div>
        </form>
        <div className="mt-8 flex justify-center">
          <div
            className="w-64 h-40 rounded-lg shadow-lg flex flex-col justify-between p-4"
            style={{ backgroundColor: corCartao }}
          >
            <div className="text-lg text-white">{nomeCartao}</div>
            <div className="text-white">
              <div className="text-sm">**** **** **** {ultimosNumeros}</div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
