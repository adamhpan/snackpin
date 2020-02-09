const express = require("express");
const { Op } = require("sequelize");

const router = express.Router();
const Snack = require("../models/snack");
const Youtuber = require("../models/youtuber");
const Reaction = require("../models/reaction");

router.get("/snacks", async (req, res) => {
  const maxLimit = 25;

  let whereObj = {};
  let youtuberWhereObj = {};
  let reactionWhereObj = {};
  let limit = req.query.limit ? Math.min(req.query.limit, maxLimit) : maxLimit;

  if(req.query.youtuber) {
    youtuberWhereObj.name = {
      [Op.like]: `%${req.query.youtuber}%`
    };
  }

  if(req.query.mapBounds) {
    let { lat0, lat1, lng0, lng1 } = JSON.parse(req.query.mapBounds);

    let smaller = lat0 < lat1 ? lat0 : lat1;
    let larger = lat0 > lat1 ? lat0 : lat1;
    whereObj.latitude = {
      [Op.between]: [smaller, larger]
    }

    smaller = lng0 < lng1 ? lng0 : lng1;
    larger = lng0 > lng1 ? lng0 : lng1;
    whereObj.longitude = {
      [Op.between]: [smaller, larger]
    }
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
    }],
    limit,
    subQuery: false
  })

  res.json(snacks);
});

module.exports = router;
