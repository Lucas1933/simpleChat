import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import viewsRouter from "./routes/viewsRouter.js";
import { Server } from "socket.io";
const app = express();
const port = 8080;
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", viewsRouter);
const serverExpress = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

const io = new Server(serverExpress);
const messages = [];
io.on("connection", (socket) => {
  console.log("new client connected");
  socket.emit("logs", messages);
  socket.on("message", (data) => {
    console.log(data);
    messages.push(data);
    io.emit("logs", messages);
  });

  socket.on("authenticated", (data) => {
    socket.broadcast.emit("newUserConnected", data);
  });
});
