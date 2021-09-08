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

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL, startsWith(process.env.FRONTEND_PREVIEW_URL) );

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

//routes
server.use("/api", router);

// error handlers
server.use(unAuthorizedHandler, forbiddenHandler, catchAllHandler);

// start

export default server;
