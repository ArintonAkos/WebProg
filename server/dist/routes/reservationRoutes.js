"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservationController_1 = require("../controllers/reservationController");
const router = express_1.default.Router();
router.post('/restaurant/:restaurantId', reservationController_1.addReservation);
router.get('/restaurant/:restaurantId', reservationController_1.getReservationsByRestaurantId);
exports.default = router;
