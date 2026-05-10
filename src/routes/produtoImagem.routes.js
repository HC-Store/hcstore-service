import express from 'express';
import { criarImagem, listarImagens, deletarImagem } from '../controllers/produtoImagem.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', listarImagens);
router.post('/', authMiddleware, criarImagem);
router.delete('/:id', authMiddleware, deletarImagem);

export default router;