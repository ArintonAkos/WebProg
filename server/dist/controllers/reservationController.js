"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservationsByRestaurantId = exports.addReservation = void 0;
const reservation_1 = __importDefault(require("../models/reservation"));
const addReservation = async (req, res) => {
    try {
        const { name, email, phone, date, time, numberOfGuests, restaurantId } = req.body;
        const reservation = new reservation_1.default({
            name,
            email,
            phone,
            date,
            time,
            numberOfGuests,
            restaurantId,
        });
        await reservation.save();
        res.status(201).json({ message: 'Reservation created successfully', reservation });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating reservation' });
    }
};
exports.addReservation = addReservation;
const getReservationsByRestaurantId = async (req, res) => {
    try {
        const restaurantId = req.params.restaurantId;
        const reservations = await reservation_1.default.find({ restaurantId });
        res.json({ reservations });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving reservations' });
    }
};
exports.getReservationsByRestaurantId = getReservationsByRestaurantId;
