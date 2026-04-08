import { prisma } from "../prisma/client.js";

// ✅ CRIAR CARRINHO
export const criarCarrinho = async (req, res) => {
  const { usuarioId } = req.body;

  const carrinho = await prisma.carrinho.create({
    data: {
      usuarioId
    }
  });

  res.json(carrinho);
};

// ✅ BUSCAR CARRINHO DO USUÁRIO
export const buscarCarrinho = async (req, res) => {
  const { usuarioId } = req.params;

  const carrinho = await prisma.carrinho.findUnique({
    where: {
      usuarioId: Number(usuarioId)
    },
    include: {
      itemcarrinho: {
        include: {
          produto: true
        }
      }
    }
  });

  res.json(carrinho);
};