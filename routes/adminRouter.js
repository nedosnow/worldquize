const { Router } = require("express");
const router = Router();

const allQuestions = require("../controllers/adminController");

router.get("/", allQuestions.allQuestions);
router.delete("/:id", allQuestions.delQuestion);
router.patch("/:id", allQuestions.retakeQuestion);

module.exports = router;
