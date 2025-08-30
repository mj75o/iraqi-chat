const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value);
    input.value = "";
  }
});

socket.on("chat message", (msg) => {
  const item = document.createElement("li");
  item.textContent = msg;

  const likeBtn = document.createElement("button");
  likeBtn.textContent = "👍";
  likeBtn.onclick = () => {
    socket.emit("like", msg);
  };

  item.appendChild(likeBtn);
  messages.appendChild(item);
});

socket.on("like", (msgId) => {
  const items = document.querySelectorAll("#messages li");
  items.forEach((item) => {
    if (item.textContent.includes(msgId)) {
      item.style.color = "red";
    }
  });
});
