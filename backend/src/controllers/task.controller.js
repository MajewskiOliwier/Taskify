const Task = require("../models/task.model");

module.exports = {
    getAssignedTasks: (req, res) => {
        Task.getAssignedTasks(req.params.userID, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    },

    getProjectTasks: (req, res) => {
        Task.getProjectTasks(req.params.userID, req.params.projectID, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    },

    getAssignedTasksFromProject: (req, res) => {
        Task.getAssignedTasksFromProject(req.params.userID, req.params.projectID, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    },

    createTask: (req, res) => {
        const { title, description, list_id } = req.body;
        Task.create(title, description, list_id, (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({
                id: result.insertId,
                title,
                description,
                list_id
            });
        });
    },

    addTaskHistoryLog: (req, res) => {
        const { title, description, list_id } = req.body;
        Task.addTaskHistoryLog(action, details, (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({
                id: result.insertId,
                action,
                details
            });
        });
    },

    addAttachmentToTask: (req, res) =>{
        const { filename, mime_type, size_bytes, created_at } = req.body;
        Task.addAttachmentToTask(filename,
                mime_type,
                size_bytes,
                created_at, (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({
                id: result.insertId,
                filename,
                mime_type,
                size_bytes,
                created_at
            });
        });
    },
};
