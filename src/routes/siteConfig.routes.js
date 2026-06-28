import { Router } from "express";
import {
  obterConfiguracoes,
  salvarConfiguracoes
} from "../controllers/siteConfig.controller.js";

const router = Router();

router.get("/", obterConfiguracoes);
router.put("/", salvarConfiguracoes);

export default router;