import express from "express"
import { register, login } from "../controllers/authController.js"

const router = express.Router()

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 */
router.post("/register", register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */
router.post("/login", login)

export default router