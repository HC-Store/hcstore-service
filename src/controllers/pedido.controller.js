import { prisma } from "../prisma/client.js";

//CRIAR PEDIDO (CHECKOUT)
export const criarPedido = async (req, res) => {
  try {
    const {
      usuarioId,
      enderecoId,
      tipoEntrega,
      frete = 0,
      desconto = 0,
      cupomCodigo = null
    } = req.body;

    const carrinho = await prisma.carrinho.findUnique({
      where: { usuarioId: Number(usuarioId) },
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

    const total = carrinho.itemcarrinho.reduce((acc, item) => {
      return acc + Number(item.produto.preco) * Number(item.quantidade);
    }, 0);

    const totalFinal = total + Number(frete) - Number(desconto);

    const pedido = await prisma.pedido.create({
      data: {
        usuarioId: Number(usuarioId),
        enderecoId: Number(enderecoId),
        total,
        frete: Number(frete),
        desconto: Number(desconto),
        totalFinal,
        tipoEntrega,
        cupomCodigo,
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

    await prisma.itemcarrinho.deleteMany({
      where: {
        carrinhoId: carrinho.id
      }
    });

    res.status(201).json(pedido);

  } catch (err) {
    console.error("Erro ao criar pedido:", err);
    return res.status(500).json({ error: "Erro ao criar pedido." });
  }
};

//LISTAR PEDIDOS
export const listarPedidos = async (req, res) => {
  try {
    const pedidos = await prisma.pedido.findMany({
      include: {
        usuario: true,
        itempedido: {
          include: {
            produto: true
          }
        },
        endereco: true
      }
    });

    res.json(pedidos);

  } catch (err) {
    return res.status(500).json({ error: "Erro ao listar pedidos." });
  }
};

// BUSCAR PEDIDO
export const buscarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const pedido = await prisma.pedido.findUnique({
      where: { id: Number(id) },
      include: {
        itempedido: {
          include: {
            produto: true
          }
        },
        endereco: true,
        usuario: true
      }
    });

    if (!pedido) {
      return res.status(404).json({ error: "Pedido não encontrado." });
    }

    res.json(pedido);

  } catch (err) {
    return res.status(500).json({ error: "Erro ao buscar pedido." });
  }
};

//ATUALIZAR STATUS
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
    return res.status(500).json({ error: "Erro ao atualizar pedido." });
  }
};