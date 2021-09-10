import server from "./server.js";
import mongoose from "mongoose";
import listEndpoints from "express-list-endpoints";
import { onConnection } from "./services/websocket/index.js";

import { createServer } from "http";
import { Server } from "socket.io";

const port = process.env.PORT || 3030;

console.table(listEndpoints(server));

const serverSocket = createServer(server);

const io = new Server(serverSocket, { allowEIO3: true });
// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

// Object.entries(socketHandlers).forEach(([event, handler]) =>
//   io.on(event, handler)
// );

// io.on("connection", (socket) => {
//   Object.entries(socketHandlers).forEach(([event, handler]) =>
//     socket.on(event, handler)
//   );
// });

io.on("connection", onConnection);

mongoose
  .connect(`${process.env.MONGO_CONNECTION}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("the server is connected to DB"));

mongoose.connection.on("connected", () => {
  serverSocket.listen(port, () => {
    console.log(`Server up and running on port ${port}`);
  });
});
