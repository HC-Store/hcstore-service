import { prisma } from "../prisma/client.js";

// ✅ CRIAR CARRINHO
export const criarCarrinho = async (req, res) => {
  try {
    const usuarioId = req.user.id // 🔥 vem do token

    const carrinho = await prisma.carrinho.create({
      data: {
        usuarioId
      }
    });

    return res.json(carrinho);
  } catch (err) {
    return res.status(500).json(err);
  }
};


// ✅ BUSCAR CARRINHO DO USUÁRIO
export const buscarCarrinho = async (req, res) => {
  try {
    const usuarioId = req.user.id // 🔥 vem do token

    const carrinho = await prisma.carrinho.findUnique({
      where: {
        usuarioId
      },
      include: {
        itemcarrinho: {
          include: {
            produto: true
          }
        }
      }
    });

    return res.json(carrinho);
  } catch (err) {
    return res.status(500).json(err);
  }
};