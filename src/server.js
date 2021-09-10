import express from "express";
import cors from "cors";
import CookieParser from "cookie-parser";
import router from "./services/routes/index.js";
import {
  forbiddenHandler,
  unAuthorizedHandler,
  catchAllHandler,
} from "./errorHandlers.js";

const server = express();
const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL];
// middleware
server.use(express.json());
server.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        origin.startsWith(process.env.FRONTEND_PROD_URL) ||
        whitelist.indexOf(origin) !== -1
      ) {
        // origin is in the list therefore it is allowed
        callback(null, true);
      } else {
        // origin is not in the list then --> ERROR
        callback(new Error("Not allowed by cors!"));
      }
    },
    credentials: true,
  })
);
server.use(CookieParser());

//routes
server.use("/api", router);

// error handlers
server.use(unAuthorizedHandler, forbiddenHandler, catchAllHandler);

// start

export default server;
