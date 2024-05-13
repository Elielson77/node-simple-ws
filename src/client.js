import "dotenv/config";
import WebSocket from "ws";
import { stdin } from "node:process";

const ws = new WebSocket(`${process.env.BASE_URL}:${process.env.PORT}/`);

ws.on("error", console.error);

ws.on("open", function open() {});

ws.on("message", function message(data) {
  console.log("%s", data);
});

stdin.on("data", (data) => {
  ws.send(data);
});
