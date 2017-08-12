"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const HotelRouter_1 = require("./routes/HotelRouter");
// Creates and configures an ExpressJS web server.
class App {
    //Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    // Configure Express middleware.
    middleware() {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // Configure API endpoints.
    routes() {
        let router = express.Router();
        router.get("/", (req, res, next) => {
            res.json({
                message: "Hello World!"
            });
        });
        // CORS hack :)
        this.express.use("*", function (req, res, next) {
            var origin = req.get("origin");
            res.header("Access-Control-Allow-Origin", origin);
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Headers", "Content-Type");
            next();
        });
        this.express.use("/", router);
        this.express.use("/api/v1/hotels", HotelRouter_1.default);
    }
}
exports.default = new App().express;
