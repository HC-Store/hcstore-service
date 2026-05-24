import { Router } from "express";
import {
  criarCupom,
  listarCupons,
  validarCupom
} from "../controllers/cupom.controller.js";

const router = Router();

router.post("/", criarCupom);
router.get("/", listarCupons);
router.post("/validar", validarCupom);

export default router;