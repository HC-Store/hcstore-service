import { Router } from "express";
import {
  criarCupom,
  listarCupons,
  validarCupom,
  deletarCupom
} from "../controllers/cupom.controller.js";

const router = Router();

router.post("/", criarCupom);
router.get("/", listarCupons);
router.post("/validar", validarCupom);
router.delete("/:id", deletarCupom);

export default router;