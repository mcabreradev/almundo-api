import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";

import HotelRouter from "./routes/HotelRouter";

// Creates and configures an ExpressJS web server.
class App {
  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    let router = express.Router();
    router.get("/", (req, res, next) => {
      res.json({
        message: "Hello World!"
      });
    });

    // CORS hack :)
    this.express.use("*", function(req, res, next) {
      var origin = req.get("origin");
      res.header("Access-Control-Allow-Origin", origin);
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.header("Access-Control-Allow-Headers", "Content-Type");
      next();
    });

    this.express.use("/", router);
    this.express.use("/api/v1/hotels", HotelRouter);
  }
}

export default new App().express;
