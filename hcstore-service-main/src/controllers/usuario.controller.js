import { prisma } from '../prisma/client.js'
import bcrypt from 'bcrypt'

// LISTAR USUÁRIOS (SEM SENHA)
export const listarUsuarios = async (req, res) => {
  try {
    const users = await prisma.usuario.findMany({
      where: { ativo: true },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        email: true,
        cpf: true,
        telefone: true,
        sexo: true,
        dataNascimento: true,
        createdAt: true,
        updatedAt: true
      }
    })

    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar usuários' })
  }
}

// BUSCAR POR ID
export const buscarUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.usuario.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        email: true,
        cpf: true,
        telefone: true,
        sexo: true,
        dataNascimento: true,
        createdAt: true,
        updatedAt: true
      }
    })

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' })
  }
}

// CRIAR USUÁRIO
export const criarUsuario = async (req, res) => {
  try {
    const {
      nome,
      sobrenome,
      email,
      senha,
      cpf,
      telefone,
      sexo,
      dataNascimento
    } = req.body

    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' })
    }

    const existe = await prisma.usuario.findFirst({
      where: {
        OR: [{ email }, { cpf }]
      }
    })

    if (existe) {
      return res.status(400).json({ error: 'Email ou CPF já cadastrado' })
    }

    const hashSenha = await bcrypt.hash(senha, 10)

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        sobrenome,
        email,
        senha: hashSenha,
        cpf,
        telefone,
        sexo,
        dataNascimento: new Date(dataNascimento)
      },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        email: true,
        cpf: true,
        telefone: true,
        sexo: true,
        dataNascimento: true,
        createdAt: true
      }
    })

    res.status(201).json(novoUsuario)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao criar usuário' })
  }
}

// ATUALIZAR USUÁRIO
export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params
    const { nome, sobrenome, email, telefone, sexo } = req.body

    const user = await prisma.usuario.update({
      where: { id: Number(id) },
      data: {
        nome,
        sobrenome,
        email,
        telefone,
        sexo
      },
      select: {
        id: true,
        nome: true,
        sobrenome: true,
        email: true,
        telefone: true,
        sexo: true,
        updatedAt: true
      }
    })

    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' })
  }
}

// DESATIVAR USUÁRIO (SOFT DELETE)
export const desativarUsuario = async (req, res) => {
  try {
    const { id } = req.params

    await prisma.usuario.update({
      where: { id: Number(id) },
      data: { ativo: false }
    })

    res.json({ message: 'Usuário desativado com sucesso' })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao desativar usuário' })
  }
}