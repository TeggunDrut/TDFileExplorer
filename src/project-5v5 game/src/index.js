const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

let players = [];
let lifePlayers = [];

app.get("/", (req, res) => {
  res.sendFile(__dirname + "\\index.html");
});

app.get("/style.css", (req, res, next) => {
  return res.sendFile(__dirname + "/style.css");
});

app.get("/js/AI.js", (req, res, next) => {
  return res.sendFile(__dirname + "/js/Ai.js");
});
app.get("/js/Classes.js", (req, res, next) => {
  return res.sendFile(__dirname + "/js/Classes.js");
});
app.get("/js/Events.js", (req, res, next) => {
  return res.sendFile(__dirname + "/js/Events.js");
});
app.get("/js/Game.js", (req, res, next) => {
  return res.sendFile(__dirname + "/js/Game.js");
});
app.get("/js/Global.js", (req, res, next) => {
  return res.sendFile(__dirname + "/js/Global.js");
});
app.get("/js/Logic.js", (req, res, next) => {
  return res.sendFile(__dirname + "/js/Logic.js");
});
app.get("/js/main.js", (req, res, next) => {
  return res.sendFile(__dirname + "/js/main.js");
});
app.get("/js/Menus.js", (req, res, next) => {
  return res.sendFile(__dirname + "/js/Menus.js");
});
app.get("/js/Options.js", (req, res, next) => {
  return res.sendFile(__dirname + "/js/Options.js");
});
app.get("/js/Player.js", (req, res, next) => {
  return res.sendFile(__dirname + "/js/Player.js");
});

let users = 0;
let userList = [];
const cyclenumber = 60;
let cycleList = [];

function lifeCycleLoop() {
  io.emit("lifecycle", cyclenumber);
  // console.log(cycleList);
  if (cycleList.length < userList.length) {
    cycleList.forEach((userInCycleList) => {
      for (let i = 0; i < userList.length; i++) {
        if ((userInCycleList = userList[i])) {
          userList.splice(userList[i], 1);
        }
      }
    });
  } else {
  }
  cycleList = [];
  io.emit("getUserList", userList);
}
let Players = [];
io.on("connection", (socket) => {
  socket.on("playerPosition", (e) => {
    if(!(Players.length <= 0))
      Players.forEach(p => {
        console.log(p.x + " " + e.x + " " + Players.length);
        p.x = e.x;
      })
    else {
      if (Players.length <= 0) {
        Players.push(e);
      }
      Players.forEach(p2 => {
        if (!(e.name == p2.name)) {
          Players.push(e);
        }
      })
    }

    io.emit("getPlayerPositions", Players);
    io.emit("getPlayerList", Players);
  });
  socket.on("userconnected", (user) => {
    io.emit("addUser", user);
    userList.push(user);
    console.log(Players.length);
    cycleList = [];
  });
  // console.log(userList);
  cycleList = [];
  socket.on("sendlifecycle", (object) => {
    cycleList.push(object.clientName);
    // console.log("cycleing " + userList);
  });
  // console.log(cycleList);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

setInterval(lifeCycleLoop, 100);

server.listen(4040, () => {
  console.log("listening on *:4040");
});
