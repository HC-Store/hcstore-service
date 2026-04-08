import { prisma } from "../prisma/client.js";

// ✅ ADICIONAR PRODUTO AO CARRINHO
export const adicionarItem = async (req, res) => {
  const { carrinhoId, produtoId, quantidade } = req.body;

  // verifica se já existe o produto no carrinho
  const itemExistente = await prisma.itemcarrinho.findFirst({
    where: {
      carrinhoId,
      produtoId
    }
  });

  if (itemExistente) {
    // se já existe → soma quantidade
    const itemAtualizado = await prisma.itemcarrinho.update({
      where: { id: itemExistente.id },
      data: {
        quantidade: itemExistente.quantidade + quantidade
      }
    });

    return res.json(itemAtualizado);
  }

  // se não existe → cria novo
  const item = await prisma.itemcarrinho.create({
    data: {
      carrinhoId,
      produtoId,
      quantidade
    }
  });

  res.json(item);
};

// ✅ LISTAR ITENS DO CARRINHO
export const listarItens = async (req, res) => {
  const { carrinhoId } = req.params;

  const itens = await prisma.itemcarrinho.findMany({
    where: {
      carrinhoId: Number(carrinhoId)
    },
    include: {
      produto: true
    }
  });

  res.json(itens);
};

// ✅ ATUALIZAR QUANTIDADE
export const atualizarItem = async (req, res) => {
  const { id } = req.params;
  const { quantidade } = req.body;

  const item = await prisma.itemcarrinho.update({
    where: { id: Number(id) },
    data: { quantidade }
  });

  res.json(item);
};

// ✅ REMOVER ITEM
export const removerItem = async (req, res) => {
  const { id } = req.params;

  await prisma.itemcarrinho.delete({
    where: { id: Number(id) }
  });

  res.json({ message: "Item removido" });
};

// ✅ LIMPAR CARRINHO
export const limparCarrinho = async (req, res) => {
  const { carrinhoId } = req.params;

  await prisma.itemcarrinho.deleteMany({
    where: {
      carrinhoId: Number(carrinhoId)
    }
  });

  res.json({ message: "Carrinho limpo" });
};