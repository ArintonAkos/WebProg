"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reservationRoutes_1 = __importDefault(require("./routes/reservationRoutes"));
const restaurantRoutes_1 = __importDefault(require("./routes/restaurantRoutes"));
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
const port = 3000;
(0, database_1.default)().then(() => {
    app.use('/reservation', reservationRoutes_1.default);
    app.use('/restaurant', restaurantRoutes_1.default);
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
});
