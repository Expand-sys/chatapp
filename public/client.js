var socket = io("", {
  cors: {
    origin: "https://example.com",
    methods: ["GET", "POST"],
  },
  transports: ["polling"],
});

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
  item.textContent = `EWEB: ${msg}`;
  messages.appendChild(item);
});
socket.on("chat message", function (msg) {
  var item = document.createElement("div");
  item.classList.add("message-personal");
  item.classList.add("message");
  item.textContent = `You: ${msg}`;
  messages.appendChild(item);
});
