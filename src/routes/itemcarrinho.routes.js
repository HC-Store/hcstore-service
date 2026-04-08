import { Router } from "express";
import {
  adicionarItem,
  listarItens,
  atualizarItem,
  removerItem,
  limparCarrinho
} from "../controllers/itemcarrinho.controller.js";

const router = Router();

router.post("/", adicionarItem);
router.get("/:carrinhoId", listarItens);
router.patch("/:id", atualizarItem);
router.delete("/:id", removerItem);
router.delete("/limpar/:carrinhoId", limparCarrinho);

export default router;