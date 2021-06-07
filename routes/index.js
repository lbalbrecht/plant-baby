const router = require("express").Router();

//api routes
const apiRoutes = require("./api");
router.use("/api", apiRoutes);

// authorization routes
const auth = require("./auth");
router.use(auth);

module.exports = router;
