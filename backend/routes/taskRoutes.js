const express = require('express');
const router = express.Router();

const { handleGetTasks } = require('../controllers/taskController')

router.route('/')
.get(handleGetTasks);

module.exports = router;
