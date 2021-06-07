const router = require("express").Router();
const userRoutes = require("./userRoutes");

// localhost:3001/auth
router.use("/auth", userRoutes);

module.exports = router;
