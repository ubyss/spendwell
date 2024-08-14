import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Retornar todas as dívidas sem filtro
      const dividas = await prisma.debt.findMany();
      res.status(200).json(dividas);
    } catch (error) {
      console.error('Erro ao buscar dívidas:', error);
      res.status(500).json({ error: 'Erro ao buscar dívidas' });
    }
  } else if (req.method === 'POST') {
    const { nome, numeroParcelas, valorParcela, mesInicio } = req.body;

  if (!nome || !numeroParcelas || !valorParcela || !mesInicio) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    // Verifica se a string mesInicio é válida e converte-a para um objeto Date
    const dataInicio = new Date(`${mesInicio}-01`);

    if (isNaN(dataInicio.getTime())) {
      return res.status(400).json({ error: 'Data inválida' });
    }

    const novaDivida = await prisma.debt.create({
      data: {
        name: nome,
        numeroParcelas: Number(numeroParcelas),
        amount: Number(valorParcela),
        parcelaAtual: 1, // A primeira parcela é sempre 1 quando criada
        date: dataInicio,
      },
    });

    res.status(201).json(novaDivida);
  } catch (error) {
    console.error('Erro ao criar dívida:', error);
    res.status(500).json({ error: 'Erro ao criar dívida' });
  }
  } else if (req.method === 'PUT') {
    const { id, nome, numeroParcelas, valorParcela, mesInicio } = req.body;

    if (!id || !nome || !numeroParcelas || !valorParcela || !mesInicio) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const dividaAtualizada = await prisma.debt.update({
        where: { id: Number(id) },
        data: {
          name: nome,
          numeroParcelas: Number(numeroParcelas),
          amount: Number(valorParcela),
          date: new Date(`${mesInicio}-01`),
        },
      });

      res.status(200).json(dividaAtualizada);
    } catch (error) {
      console.error('Erro ao atualizar dívida:', error);
      res.status(500).json({ error: 'Erro ao atualizar dívida' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'Parâmetro "id" é obrigatório e deve ser uma string válida' });
    }

    try {
      await prisma.debt.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({ message: 'Dívida deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar dívida:', error);
      res.status(500).json({ error: 'Erro ao deletar dívida' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
