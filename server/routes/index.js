const express = require("express");

const router      = express.Router();
const miscRoutes  = require("./misc");
const userRoutes  = require("./user");
const snackRoutes = require("./snack");

router.use(miscRoutes);
router.use(snackRoutes);
router.use(userRoutes);

module.exports = router;
