const Task = require('../models/taskModel');

const handleGetTasks = async (req, res) => {
    try { 
        const { status, priority, sortBy } = req.query;
        const filter = {};

        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        let sortOptions = {};
        if (sortBy === 'dueDate') {
            sortOptions.dueDate = 1; // in asc
        } else {
            sortOptions.createdAt = -1; // new to old 
        }

        const tasks = await Task.find(filter).sort(sortOptions);
        res.status(200).json({success: true, count: tasks.length, data: tasks});
    }
    catch (error) {
        res.status(500).json({success: false, message: error.message})    
    }
}

const handleGetTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task){
            return res.status(404).json({success: false, message: "Task not found"})
        }
        res.status(200).json({success: true, data: task});
    }
    catch (error){
        res.status(500).json({success: false, message: error.message});
    }
}

const handleCreateTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate, status } = req.body;
        if (!title || !dueDate){
            return res.status(400).json({message: "Title and Due Date are required"});
        }
        const task = await new Task({
            title, 
            description,
            priority,
            dueDate,
            status
        }).save();
        res.status(201).json({success: true, message: "Task created successfully", data: task});
    }
    catch (error) {
        res.status(400).json({success: false, message: "Failed to create task", error: error.message});
    }
}

const handleUpdateTask = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);
        if (!task){
            return res.status(404).json({success: false, message: "Task not found"})
        }
        const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({success: true, message: "Task updated successfully", data: updateTask});
    } 
    catch (error) {
        res.status(400).json({success: false, message: "Failed to update the task"});
    }
}

const handleDeleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task){
            return res.status(404).json({success: false, message: "Task not found"})
        }
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({success: true, message: "Task deleted successfully", data: {}});
        }
    catch (error){
        res.status(500).json({success: false, message: "Failed to delete the task"})
    }
}

module.exports = {
    handleGetTasks,
    handleGetTask, 
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask
}