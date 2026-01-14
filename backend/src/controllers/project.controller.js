const Project = require("../models/project.model");

module.exports = {
    getUserProjects: (req, res) => {
        Project.getParticipatingProjects(req.params.userID, (err, results) => {
            if (err) 
                return res.status(500).json(err);
            
            res.json(results);
        });
    },
    getProjectColumns: (req, res) => {
        Project.getProjectColumns(req.params.projectID, (err, results) => {
            if (err) 
                return res.status(500).json(err);
            
            res.json(results);
        });
    },

    createDefaultProject: (req, res) => {
        const { name, plan_type } = req.body;
        const { userID } = req.params;

        if (!name || !userID) {
            return res.status(400).json({ message: 'Missing data' });
        }

        Project.createDefaultProject(name, plan_type, userID, (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId, name });
        });
    },
};
