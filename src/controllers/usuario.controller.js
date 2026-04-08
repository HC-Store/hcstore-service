import { prisma } from '../prisma/client.js'

export const listarUsuarios = async (req, res) => {
  const users = await prisma.usuario.findMany()
  res.json(users)
}

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

    // validação básica
    if (!nome || !email || !senha) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' })
    }

    // verifica duplicado
    const existe = await prisma.usuario.findFirst({
      where: {
        OR: [{ email }, { cpf }]
      }
    })

    if (existe) {
      return res.status(400).json({ error: 'Email ou CPF já cadastrado' })
    }

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        sobrenome,
        email,
        senha,
        cpf,
        telefone,
        sexo,
        dataNascimento: new Date(dataNascimento)
      }
    })

    res.status(201).json(novoUsuario)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro ao criar usuário' })
  }
}