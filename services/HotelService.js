const { sequelize } = require("../models");
const { QueryTypes } = require("sequelize");

class HotelService {
    constructor(db){
        this.client = db.sequelize;
        this.Hotel = db.Hotel;
        this.User = db.User;
        this.Rate =db.Rate;
    }
    async create(name, location){
        await sequelize.query('INSERT INTO hotels (Name, Location) VALUES (:Name, :Location)', {
            replacements: {
                Name: name,
                Location: location
            }
        }).then(result => {
            return result;
        }).catch(err => {
            return (err);
        });
    }
    async get(){
        const hotels = await sequelize.query('SELECT * FROM hotels', {
            type: QueryTypes.SELECT
        });
        return hotels;
    }
    async getHotelDetails(hotelId){
        const hotel = await sequelize.query('SELECT h.id, h.Name, h.Location, ROUND(AVG(r.Value), 1) AS AvgRate FROM hotels h LEFT JOIN rates r ON h.id = r.hotelId WHERE h.id = :hotelId', {
            replacements: {
                hotelId
            }, type: QueryTypes.SELECT
        });

        const userRateCount = await sequelize.query('SELECT COUNT(*) as Rated FROM rates WHERE HotelId = :hotelId AND UserId = :userId;', {
            replacements: {
                hotelId,
                userId: 1
            }, type: QueryTypes.SELECT
        });
        if (userRateCount[0].Rated > 0 ){
            hotel[0].Rated = true;
        } else {
            hotel[0].Rated = false;
        }
        return hotel[0];
    }
    async makeARate(userId, hotelId, value){
        sequelize.query('INSERT INTO rates(Value, HotelId, UserId) VALUES(:value, :hotelId, :userId)', {
            replacements: {
                userId, hotelId, value
            }
        }).then(result => {
            return result;
        }).catch(err => {
            return (err);
        });
    }

    async deleteHotel(hotelId) {
        await sequelize.query('DELETE FROM hotels WHERE id = :hotelId', {
            replacements: 
            {
                hotelId: hotelId
            }
        }).then(result => {
            return result;
        }).catch(err => {
            return(err);
        });
    }
}
module.exports = HotelService;