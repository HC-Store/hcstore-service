import { Router } from "express";
import {
  criarPedido,
  listarPedidos,
  buscarPedido,
  atualizarPedido
} from "../controllers/pedido.controller.js";

const router = Router();

router.post("/", criarPedido);
router.get("/", listarPedidos);
router.get("/:id", buscarPedido);
router.patch("/:id", atualizarPedido);

export default router;