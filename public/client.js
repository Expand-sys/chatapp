var socket = io();

var messages = document.getElementById("messages");
var form = document.getElementById("form");
var input = document.getElementById("input");

form.addEventListener(
  "submit",
  function (e) {
    e.preventDefault();
    if (input.value) {
      var item = document.createElement("div");
      socket.emit("chat message", input.value);
      item.classList.add("message");
      item.classList.add("message-personal");
      item.textContent = `You: ${input.value}`;
      messages.appendChild(item);
      input.value = "";
    }
    return false;
  },
  true
);

socket.on("reply", function (msg) {
  var item = document.createElement("div");
  item.classList.add("message");
  item.classList.add("messages-content");
  item.textContent = `EWEB: ${msg}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
socket.on("chat message", function (msg) {
  var item = document.createElement("div");
  item.classList.add("message-personal");
  item.classList.add("message");
  item.textContent = `You: ${msg}`;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
