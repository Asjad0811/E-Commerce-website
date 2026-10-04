const router = require("express").Router();
const auth = require("../middleware/auth");
const controller = require("../controllers/orderController");

router.post("/", auth, controller.create);
router.get("/mine", auth, controller.mine);

module.exports = router;
