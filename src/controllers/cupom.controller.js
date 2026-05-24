import { prisma } from "../prisma/client.js";

export const criarCupom = async (req, res) => {
  try {
    const { codigo, tipo, valor, ativo, usoMaximo } = req.body;

    const cupom = await prisma.cupom.create({
      data: {
        codigo: codigo.toUpperCase(),
        tipo,
        valor: Number(valor),
        ativo,
        usoMaximo
      }
    });

    res.status(201).json(cupom);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar cupom" });
  }
};

export const listarCupons = async (req, res) => {
  const cupons = await prisma.cupom.findMany();
  res.json(cupons);
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