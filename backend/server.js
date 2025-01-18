import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import http from "http";
import socketio from "socket.io";

import fs from "fs";
import https from "https";
import WebSocket from "ws";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

connectDB();

const app = express();
http.wsEngine = "ws";
const server = http.createServer(app);
// const io = require('socket.io')(httpServer, { wsEngine: 'ws' });

const io = socketio(server);

//working with io
io.on("connection", (socket) => {
  console.log("we have a new connection!");

  socket.on("join", ({ name, room }, callback) => {
    socket.join(room);
    socket.emit("message", {
      user: "admin",
      text: `Welcome to live support ${name}, please wait...`,
    });
    socket.broadcast
      .to(room)
      .emit("message", { user: "admin", text: `${name} has joined!` });
    socket.username = name;
    socket.room = room;

    console.log("name:", socket.username);
    console.log("room:", socket.room);

    callback();
  });

  socket.on("sendMessage", ({ room, name }, message, callback) => {
    io.to(room).emit("message", { user: name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    socket.broadcast
      .to(socket.room)
      .emit("message", { user: "admin", text: `${socket.username} has left!` });

    // socket.disconnect(room)
  });
});

//enabling logging in production
if (true) {
  app.use(
    morgan("combined", {
      skip: (req, res) => process.env.NODE_ENV === "test", // Example: Skip in test
    })
  );
}

app.use(express.json()); //to accept json data in body (user login)

app.use("/api/products", productRoutes); //anything using api products will be redirected to productRoutes
app.use("/api/orders", orderRoutes); //anything using api products will be redirected to productRoutes

app.use("/api/users", userRoutes); //anything using api user will be redirected to userRoutes

app.use("/api/upload", uploadRoutes); //anything using api user will be redirected to uploadRoutes

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads"))); //taking us to upload folder and making it static using express

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "build")));

  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "..", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
// app.use((err, req, res, next) => {
// 	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
// 	res.status(statusCode)
// 	res.json({
// 		message: err.message,
// 		stack: process.env.NODE_ENv === 'production' ? null : err.stack,
// 	})
// })
const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV === "production") {
  const options = {
    key: fs.readFileSync(
      "/etc/letsencrypt/live/limitles2.duckdns.org/privkey.pem"
    ),
    cert: fs.readFileSync(
      "/etc/letsencrypt/live/limitles2.duckdns.org/fullchain.pem"
    ),
  };

  // Create an HTTPS server
  https.createServer(options, app).listen(443, () => {
    console.log("HTTPS Server running on port 443");
  });
}

server.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);
