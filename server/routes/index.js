const express = require("express");

const router = express.Router();
const snackRoutes = require("./snack");

router.use(snackRoutes);

module.exports = router;
