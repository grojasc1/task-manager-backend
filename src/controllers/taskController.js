const { validationResult } = require('express-validator');
const Task = require('../models/task');

// Create task
exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({error: 'Error creating task'}, error);
    }
};

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const { completed } = req.query;
        const filter = completed ? {completed: completed === 'true'} : {};
        const tasks = await Task.find(filter);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({error: 'Error getting tasks'}, error);
    }
};

// Get task by ID
exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({error: 'Error getting task'}, error);
    }
};

// Update task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({error: 'Error updating task'}, error);
    }
};

// Delete task
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({message: 'Task not found'});
        }
        res.json({message: 'Task deleted'});
    } catch (error) {
        res.status(500).json({error: 'Error deleting task'}, error);
    }
};