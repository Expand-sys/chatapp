const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://example.com",
    methods: ["GET", "POST"],
  },
});
const { Client, Intents, Collection, ThreadManager } = require("discord.js");
const dotenv = require("dotenv");
const uuid = require("uuid");
const port = process.env.PORT || 40091;
const fs = require("fs");

dotenv.config();
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

let channel;
let guild;

async function createThread(client, socket) {
  let channel = await client.channels.fetch(process.env.THREADCHANNEL);
  if (channel != null) {
    let thread = await channel.threads.create({
      name: socket.id,
      autoArchiveDuration: 60,
    });
    const filter = (m) => m.content.includes("!reply");
    const collector = await thread.createMessageCollector();
    return { thread: thread, collector: collector };
  }
}

client.once("ready", async () => {
  console.log("Ready!");
  io.on("connection", async (socket) => {
    console.log(socket.id);
    let package = await createThread(client, socket);
    await socket.on("chat message", async function (msg) {
      let modRole = await package.thread.guild.roles.resolve(
        process.env.MODROLE,
        true
      );
      let mod = await modRole.members.random();
      console.log(mod.presence.status);
      if (mod.presence.status != "online") {
        io.to(socket.id).emit("reply", "Service personel not currently online");
      } else {
        package.thread.members.add(mod);
        package.thread.send(msg);
      }
    });
    socket.on("disconnect", async (reason) => {
      console.log(package.thread.messageCount);
      if (package.thread.messageCount == 0) {
        package.thread.delete();
      }
    });
    await package.collector.on("collect", async (m) => {
      if (m.author.bot) return;
      io.to(socket.id).emit("reply", m.content);
    });
  });
});

server.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

client.login(process.env.TOKEN);
