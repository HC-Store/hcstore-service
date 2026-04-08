import { prisma } from "../prisma/client.js";

// ✅ CRIAR PRODUTO
export const criarProduto = async (req, res) => {
  const { nome, descricao, preco, estoque, categoriaId, imagem } = req.body;

  const produto = await prisma.produto.create({
    data: {
      nome,
      descricao,
      preco,
      estoque,
      categoriaId,
      imagem
    }
  });

  res.json(produto);
};

// ✅ LISTAR PRODUTOS
export const listarProdutos = async (req, res) => {
  const produtos = await prisma.produto.findMany({
    include: {
      categoria: true
    }
  });

  res.json(produtos);
};

// ✅ BUSCAR PRODUTO POR ID
export const buscarProduto = async (req, res) => {
  const { id } = req.params;

  const produto = await prisma.produto.findUnique({
    where: { id: Number(id) },
    include: {
      categoria: true
    }
  });

  res.json(produto);
};

// ✅ ATUALIZAR PRODUTO
export const atualizarProduto = async (req, res) => {
  const { id } = req.params;

  const produto = await prisma.produto.update({
    where: { id: Number(id) },
    data: req.body
  });

  res.json(produto);
};

// ✅ DELETAR PRODUTO
export const deletarProduto = async (req, res) => {
  const { id } = req.params;

  await prisma.produto.delete({
    where: { id: Number(id) }
  });

  res.json({ message: "Produto deletado" });
};