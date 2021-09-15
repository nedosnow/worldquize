const { Router } = require("express");
const router = Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.renderIndex);
router.post('/',indexController.resultSerch)
router.get("/signin", indexController.signin);
router.post("/signin/add", indexController.addNewUser);
router.get("/login", indexController.login);
router.post("/login", indexController.interInLogin);
router.get("/profile", indexController.profileShow);
router.get("/logout", indexController.logout);

module.exports = router;
