import jwt from "jsonwebtoken"

export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        erro: "Token não fornecido"
      })
    }

    const token = authHeader.split(" ")[1]

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "SEGREDO_SUPER_SECRETO"
    )

    req.user = decoded

    next()

  } catch (err) {
    return res.status(401).json({
      erro: "Token inválido"
    })
  }
}