const express = require('express');
const {body, param} = require('express-validator');
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