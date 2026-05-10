import { prisma } from "../prisma/client.js";

// ✅ CRIAR PRODUTO
export const criarProduto = async (req, res) => {
  const { nome, descricao, preco, estoque, categoriaId, marca, tamanho, imagem } = req.body;

  if (!categoriaId) {
    return res.status(400).json({ error: "categoriaId é obrigatório" });
  }

  const categoriaExiste = await prisma.categoria.findUnique({
    where: { id: Number(categoriaId) }
  });

  if (!categoriaExiste) {
    return res.status(400).json({ error: "Categoria não existe" });
  }

  const produto = await prisma.produto.create({
    data: {
      nome,
      descricao,
      preco: Number(preco),
      estoque: Number(estoque),
      categoriaId: Number(categoriaId),
      marca,
      tamanho,
      imagem  // ← adiciona isso
    }
  });

  res.json(produto);
};

// ✅ LISTAR PRODUTOS
export const listarProdutos = async (req, res) => {
  const produtos = await prisma.produto.findMany({
    include: {
      categoria: true,
      imagens: true
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
      categoria: true,
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