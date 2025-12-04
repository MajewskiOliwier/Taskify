const router = require("express").Router();
const controller = require("../controllers/lists.controller");

router.get("/:boardId", controller.getByBoard);   
router.post("/", controller.create);             
router.put("/:listId", controller.update);       
router.delete("/:listId", controller.delete);    
router.put("/:listId/move", controller.move);

module.exports = router;
