const { Router } = require("express");
const router = Router();
const absController = require("../controllers/absController");

router.get("/", absController.renderAbs);
router.post("/new", absController.renderQuestion);
router.get("/newquestion", absController.createNewQuestion);
router.post("/newquestion/add", absController.addNewQuestion);

module.exports = router;
