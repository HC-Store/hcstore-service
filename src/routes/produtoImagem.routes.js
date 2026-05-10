import { Router } from "express";
import { listarImagens, criarImagem, deletarImagem } from "../controllers/produtoImagem.controller.js";

const router = Router();

router.get("/", listarImagens);
router.post("/", criarImagem);
router.delete("/:id", deletarImagem);

export default router;