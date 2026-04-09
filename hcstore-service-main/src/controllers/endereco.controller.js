import { prisma } from "../prisma/client.js";

// ✅ CRIAR ENDEREÇO (checkout / cadastro)
export const criarEndereco = async (req, res) => {
  const { rua, numero, cidade, estado, cep, usuarioId } = req.body;

  const endereco = await prisma.endereco.create({
    data: {
      rua,
      numero,
      cidade,
      estado,
      cep,
      usuarioId
    }
  });

  res.json(endereco);
};

// ✅ LISTAR TODOS
export const listarEnderecos = async (req, res) => {
  const enderecos = await prisma.endereco.findMany({
    include: {
      usuario: true
    }
  });

  res.json(enderecos);
};

// ✅ BUSCAR POR ID
export const buscarEndereco = async (req, res) => {
  const { id } = req.params;

  const endereco = await prisma.endereco.findUnique({
    where: { id: Number(id) },
    include: {
      usuario: true
    }
  });

  res.json(endereco);
};

// ✅ ATUALIZAR
export const atualizarEndereco = async (req, res) => {
  const { id } = req.params;

  const endereco = await prisma.endereco.update({
    where: { id: Number(id) },
    data: req.body
  });

  res.json(endereco);
};

// ✅ DELETAR
export const deletarEndereco = async (req, res) => {
  const { id } = req.params;

  await prisma.endereco.delete({
    where: { id: Number(id) }
  });

  res.json({ message: "Endereço deletado" });
};