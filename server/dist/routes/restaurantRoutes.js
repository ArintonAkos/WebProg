"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurantController_1 = require("../controllers/restaurantController");
const router = express_1.default.Router();
router.get('/', restaurantController_1.getRestaurants);
router.post('/', restaurantController_1.addRestaurant);
router.get('/:id', restaurantController_1.getRestaurantById);
exports.default = router;
