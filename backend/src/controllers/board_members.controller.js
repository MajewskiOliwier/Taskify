const BoardMember = require("../models/board_members.model");

module.exports = {
    // Get all the members of a table
    getMembers: (req, res) => {
        const boardId = req.params.boardId;
        
        BoardMember.getMembers(boardId, (err, results) => {
            if (err) return res.status(500).json(err);
            res.json(results);
        });
    },
    addMember: (req, res) => {
        const boardId = req.params.boardId;
        const { user_id } = req.body; 

        if (!user_id) {
            return res.status(400).json({ message: "user_id is required" });
        }

        BoardMember.addMember(boardId, user_id, (err, result) => {
            if (err) {
                return res.status(500).json(err); 
            }
            res.status(201).json({ message: "Member added successfully", board_id: boardId, user_id });
        });
    },
    removeMember: (req, res) => {
        const boardId = req.params.boardId;
        const userId = req.params.userId; 

        BoardMember.removeMember(boardId, userId, (err, result) => {
            if (err) return res.status(500).json(err);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Member not found on this board" });
            }

            res.json({ message: "Member removed successfully" });
        });
    }
};