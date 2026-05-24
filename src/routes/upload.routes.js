import express from 'express';
import { upload } from '../config/multer.js';
import { uploadImagem } from '../controllers/upload.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, upload.single('imagem'), uploadImagem);

export default router;