import { Router } from "express";
import {
  criarEndereco,
  listarEnderecos,
  buscarEndereco,
  atualizarEndereco,
  deletarEndereco
} from "../controllers/endereco.controller.js";

const router = Router();

/**
 * @swagger
 * /api/enderecos:
 *   post:
 *     summary: Cria um novo endereço
 *     tags: [Endereços]
 *     responses:
 *       201:
 *         description: Endereço criado com sucesso
 */
router.post("/", criarEndereco);

/**
 * @swagger
 * /api/enderecos:
 *   get:
 *     summary: Lista todos os endereços
 *     tags: [Endereços]
 *     responses:
 *       200:
 *         description: Lista de endereços
 */
router.get("/", listarEnderecos);

/**
 * @swagger
 * /api/enderecos/{id}:
 *   get:
 *     summary: Busca endereço por ID
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Endereço encontrado
 *       404:
 *         description: Endereço não encontrado
 */
router.get("/:id", buscarEndereco);

/**
 * @swagger
 * /api/enderecos/{id}:
 *   patch:
 *     summary: Atualiza um endereço
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Endereço atualizado
 */
router.patch("/:id", atualizarEndereco);

/**
 * @swagger
 * /api/enderecos/{id}:
 *   delete:
 *     summary: Remove um endereço
 *     tags: [Endereços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Endereço removido
 */
router.delete("/:id", deletarEndereco);

export default router;