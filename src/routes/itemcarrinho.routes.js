import { Router } from "express";
import {
  adicionarItem,
  listarItens,
  atualizarItem,
  removerItem,
  limparCarrinho
} from "../controllers/itemcarrinho.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/itemcarrinho:
 *   post:
 *     summary: Adiciona item ao carrinho
 *     tags: [Item Carrinho]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Item adicionado com sucesso
 */
router.post("/", authMiddleware, adicionarItem);

/**
 * @swagger
 * /api/itemcarrinho:
 *   get:
 *     summary: Lista itens do carrinho
 *     tags: [Item Carrinho]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de itens do carrinho
 */
router.get("/", authMiddleware, listarItens);

/**
 * @swagger
 * /api/itemcarrinho/{id}:
 *   patch:
 *     summary: Atualiza item do carrinho
 *     tags: [Item Carrinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item atualizado
 */
router.patch("/:id", authMiddleware, atualizarItem);

/**
 * @swagger
 * /api/itemcarrinho/{id}:
 *   delete:
 *     summary: Remove item do carrinho
 *     tags: [Item Carrinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Item removido
 */
router.delete("/:id", authMiddleware, removerItem);

/**
 * @swagger
 * /api/itemcarrinho/limpar:
 *   delete:
 *     summary: Limpa o carrinho
 *     tags: [Item Carrinho]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrinho limpo com sucesso
 */
router.delete("/limpar", authMiddleware, limparCarrinho);

export default router;