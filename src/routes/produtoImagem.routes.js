import { Router } from "express";

import {
  listarImagens,
  criarImagem,
  deletarImagem,
} from "../controllers/produtoImagem.controller.js";

const router = Router();

// LISTAR IMAGENS
router.get("/", listarImagens);

// CRIAR IMAGEM
router.post("/", criarImagem);

// DELETAR IMAGEM
router.delete("/:id", deletarImagem);

export default router;