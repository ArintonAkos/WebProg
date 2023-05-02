"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const restaurantSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    address: {
        city: { type: String, required: true },
        street: { type: String, required: true },
        number: { type: String, required: true },
    },
    phone: { type: String, required: true },
    openingHours: { type: String, required: true },
});
const Restaurant = (0, mongoose_1.model)('Restaurant', restaurantSchema);
exports.default = Restaurant;
