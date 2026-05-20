import { Router } from 'express'
import {
  listarUsuarios,
  buscarUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  desativarUsuario
} from '../controllers/usuario.controller.js'

const router = Router()

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Lista de usuários
 */
router.get('/usuarios', listarUsuarios)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Busca usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/usuarios/:id', buscarUsuarioPorId)

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 */
router.post('/usuarios', criarUsuario)

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Atualiza um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário atualizado
 */
router.put('/usuarios/:id', atualizarUsuario)

/**
 * @swagger
 * /api/usuarios/{id}/desativar:
 *   patch:
 *     summary: Desativa um usuário
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário desativado
 */
router.patch('/usuarios/:id/desativar', desativarUsuario)

export default router