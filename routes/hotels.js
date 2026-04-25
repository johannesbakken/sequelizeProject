const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const HotelService = require("../services/HotelService");
const db = require("../Models");
const hotelService = new HotelService(db);

router.get("/", async function(req,res,next){
    const hotels = await hotelService.get();
    res.render("hotels", { title: "Hotels", hotels: hotels});
});

router.get("/:hotelId", async function(req, res, next){
    const hotel = await hotelService.getHotelDetails(req.params.hotelId);
    const hotels = await hotelService.get();
    res.render("hotelDetails", {hotel, hotels});
})

router.post("/", jsonParser, async function(req,res,next){
    const name = req.body.Name;
    const location = req.body.Location;
    await hotelService.create(name, location);
    res.end();
});

router.post("/:hotelId/rate", jsonParser, async function(req,res,next){
    let value = req.body.Value;
    await hotelService.makeARate(1, req.params.hotelId, value);
    res.end();
});

router.delete("/", jsonParser, async function (req, res, next){
    const hotelId = req.body.id;
    await hotelService.deleteHotel(hotelId);
    res.end();
})

module.exports = router;