import { Router } from "express";
import {
  criarEndereco,
  listarEnderecos,
  buscarEndereco,
  atualizarEndereco,
  deletarEndereco
} from "../controllers/endereco.controller.js";

const router = Router();

router.post("/", criarEndereco);
router.get("/", listarEnderecos);
router.get("/:id", buscarEndereco);
router.patch("/:id", atualizarEndereco);
router.delete("/:id", deletarEndereco);

export default router;