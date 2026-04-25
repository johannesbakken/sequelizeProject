const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const RoomService = require("../services/RoomService");
const db = require("../Models");
const roomService = new RoomService(db);
const HotelService = require("../services/HotelService");
const hotelService = new HotelService(db);

router.get("/:hotelId", async function(req, res, next){
    const rooms = await roomService.getHotelRooms(req.params.hotelId);
    const hotels = await hotelService.get();
    res.render("rooms", {title: "Rooms", rooms, hotels});
});

router.get("/", async function(req,res,next){
    const rooms = await roomService.get();
    const hotels = await hotelService.get();
    res.render("rooms", {rooms, hotels});
});

router.post("/", jsonParser, async function(req,res,next){
    let Capacity = req.body.Capacity;
    let PricePerDay = req.body.PricePerDay;
    let HotelId = req.body.HotelId
    await roomService.create(Capacity, PricePerDay, HotelId);
    res.end();
});

router.post("/reservation", jsonParser, async function(req, res, next){
    let userId = req.body.UserId;
    let roomId = req.body.RoomId;
    let startDate = req.body.StartDate;
    let endDate = req.body.EndDate;
    await roomService.rentARoom(userId, roomId, startDate, endDate);
    res.end();
});

router.delete("/", jsonParser, async function(req,res,next){
    let id = req.body.id;
    await roomService.deleteRoom(id);
    res.end();
});
module.exports = router;