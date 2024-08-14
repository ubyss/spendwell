import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function DebtForm({ initialData, onSubmit }) {
  const [id, setId] = useState(initialData?.id || '');
  const [nome, setNome] = useState(initialData?.nome || '');
  const [numeroParcelas, setNumeroParcelas] = useState(initialData?.numeroParcelas || 1);
  const [valorParcela, setValorParcela] = useState(initialData?.valorParcela || '');
  const [mesInicio, setMesInicio] = useState(initialData?.mesInicio || format(new Date(), 'yyyy-MM'));
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await onSubmit({ id, nome, numeroParcelas, valorParcela, mesInicio });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
            className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
            className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
        </div>
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <div>
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {initialData ? 'Salvar' : 'Cadastrar'}
        </button>
      </div>
    </form>
  );
}
