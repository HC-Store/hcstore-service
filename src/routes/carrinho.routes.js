import { Router } from "express";
import {
  criarCarrinho,
  buscarCarrinho
} from "../controllers/carrinho.controller.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/carrinho:
 *   post:
 *     summary: Cria um carrinho para o usuário autenticado
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Carrinho criado com sucesso
 */
router.post("/", authMiddleware, criarCarrinho);

/**
 * @swagger
 * /api/carrinho:
 *   get:
 *     summary: Busca o carrinho do usuário autenticado
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrinho retornado com sucesso
 */
router.get("/", authMiddleware, buscarCarrinho);

export default router;