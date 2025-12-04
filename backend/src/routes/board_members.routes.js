const router = require("express").Router({ mergeParams: true });
const controller = require("../controllers/board_members.controller"); 
// GET /boards/:boardId/members -> List all the members of a board
router.get("/", controller.getMembers); 
router.post("/", controller.addMember); 
router.delete("/:userId", controller.removeMember);

module.exports = router;