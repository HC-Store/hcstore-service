import { Router } from "express";
import { registrarVendaPresencial } from "../controllers/vendaPresencial.controller.js";

const router = Router();

router.post("/", registrarVendaPresencial);

export default router;