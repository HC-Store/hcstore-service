import { Router } from "express";
import {
  criarProduto,
  listarProdutos,
  buscarProduto,
  atualizarProduto,
  deletarProduto
} from "../controllers/produto.controller.js";

const router = Router();

router.post("/", criarProduto);
router.get("/", listarProdutos);
router.get("/:id", buscarProduto);
router.patch("/:id", atualizarProduto);
router.delete("/:id", deletarProduto);

export default router;