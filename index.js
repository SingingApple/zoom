const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
app.use(express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.redirect(`/${uuidv4()}`);
});

app.get("/:room_id", (req, res) => {
  res.render("room", { roomId: req.params.room_id });
});

server.listen(5000, () => {
  console.log("Listening to PORT 5000");
});
