import { prisma } from "../prisma/client.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import {
  validarEmail,
  validarTelefone,
  validarCPF
} from "../utils/validacoes.js"

const codigosRecuperacao = new Map()
const TEMPO_EXPIRACAO_CODIGO = 15 * 60 * 1000

const gerarCodigoRecuperacao = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

const removerSenha = (user) => {
  if (!user) return null
  const { senha: _, ...userSemSenha } = user
  return userSemSenha
}

const criarTransporterEmail = () => {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM
  } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    throw new Error("SMTP não configurado.")
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    },
    from: SMTP_FROM || SMTP_USER
  })
}

const enviarEmailRecuperacao = async (email, codigo) => {
  const transporter = criarTransporterEmail()
  const from = process.env.SMTP_FROM || process.env.SMTP_USER

  await transporter.sendMail({
    from,
    to: email,
    subject: "Código de recuperação de senha - HC Store",
    text: `Seu código de recuperação de senha é ${codigo}. Ele expira em 15 minutos.`,
    html: `
      <p>Olá!</p>
      <p>Seu código de recuperação de senha é:</p>
      <h2>${codigo}</h2>
      <p>Ele expira em 15 minutos.</p>
    `
  })
}

const buscarUsuarioPorEmail = async (email) => {
  return prisma.usuario.findUnique({
    where: { email }
  })
}

// REGISTER
export const register = async (req, res) => {
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

    if (!validarEmail(email)) {
      return res.status(400).json({
        erro: "Email inválido."
      })
    }

    if (!validarCPF(cpf)) {
      return res.status(400).json({
        erro: "CPF inválido."
      })
    }

    if (!validarTelefone(telefone)) {
      return res.status(400).json({
        erro: "Telefone inválido."
      })
    }

    const emailExiste = await prisma.usuario.findUnique({
      where: { email }
    })

    if (emailExiste) {
      return res.status(400).json({
        erro: "Este e-mail já está cadastrado."
      })
    }

    const cpfExiste = await prisma.usuario.findUnique({
      where: { cpf }
    })

    if (cpfExiste) {
      return res.status(400).json({
        erro: "Este CPF já está cadastrado."
      })
    }

    const senhaHash = await bcrypt.hash(senha, 10)

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

    await prisma.carrinho.create({
      data: {
        usuarioId: user.id
      }
    })

    const { senha: _, ...userSemSenha } = user

    return res.status(201).json(userSemSenha)

  } catch (err) {
    console.error(err)

    return res.status(500).json({
      erro: "Erro interno. Tente novamente mais tarde."
    })
  }
}

// ESQUECI MINHA SENHA
export const forgotPassword = async (req, res) => {
  try {
    const email = req.body?.email?.trim().toLowerCase()

    if (!email || !validarEmail(email)) {
      return res.status(400).json({
        erro: "Informe um e-mail válido."
      })
    }

    const user = await buscarUsuarioPorEmail(email)

    if (!user) {
      return res.status(404).json({
        erro: "E-mail não cadastrado."
      })
    }

    if (!user.ativo) {
      return res.status(403).json({
        erro: "Usuário desativado."
      })
    }

    const codigo = gerarCodigoRecuperacao()

    codigosRecuperacao.set(email, {
      codigo,
      usuarioId: user.id,
      expiraEm: Date.now() + TEMPO_EXPIRACAO_CODIGO
    })

    await enviarEmailRecuperacao(email, codigo)

    return res.json({
      mensagem: "Código enviado para seu e-mail."
    })

  } catch (err) {
    console.error(err)

    if (err.message === "SMTP não configurado.") {
      return res.status(500).json({
        erro: "Envio de e-mail não configurado no servidor."
      })
    }

    return res.status(500).json({
      erro: "Não foi possível enviar o código agora."
    })
  }
}

// VERIFICAR CÓDIGO
export const verifyResetCode = async (req, res) => {
  try {
    const email = req.body?.email?.trim().toLowerCase()
    const codigo = req.body?.codigo?.trim()

    if (!email || !codigo) {
      return res.status(400).json({
        erro: "Informe o e-mail e o código."
      })
    }

    const recuperacao = codigosRecuperacao.get(email)

    if (!recuperacao || recuperacao.codigo !== codigo) {
      return res.status(400).json({
        erro: "Código inválido."
      })
    }

    if (Date.now() > recuperacao.expiraEm) {
      codigosRecuperacao.delete(email)
      return res.status(400).json({
        erro: "Código expirado. Solicite um novo código."
      })
    }

    const user = await prisma.usuario.findUnique({
      where: { id: recuperacao.usuarioId }
    })

    return res.json({
      usuario: removerSenha(user)
    })

  } catch (err) {
    console.error(err)

    return res.status(500).json({
      erro: "Não foi possível validar o código agora."
    })
  }
}

// REDEFINIR SENHA
export const resetPassword = async (req, res) => {
  try {
    const email = req.body?.email?.trim().toLowerCase()
    const codigo = req.body?.codigo?.trim()
    const senha = req.body?.senha

    if (!email || !codigo || !senha) {
      return res.status(400).json({
        erro: "Informe o e-mail, o código e a nova senha."
      })
    }

    const recuperacao = codigosRecuperacao.get(email)

    if (!recuperacao || recuperacao.codigo !== codigo) {
      return res.status(400).json({
        erro: "Código inválido."
      })
    }

    if (Date.now() > recuperacao.expiraEm) {
      codigosRecuperacao.delete(email)
      return res.status(400).json({
        erro: "Código expirado. Solicite um novo código."
      })
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    await prisma.usuario.update({
      where: { id: recuperacao.usuarioId },
      data: { senha: senhaHash }
    })

    codigosRecuperacao.delete(email)

    return res.json({
      mensagem: "Senha redefinida com sucesso."
    })

  } catch (err) {
    console.error(err)

    return res.status(500).json({
      erro: "Não foi possível redefinir a senha agora."
    })
  }
}

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body

    const user = await prisma.usuario.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({
        erro: "E-mail não encontrado."
      })
    }

    // BLOQUEIA LOGIN DE USUÁRIOS DESATIVADOS
    if (!user.ativo) {
      return res.status(403).json({
        erro: "Usuário desativado."
      })
    }

    const senhaValida = await bcrypt.compare(
      senha,
      user.senha
    )

    if (!senhaValida) {
      return res.status(400).json({
        erro: "Senha incorreta."
      })
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
    console.error(err)

    return res.status(500).json({
      erro: "Erro interno. Tente novamente mais tarde."
    })
  }
}
