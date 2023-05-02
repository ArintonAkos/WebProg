"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reservationSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    restaurantId: { type: String, required: true },
    time: { type: Date, required: true },
});
const Reservation = (0, mongoose_1.model)('Reservation', reservationSchema);
exports.default = Reservation;
