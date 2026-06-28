import { prisma } from "../prisma/client.js";

export const criarCupom = async (req, res) => {
  try {
    const { codigo, tipo, valor, ativo = true, usoMaximo } = req.body;

    if (!codigo || !tipo || !valor) {
      return res.status(400).json({ error: "Código, tipo e valor são obrigatórios." });
    }

    const cupom = await prisma.cupom.create({
      data: {
        codigo: codigo.toUpperCase().trim(),
        tipo,
        valor: Number(valor),
        ativo: Boolean(ativo),
        usoMaximo: usoMaximo ? Number(usoMaximo) : null
      }
    });

    res.status(201).json(cupom);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar cupom." });
  }
};

export const listarCupons = async (req, res) => {
  try {
    const cupons = await prisma.cupom.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json(cupons);
  } catch (err) {
    res.status(500).json({ error: "Erro ao listar cupons." });
  }
};

export const deletarCupom = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.cupom.delete({
      where: { id: Number(id) }
    });

    res.json({ message: "Cupom excluído com sucesso." });
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir cupom." });
  }
};

export const validarCupom = async (req, res) => {
  const { codigo, subtotal } = req.body;

  const cupom = await prisma.cupom.findUnique({
    where: { codigo: codigo.toUpperCase() }
  });

  if (!cupom || !cupom.ativo) {
    return res.status(400).json({ error: "Cupom inválido ou inativo." });
  }

  if (cupom.usoMaximo && cupom.usado >= cupom.usoMaximo) {
    return res.status(400).json({ error: "Cupom atingiu o limite de uso." });
  }

  let desconto = 0;

  if (cupom.tipo === "PERCENTUAL") {
    desconto = Number(subtotal) * (Number(cupom.valor) / 100);
  }

  if (cupom.tipo === "FIXO") {
    desconto = Number(cupom.valor);
  }

  if (desconto > Number(subtotal)) {
    desconto = Number(subtotal);
  }

  res.json({
    cupomId: cupom.id,
    codigo: cupom.codigo,
    desconto
  });
};