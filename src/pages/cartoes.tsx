"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MainLayout from "@/components/MainLayout";
import Header from "@/components/Header";

export default function Cartoes() {
  const [cartoes, setCartoes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCartoes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/cartoes');
        if (response.ok) {
          const data = await response.json();
          setCartoes(data);
        } else {
          console.error('Failed to fetch cards');
        }
      } catch (error) {
        console.error('Failed to fetch cards', error);
      }
    };

    fetchCartoes();
  }, []);

  const handleAddCartaoClick = () => {
    router.push("/novo-cartao");
  };

  const handleCartaoClick = (id) => {
    router.push(`/cartao/${id}`);
  };

  return (
    <MainLayout>
      <Header title="Gerenciar Cartões" centered backLink="/home" />
      <main className="w-full max-w-2xl p-4 mt-6">
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Seus Cartões</h2>
          <ul className="mt-10 flex flex-wrap gap-4">
            {cartoes.map((cartao) => (
              <li
                key={cartao.id}
                className="w-64 h-40 rounded-lg shadow-lg flex flex-col justify-between p-4 cursor-pointer transition transform hover:scale-105 hover:shadow-xl"
                style={{ backgroundColor: cartao.cor }}
                onClick={() => handleCartaoClick(cartao.id)}
              >
                <div className="text-lg text-white">{cartao.nome}</div>
                <div className="text-sm text-white">**** **** **** {cartao.ultimos4}</div>
              </li>
            ))}
            <li>
              <div
                onClick={handleAddCartaoClick}
                className="glass-card w-64 h-40 rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition transform hover:scale-105"
              >
                <div className="text-center text-2xl text-gray-700">+</div>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </MainLayout>
  );
}
