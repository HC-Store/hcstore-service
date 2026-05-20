import { Router } from "express";
import {
  criarCategoria,
  listarCategorias,
  atualizarCategoria,
  deletarCategoria
} from "../controllers/categoria.controller.js";

const router = Router();

/**
 * @swagger
 * /api/categorias:
 *   post:
 *     summary: Cria uma nova categoria
 *     tags: [Categorias]
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 */
router.post("/", criarCategoria);

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Lista todas as categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 */
router.get("/", listarCategorias);

/**
 * @swagger
 * /api/categorias/{id}:
 *   patch:
 *     summary: Atualiza uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria atualizada
 */
router.patch("/:id", atualizarCategoria);

/**
 * @swagger
 * /api/categorias/{id}:
 *   delete:
 *     summary: Remove uma categoria
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria removida
 */
router.delete("/:id", deletarCategoria);

export default router;