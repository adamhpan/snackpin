const express = require("express");
const { Op } = require("sequelize");

const router = express.Router();
const Snack = require("../models/snack");
const Youtuber = require("../models/youtuber");
const Reaction = require("../models/reaction");

router.get("/snacks", async (req, res) => {
  let whereObj = {};
  let youtuberWhereObj = {};
  let reactionWhereObj = {};

  if(req.query.youtuber) {
    youtuberWhereObj.name = {
      [Op.like]: `%${req.query.youtuber}%`
    };
  }
  Snack.hasMany(Reaction)

  let snacks = await Snack.findAll({
    where: whereObj,
    include: [{
      model: Reaction,
      where: reactionWhereObj,
      include: [{
        model: Youtuber,
        where: youtuberWhereObj
      }]
    }]
  })

  res.json(snacks);
});

module.exports = router;
