import { prisma } from "../prisma/client.js";

export const listarImagens = async (req, res) => {
  try {
    const imagens = await prisma.produtoImagem.findMany({
      include: {
        produto: true,
      },
    });
    res.json(imagens);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar imagens" });
  }
};

export const criarImagem = async (req, res) => {
  try {
    const { url, produtoId } = req.body;
    const imagem = await prisma.produtoImagem.create({
      data: { url, produtoId },
    });
    res.status(201).json(imagem);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar imagem" });
  }
};

export const deletarImagem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.produtoImagem.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Imagem deletada" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar imagem" });
  }
};