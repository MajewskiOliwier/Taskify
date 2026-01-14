const Task = require("../models/task.model");

module.exports = {
    getAssignedTasks: (req, res) => {
        Task.getAssignedTasks(req.params.userID, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    },

    getProjectTasks: (req, res) => {
        const { projectID } = req.params;

        Task.getProjectTasks(projectID, (err, results) => {
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

    // createTask: (req, res) => {
    //     const { title, description, list_id } = req.body;
    //     Task.create(title, description, list_id, (err, result) => {
    //         if (err) return res.status(500).json(err);
    //         res.json({
    //             id: result.insertId,
    //             title,
    //             description,
    //             list_id
    //         });
    //     });
    // },
    createTask: (req, res) => {
        const { projectID } = req.params;
        const { title, description } = req.body;

        if (!title || !projectID) {
            return res.status(400).json({ message: "Missing data" });
        }

        Task.createTaskInTodo(projectID, title, description, (err, result) => {
            if (err) 
                return res.status(500).json({ message: err.message });
            
            res.status(201).json(result);
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

    createTaskInTodo: (projectID, title, description, callback) => {
        const id_task = randomUUID();

        const queryTodoColumn = `
            SELECT c.id_COLONNE
            FROM COLONNE c
            JOIN HAS h ON c.id_COLONNE = h.id_COLONNE
            JOIN BOARD b ON h.id_board = b.id_board
            JOIN OWNS o ON b.id_board = o.id_board
            WHERE o.id_project = ? AND c.name = 'TODO'
            LIMIT 1
        `;

        db.query(queryTodoColumn, [projectID], (err, rows) => {
            if (err || rows.length === 0) return callback(err || 'TODO column not found');

            const todoColumnId = rows[0].id_COLONNE;

            db.beginTransaction(err => {
                if (err) return callback(err);

                db.query(
                    `INSERT INTO TASK (id_task, title, description) VALUES (?, ?, ?)`,
                    [id_task, title, description],
                    err1 => {
                        if (err1) return db.rollback(() => callback(err1));

                        db.query(
                            `INSERT INTO CONTAINS_TASK (id_COLONNE, id_task) VALUES (?, ?)`,
                            [todoColumnId, id_task],
                            err2 => {
                                if (err2) return db.rollback(() => callback(err2));

                                db.commit(err3 => {
                                    if (err3) return db.rollback(() => callback(err3));
                                    callback(null, { id_task });
                                });
                            }
                        );
                    }
                );
            });
        });
    }
};