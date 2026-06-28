import { prisma } from "../prisma/client.js";

export const registrarVendaPresencial = async (req, res) => {
  try {
    const { produtoId, tamanho, quantidade } = req.body;

    if (!produtoId || !tamanho || !quantidade) {
      return res.status(400).json({
        error: "Produto, tamanho e quantidade são obrigatórios."
      });
    }

    const produto = await prisma.produto.findUnique({
      where: { id: Number(produtoId) }
    });

    if (!produto) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    const quantidadeVenda = Number(quantidade);

    const estoquePorTamanho = produto.quantidadePorTamanho
      ? JSON.parse(produto.quantidadePorTamanho)
      : {};

    const estoqueAtual = Number(estoquePorTamanho[tamanho] || 0);

    if (estoqueAtual < quantidadeVenda) {
      return res.status(400).json({
        error: `Estoque insuficiente no tamanho ${tamanho}. Disponível: ${estoqueAtual}`
      });
    }

    estoquePorTamanho[tamanho] = estoqueAtual - quantidadeVenda;

    const produtoAtualizado = await prisma.produto.update({
      where: { id: Number(produtoId) },
      data: {
        quantidadePorTamanho: JSON.stringify(estoquePorTamanho),
        estoque: {
          decrement: quantidadeVenda
        }
      },
      include: {
        categoria: true,
        imagens: true
      }
    });

    return res.json({
      message: "Venda presencial registrada com sucesso.",
      produto: produtoAtualizado
    });
  } catch (error) {
    console.error("Erro ao registrar venda presencial:", error);
    return res.status(500).json({
      error: "Erro ao registrar venda presencial."
    });
  }
};