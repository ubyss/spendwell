"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../components/MainLayout";
import Header from "../../components/Header";

export default function CartaoDividas() {
  const [dividas, setDividas] = useState([]);
  const router = useRouter();
  const { id } = router.query; // Obter o id dos parâmetros da rota

  useEffect(() => {
    if (!id) return; // Verificar se o id está disponível

    const fetchDividas = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/cartaoDividas?cartaoId=${id}`);
        if (response.ok) {
          const data = await response.json();
          setDividas(data);
        } else {
          console.error('Failed to fetch card debts');
        }
      } catch (error) {
        console.error('Failed to fetch card debts', error);
      }
    };

    fetchDividas();
  }, [id]);

  const handleAddDividaClick = () => {
    router.push(`/novo-cartao-divida?cartaoId=${id}`);
  };

  return (
    <MainLayout>
      <Header title="Dividas do Cartão" centered backLink="/cartoes" />
      <main className="w-full max-w-2xl p-4 mt-6">
        <ul className="space-y-4">
          {dividas.length === 0 ? (
            <p className="text-center text-lg">Nenhuma dívida cadastrada</p>
          ) : (
            dividas.map((divida) => (
              <li
                key={divida.id}
                className="rounded-lg flex justify-between items-center p-2 bg-white shadow-md"
              >
                <div>
                  <div className="text-lg font-bold">{divida.nome}</div>
                  <div className="text-sm text-gray-600">Parcelas: {divida.numeroParcelas}</div>
                  <div className="text-sm text-gray-600">Valor: R${divida.valorParcela.toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Mês de Início: {new Date(divida.mesInicio).toLocaleDateString()}</div>
                </div>
              </li>
            ))
          )}
        </ul>
        <button
          onClick={handleAddDividaClick}
          className="fixed bottom-4 right-4 bg-[#E8EDF2] text-[#0D141C] rounded-full p-4 shadow-lg transition transform hover:scale-110"
        >
          <img src="/add_icon.svg" alt="Adicionar" className="w-8 h-8" />
        </button>
      </main>
    </MainLayout>
  );
}
