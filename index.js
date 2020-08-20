const express = require("express");
const app = express();
const { ExpressPeerServer } = require("peer");

const server = require("http").Server(app);
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
const io = require("socket.io")(server);
const { v4: uuidv4 } = require("uuid");
app.use(express.static("public"));
app.use("/peerjs", peerServer);
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room_id", (req, res) => {
  res.render("room", { roomId: req.params.room_id });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);
  });
});

server.listen(5000, () => {
  console.log("Listening to PORT 5000");
});
