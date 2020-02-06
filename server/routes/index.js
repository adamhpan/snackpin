const express = require("express");

const router = express.Router();
const snackRoutes = require("./snack");
const userRoutes = require("./user");

router.use(userRoutes);
router.use(snackRoutes);

module.exports = router;
