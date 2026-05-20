import { Router } from "express";
import {
  listarImagens,
  criarImagem,
  deletarImagem
} from "../controllers/produtoImagem.controller.js";

const router = Router();

/**
 * @swagger
 * /api/produto-imagem:
 *   get:
 *     summary: Lista imagens dos produtos
 *     tags: [Produto Imagem]
 *     responses:
 *       200:
 *         description: Lista de imagens
 */
router.get("/", listarImagens);

/**
 * @swagger
 * /api/produto-imagem:
 *   post:
 *     summary: Cria uma imagem para produto
 *     tags: [Produto Imagem]
 *     responses:
 *       201:
 *         description: Imagem criada com sucesso
 */
router.post("/", criarImagem);

/**
 * @swagger
 * /api/produto-imagem/{id}:
 *   delete:
 *     summary: Remove imagem do produto
 *     tags: [Produto Imagem]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Imagem removida
 */
router.delete("/:id", deletarImagem);

export default router;