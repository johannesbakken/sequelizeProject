var express = require('express');
var router = express.Router();

const HotelService = require("../services/HotelService");
const db = require("../Models");
const hotelService = new HotelService(db);

/* GET home page. */
router.get('/', async function(req, res, next) {
  const hotels = await hotelService.get();
  res.render('index', {title: "RoomFinder", hotels});
});

module.exports = router;
