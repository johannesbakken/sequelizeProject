const { sequelize } = require("../Models");
const { QueryTypes } = require("sequelize");

class RoomService {
    constructor(db){
        this.client = db.sequelize;
        this.Room = db.Room;
        this.Reservation = db.Reservation;
    }
    async get(){
        const rooms = await sequelize.query('SELECT * FROM rooms', {
            type: QueryTypes.SELECT,
        });
        return rooms;
    }
    async create(capacity, pricePerDay, hotelId){
        sequelize.query('INSERT INTO rooms(Capacity, PricePerDay, HotelId) VALUES (:Capacity, :PricePerDay, :HotelId)', {
            replacements: {
                Capacity: capacity,
                PricePerDay: pricePerDay,
                HotelId: hotelId 
            }
        }).then((result) => {
            return result;
        }).catch(err => {
            return (err);
        });
    }
    async getHotelRooms(hotelId){
        const rooms = await sequelize.query('SELECT * FROM rooms WHERE HotelId = :hotelId', {
            replacements:
            {
                hotelId: hotelId
            }, type: QueryTypes.SELECT,
        });
        return rooms;
    }
    async deleteRoom(roomId){
        await sequelize.query('DELETE FROM rooms WHERE id = :roomId', {
            replacements: {
                roomId: roomId
            }
        }).then((result) => {
            return result;
        }).catch(err => {
            return (err);
        });
    }
    async rentARoom(userId, roomId, startDate, endDate){
        await sequelize.query('INSERT INTO reservations(UserId, RoomId, StartDate, EndDate) VALUES (:userId, :roomId, :startDate, :endDate)', {
            replacements: {
                userId, roomId, startDate, endDate
            }
        }).then((result) => {
            return result;
        }).catch(err => {
            return(err);
        });
    }
}
module.exports = RoomService;