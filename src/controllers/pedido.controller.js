import { prisma } from "../prisma/client.js";

// ✅ CRIAR PEDIDO (CHECKOUT)
export const criarPedido = async (req, res) => {
  const { usuarioId, enderecoId } = req.body;

  // busca carrinho do usuário
  const carrinho = await prisma.carrinho.findUnique({
    where: { usuarioId },
    include: {
      itemcarrinho: {
        include: {
          produto: true
        }
      }
    }
  });

  if (!carrinho || carrinho.itemcarrinho.length === 0) {
    return res.status(400).json({ error: "Carrinho vazio" });
  }

  // calcula total
  const total = carrinho.itemcarrinho.reduce((acc, item) => {
    return acc + Number(item.produto.preco) * item.quantidade;
  }, 0);

  // cria pedido
  const pedido = await prisma.pedido.create({
    data: {
      usuarioId,
      enderecoId,
      total,
      itempedido: {
        create: carrinho.itemcarrinho.map(item => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          preco: item.produto.preco
        }))
      }
    },
    include: {
      itempedido: true
    }
  });

  // limpa carrinho
  await prisma.itemcarrinho.deleteMany({
    where: {
      carrinhoId: carrinho.id
    }
  });

  res.json(pedido);
};

// ✅ LISTAR PEDIDOS
export const listarPedidos = async (req, res) => {
  const pedidos = await prisma.pedido.findMany({
    include: {
      usuario: true,  // ← adiciona isso
      itempedido: {
        include: {
          produto: true
        }
      },
      endereco: true
    }
  });

  res.json(pedidos);
};

// ✅ BUSCAR PEDIDO
export const buscarPedido = async (req, res) => {
  const { id } = req.params;

  const pedido = await prisma.pedido.findUnique({
    where: { id: Number(id) },
    include: {
      itempedido: {
        include: {
          produto: true
        }
      },
      endereco: true
    }
  });

  res.json(pedido);
};

// ✅ ATUALIZAR STATUS
export const atualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pedido = await prisma.pedido.update({
      where: { id: Number(id) },
      data: { status }
    });

    res.json(pedido);
  } catch (err) {
    return res.status(500).json(err);
  }
};