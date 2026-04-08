import { Router } from "express";
import {
  criarCarrinho,
  buscarCarrinho
} from "../controllers/carrinho.controller.js";

const router = Router();

router.post("/", criarCarrinho);
router.get("/:usuarioId", buscarCarrinho);

export default router;