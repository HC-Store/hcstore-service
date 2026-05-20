import { Router } from "express";
import {
  criarPedido,
  listarPedidos,
  buscarPedido,
  atualizarPedido
} from "../controllers/pedido.controller.js";

const router = Router();

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Pedidos]
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 */
router.post("/", criarPedido);

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get("/", listarPedidos);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Busca pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *       404:
 *         description: Pedido não encontrado
 */
router.get("/:id", buscarPedido);

/**
 * @swagger
 * /api/pedidos/{id}:
 *   patch:
 *     summary: Atualiza um pedido
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pedido atualizado
 */
router.patch("/:id", atualizarPedido);

export default router;