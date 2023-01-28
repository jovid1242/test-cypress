const Router = require("express").Router;
const router = new Router();  

const testController = require("../controllers/testController");

// path
router.post("/test", testController.runTest);

module.exports = router;