import { Router } from 'express'
import { listarUsuarios, criarUsuario } from '../controllers/usuario.controller.js'

const router = Router()

router.get('/usuarios', listarUsuarios) // LISTAR USUARIOS (PAINEL ADM)
router.post('/usuarios', criarUsuario) // CRIAR USUARIO

export default router