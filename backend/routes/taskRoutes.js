const express = require('express');
const router = express.Router();

const { handleGetTasks, handleCreateTask, handleGetTask, handleUpdateTask, handleDeleteTask } = require('../controllers/taskController')

router.route('/')
.get(handleGetTasks)
.post(handleCreateTask);

router.route('/:id')
.get(handleGetTask)
.put(handleUpdateTask)
.delete(handleDeleteTask);

module.exports = router;
