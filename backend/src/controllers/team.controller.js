const Team = require("../models/team.model");

module.exports = {
    getUserTeams: (req, res) => {
        Team.getParticipatingTeams(req.params.userID, (err, results) => {
            if (err) 
                return res.status(500).json(err);
            
            results.userID = req.params.userID;
            res.json(results);
        });
    },
};
