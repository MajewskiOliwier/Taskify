const router = require("express").Router();
const controller = require("../controllers/boards.controller");

router.get("/", controller.getAll);         
router.post("/", controller.create);        
router.delete("/:boardId", controller.delete); 

router.get("/:boardId", controller.getById);
router.put("/:boardId", controller.update);

module.exports = router;
