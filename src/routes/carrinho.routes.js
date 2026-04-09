import { Router } from "express";
import {
  criarCarrinho,
  buscarCarrinho
} from "../controllers/carrinho.controller.js";

// 🔒 importa o middleware
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// 🔒 proteger rotas
router.post("/", authMiddleware, criarCarrinho);
router.get("/", authMiddleware, buscarCarrinho);

export default router;