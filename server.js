const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("مستخدم دخل الدردشة ✨");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("like", (msgId) => {
    io.emit("like", msgId);
  });

  socket.on("disconnect", () => {
    console.log("مستخدم غادر ❌");
  });
});

http.listen(3000, () => {
  console.log("السيرفر شغال على http://localhost:3000");
});
