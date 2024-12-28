/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: ID único de la tarea
 *         title:
 *           type: string
 *           description: El título de la tarea
 *         description:
 *           type: string
 *           description: Una descripción opcional de la tarea
 *         completed:
 *           type: boolean
 *           description: Estado de la tarea
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación de la tarea
 *       example:
 *         id: "63a5b3e2fdf78a001c123456"
 *         title: "Comprar leche"
 *         description: "Recordar comprar leche en la tienda"
 *         completed: false
 *         createdAt: "2024-12-28T15:00:00.000Z"
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Obtiene todas las tareas
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *   post:
 *     summary: Crea una nueva tarea
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Tarea creada exitosamente
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Obtiene una tarea por su ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Detalles de la tarea
 *       404:
 *         description: Tarea no encontrada
 *   put:
 *     summary: Actualiza una tarea por su ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Tarea actualizada
 *       404:
 *         description: Tarea no encontrada
 *   delete:
 *     summary: Elimina una tarea por su ID
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada
 *       404:
 *         description: Tarea no encontrada
 */


const express = require('express');
const { body, param } = require('express-validator');
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');

const router = express.Router();

// Routes
router.post(
    '/',
    body('title').notEmpty().withMessage('Title is required'),
    createTask
);

router.get('/', getTasks);

router.get('/:id',
    param('id').isMongoId().withMessage('Invalid task ID'),
    getTaskById
);

router.put(
    '/:id',
    param('id').isMongoId().withMessage('Invalid task ID'),
    updateTask
)

router.delete(
    '/:id',
    param('id').isMongoId().withMessage('Invalid task ID'),
    deleteTask
);

module.exports = router;