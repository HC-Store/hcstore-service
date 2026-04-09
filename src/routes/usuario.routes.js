import { Router } from 'express'
import {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  desativarUsuario
} from '../controllers/usuario.controller.js'

const router = Router()

// LISTAR TODOS (ADMIN)
router.get('/usuarios', listarUsuarios)

// BUSCAR POR ID
router.get('/usuarios/:id', buscarUsuarioPorId)

// CRIAR USUÁRIO
router.post('/usuarios', criarUsuario)

// ATUALIZAR USUÁRIO
router.put('/usuarios/:id', atualizarUsuario)

// DESATIVAR (soft delete)
router.patch('/usuarios/:id/desativar', desativarUsuario)

export default router