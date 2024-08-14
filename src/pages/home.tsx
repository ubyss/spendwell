"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format, addMonths, subMonths } from "date-fns";
import Header from "../components/Header";
import MainLayout from "../components/MainLayout";
import Link from "next/link";

interface Debt {
  id: number;
  name: string;
  amount: number;
  date: string;
  numeroParcelas: number;
  parcelaAtual: number;
  cardId?: number | null;
}

export default function Home() {
  const [mesAtual, setMesAtual] = useState(new Date());
  const [todasDividas, setTodasDividas] = useState<Debt[]>([]);
  const [dividasFiltradas, setDividasFiltradas] = useState<Debt[]>([]);
  const router = useRouter();

  // Carregar todas as dívidas uma vez
  const carregarTodasDividas = async () => {
    const response = await fetch(`/api/dividas`);
    const data: Debt[] = await response.json();
    setTodasDividas(data ?? []);
  };

  // Filtrar dívidas com base no mês selecionado
  const filtrarDividasPorMes = (mes: Date) => {
    const dividasNoMes = todasDividas.map((divida) => {
      const dataInicial = new Date(divida.date);
      const numeroDeMesesPassados = Math.floor((mes.getTime() - dataInicial.getTime()) / (1000 * 60 * 60 * 24 * 30));
      const parcelaAtual = divida.parcelaAtual + numeroDeMesesPassados;

      return {
        ...divida,
        parcelaAtual,
      };
    }).filter((divida) => divida.parcelaAtual > 0 && divida.parcelaAtual <= divida.numeroParcelas);

    setDividasFiltradas(dividasNoMes ?? []);
  };

  useEffect(() => {
    carregarTodasDividas();
  }, []);

  useEffect(() => {
    filtrarDividasPorMes(mesAtual);
  }, [mesAtual, todasDividas]);

  const handleMesAnterior = () => {
    const novoMes = subMonths(mesAtual, 1);
    setMesAtual(novoMes);
  };

  const handleProximoMes = () => {
    const novoMes = addMonths(mesAtual, 1);
    setMesAtual(novoMes);
  };

  const handleEdit = (divida: Debt) => {
    const formatDateToMonth = (date: Date) => {
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, '0');
      return `${year}-${month}`;
    };


    const query = {
      id: divida.id,
      nome: divida.name,
      valorParcela: divida.amount,
      numeroParcelas: divida.numeroParcelas,
      parcelaAtual: divida.parcelaAtual,
      mesInicio: formatDateToMonth(new Date(divida.date as string)),
    };

    router.push({
      pathname: '/editar-divida',
      query,
    });
  };

  const handleCartoesClick = () => {
    router.push('/cartoes');
  };

  const valorTotalDividas = dividasFiltradas.reduce(
    (total, divida) => total + divida.amount,
    0
  );

  return (
    <MainLayout>
      <Header title="SpendWell" />
      <main className="w-full max-w-2xl p-4 flex flex-col items-center flex-grow">
        <div className="flex justify-between items-center my-8 w-full">
          <button
            className="text-[#0D141C] bg-[#E8EDF2] px-4 py-2 rounded-md shadow-sm transition hover:bg-[#cdd5df] disabled:opacity-50"
            onClick={handleMesAnterior}
            disabled={format(mesAtual, 'yyyy-MM') === format(new Date(), 'yyyy-MM')}
          >
            &larr; Mês Anterior
          </button>
          <h1 className="text-4xl font-bold">{format(mesAtual, 'MMMM yyyy')}</h1>
          <button
            className="text-[#0D141C] bg-[#E8EDF2] px-4 py-2 rounded-md shadow-sm transition hover:bg-[#cdd5df]"
            onClick={handleProximoMes}
          >
            Próximo Mês &rarr;
          </button>
        </div>
        <div className="mt-6 text-xl flex justify-center mb-4 font-bold w-full">
          <div>R${valorTotalDividas.toFixed(2)}</div>
        </div>
        <div className="bg-[#F7FAFC] text-[#0D141C] rounded-lg max-h-96 overflow-y-auto custom-scrollbar w-full pr-4">
          <ul className="space-y-4 w-full">
            <li
              className="rounded-lg flex justify-between items-center p-2 bg-[#FFD700] cursor-pointer hover:bg-[#FFC700] transition ease-out"
              onClick={handleCartoesClick}
            >
              <div className="flex items-center space-x-3">
                <img src="/card_icon.svg" alt="Cartões" className="w-10 h-10 p-2 rounded-lg" />
                <div>
                  <div className="text-16px font-bold">Cartões</div>
                  <div className="text-sm text-[#4F7396]/70">Gerencie seus cartões</div>
                </div>
              </div>
            </li>
            {dividasFiltradas.length === 0 ? (
              <p className="text-center text-lg">Cadastre uma nova dívida</p>
            ) : (
              dividasFiltradas.map((divida) => (
                <li
                  key={divida.id}
                  className="rounded-lg flex justify-between items-center p-2 cursor-pointer hover:bg-[#D1D5DB] transition ease-out"
                  onClick={() => handleEdit(divida)}
                >
                  <div className="flex items-center space-x-3">
                    <img src="/lamp.svg" alt={divida.name} className="w-10 h-10 bg-[#E8EDF2] p-2 rounded-lg" />
                    <div>
                      <div className="text-16px font-bold">
                        R${divida.amount.toFixed(2)}
                      </div>
                      <div className="text-sm text-[#4F7396]/70">
                        {divida.name} - Parcela {divida.parcelaAtual}/{divida.numeroParcelas}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button onClick={() => handleEdit(divida)}>
                      <img src="/right_arrow.svg" alt="Editar" className="w-6 h-6 p-1" />
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <Link href="/nova-divida">
          <span className="fixed bottom-4 right-4 bg-[#E8EDF2] text-[#0D141C] rounded-[6px] p-4 shadow-lg transition transform hover:scale-110">
            <img src="/add_icon.svg" alt="Adicionar" className="w-8 h-8" />
          </span>
        </Link>
      </main>
    </MainLayout>
  );
}
