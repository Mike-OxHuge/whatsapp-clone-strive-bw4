// export const socketHandlers = {
//   connection: (socket) => {
//     console.log("BOOOOOO USER BOOOOO", socket.id);
//     socket.on("login", () => console.log("new login inside", socket.id));
//   },
//   login: (socket) => {
//     console.log("new login outside", socket);
//   },
//   sendMessasge: ({ message, room }) => {
//     console.log("do sth");
//   },
// };

export const onConnection = (socket) => {
  socket.on("login", () => {
    console.log("new login", socket.id);
  });
  socket.on("test", () => {
    console.log("test", socket.id);
  });
  socket.on("sendmessage", ({ message }) => {
    console.log(message);
    socket.emit("new-message", { message });
  });
};
