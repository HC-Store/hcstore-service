import { Router } from "express";
import {
  criarCategoria,
  listarCategorias,
  atualizarCategoria,
  deletarCategoria
} from "../controllers/categoria.controller.js";

const router = Router();

router.post("/", criarCategoria);
router.get("/", listarCategorias);
router.patch("/:id", atualizarCategoria);
router.delete("/:id", deletarCategoria);

export default router;