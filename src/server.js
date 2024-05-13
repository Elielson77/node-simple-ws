import "dotenv/config";
import { WebSocketServer } from "ws";
import { randomUUID } from "node:crypto";

function formatSend(uuid, data) {
  return `\n${uuid}:\n -> ${data}\n`;
}

const sockets = [];

const ws = new WebSocketServer({ port: process.env.PORT });

ws.on("connection", function connection(socket) {
  const uuid = randomUUID();

  sockets.push({ uuid, socket });
  console.log(formatSend(uuid, "connected"));

  socket.on("error", console.error);

  socket.on("message", function message(data) {
    const currentSocket = sockets.find((s) => s.socket === socket);
    console.log(formatSend(currentSocket.uuid, data));

    sockets
      .filter((s) => s.uuid !== currentSocket.uuid)
      .forEach((s) => {
        s.socket.send(formatSend(currentSocket.uuid, data));
      });
  });

  socket.send(`Your socket uuid: ${uuid}`);
});
