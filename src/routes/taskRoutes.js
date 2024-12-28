/**
 * @swagger
 * components:
 *  schemas:
 *     Task:
 *      type: object
 *     required:
 *     - title
 *    properties:
 *     id:
 *      type: string
 *      description: The auto-generated id of the task
 *     title:
 *      type: string
 *      description: The title of the task
 *    description:
 *      type: string
 *      description: The description of the task
 *    completed:
 *      type: boolean
 *      description: The completion status of the task
 *    createdAt:
 *      type: string
 *      format: date-time
 *      description: The creation date of the task
 *    example:
 *      id: 60f5b1a1d4b3f20015f7b6b4
 *      title: Buy groceries
 *      description: Buy milk, bread, and eggs
 *      completed: false
 *      createdAt: 2021-07-20T20:00:00.000Z
 */

/**
 * @swagger
 * /api/tasks:
 *  get:
 *   summary: Get all tasks
 *   tags: [Tasks]
 *   responses:
 *   200:
 *      description: The list of tasks
 *      content:
 *          application/json:
 *             schema:
 *                type: array
 *                items:
 *                 $ref: '#/components/schemas/Task'
 */

/**
 * @swagger
 * /api/tasks:
 * post:
 * summary: Create a new task
 * tags: [Tasks]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Task'
 * responses:
 * 201:
 * description: The task was successfully created
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Task'
 * 400:
 * description: Invalid task
 */

/**
 * @swagger
 * /api/tasks/{id}:
 * get:
 * summary: Get a task by ID
 * tags: [Tasks]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The task ID
 * responses:
 * 200:
 * description: The task description by ID
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Task'
 * 404:
 * description: The task was not found
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