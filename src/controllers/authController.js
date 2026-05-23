import { prisma } from "../prisma/client.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// REGISTER
export const register = async (req, res) => {
  try {
    const { nome, sobrenome, email, senha, cpf, telefone, sexo, dataNascimento } = req.body

    // verificar email
    const emailExiste = await prisma.usuario.findUnique({ where: { email } })
    if (emailExiste) {
      return res.status(400).json({ erro: "Este e-mail já está cadastrado." })
    }

    // verificar cpf
    const cpfExiste = await prisma.usuario.findUnique({ where: { cpf } })
    if (cpfExiste) {
      return res.status(400).json({ erro: "Este CPF já está cadastrado." })
    }

    // hash senha
    const senhaHash = await bcrypt.hash(senha, 10)

    // criar usuário
    const user = await prisma.usuario.create({
      data: {
        nome,
        sobrenome,
        email,
        senha: senhaHash,
        cpf,
        telefone,
        sexo,
        dataNascimento: new Date(dataNascimento)
      }
    })

    // criar carrinho automático
    await prisma.carrinho.create({ data: { usuarioId: user.id } })

    const { senha: _, ...userSemSenha } = user
    return res.status(201).json(userSemSenha)

  } catch (err) {
    return res.status(500).json({ erro: "Erro interno. Tente novamente mais tarde." })
  }
}

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body

    const user = await prisma.usuario.findUnique({ where: { email } })

    if (!user) {
      return res.status(400).json({ erro: "E-mail não encontrado." })
    }

    const senhaValida = await bcrypt.compare(senha, user.senha)

    if (!senhaValida) {
      return res.status(400).json({ erro: "Senha incorreta." })
    }

    const token = jwt.sign(
      { id: user.id },
      "SEGREDO_SUPER_SECRETO",
      { expiresIn: "1d" }
    )

    const { senha: _, ...userSemSenha } = user

    return res.json({
      user: userSemSenha,
      token,
      role: user.role
    })

  } catch (err) {
    return res.status(500).json({ erro: "Erro interno. Tente novamente mais tarde." })
  }
}