import { prisma } from "../prisma/client.js"
import  bcrypt  from "bcrypt"
import  jwt  from "jsonwebtoken"

// 📌 REGISTER (cadastro)
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

    // verificar email
    const userExist = await prisma.usuario.findUnique({
      where: { email }
    })

    if (userExist) {
      return res.status(400).json({ erro: "Email já cadastrado" })
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

    // 🔥 criar carrinho automático
    await prisma.carrinho.create({
      data: {
        usuarioId: user.id
      }
    })

    // remover senha da resposta
    const { senha: _, ...userSemSenha } = user

    return res.status(201).json(userSemSenha)

  } catch (err) {
    return res.status(500).json(err)
  }
}


// 📌 LOGIN
export const login = async (req, res) => {
  try {
    const { email, senha } = req.body

    // buscar usuário
    const user = await prisma.usuario.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({ erro: "Usuário não encontrado" })
    }

    // verificar senha
    const senhaValida = await bcrypt.compare(senha, user.senha)

    if (!senhaValida) {
      return res.status(400).json({ erro: "Senha inválida" })
    }

    // gerar token
    const token = jwt.sign(
      { id: user.id },
      "SEGREDO_SUPER_SECRETO", // ⚠️ depois jogar no .env
      { expiresIn: "1d" }
    )

    // remover senha
    const { senha: _, ...userSemSenha } = user

    return res.json({
      user: userSemSenha,
      token
    })

  } catch (err) {
    return res.status(500).json(err)
  }
}