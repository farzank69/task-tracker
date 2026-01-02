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
        res.status(200).json({success: true, data: tasks});
    }
    catch (error) {
        res.status(500).json({success: false, message: error.message})    
    }
}

module.exports = {
    handleGetTasks,

}