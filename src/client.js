import WebSocket from "ws";
import { stdin } from "node:process";

const ws = new WebSocket("ws://127.0.0.1:3003/");

ws.on("error", console.error);

ws.on("open", function open() {});

ws.on("message", function message(data) {
  console.log("%s", data);
});

stdin.on("data", (data) => {
  ws.send(data);
});
