import { prisma } from "../prisma/client.js";

export const criarCategoria = async (req, res) => {
  const { nome } = req.body;

  const categoria = await prisma.categoria.create({
    data: { nome }
  });

  res.json(categoria);
};

export const listarCategorias = async (req, res) => {
  const categorias = await prisma.categoria.findMany();
  res.json(categorias);
};

export const atualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const categoria = await prisma.categoria.update({
    where: { id: Number(id) },
    data: { nome }
  });

  res.json(categoria);
};

export const deletarCategoria = async (req, res) => {
  const { id } = req.params;

  await prisma.categoria.delete({
    where: { id: Number(id) }
  });

  res.json({ message: "Categoria deletada" });
};