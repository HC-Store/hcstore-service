import { prisma } from "../prisma/client.js";

export const criarImagem = async (req, res) => {
  try {
    const { url, produtoId } = req.body;
    const imagem = await prisma.produtoImagem.create({
      data: {
        url,
        produtoId: Number(produtoId)
      }
    });
    return res.json(imagem);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const listarImagens = async (req, res) => {
  try {
    const imagens = await prisma.produtoImagem.findMany();
    return res.json(imagens);
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const deletarImagem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.produtoImagem.delete({
      where: { id: Number(id) }
    });
    return res.json({ message: "Imagem deletada" });
  } catch (err) {
    return res.status(500).json(err);
  }
};