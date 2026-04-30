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

router.post("/", authMiddleware, adicionarItem);
router.get("/", authMiddleware, listarItens);
router.patch("/:id", authMiddleware, atualizarItem);
router.delete("/:id", authMiddleware, removerItem);
router.delete("/limpar", authMiddleware, limparCarrinho);

export default router;