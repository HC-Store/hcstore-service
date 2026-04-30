import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    // ❌ sem token
    if (!authHeader) {
      return res.status(401).json({ erro: "Token não fornecido" })
    }

    // formato: Bearer TOKEN
    const token = authHeader.split(" ")[1]

    // verificar token
    const decoded = jwt.verify(token, "SEGREDO_SUPER_SECRETO")

    // salvar usuário na req
    req.user = decoded

    next()

  } catch (err) {
    return res.status(401).json({ erro: "Token inválido" })
  }
}