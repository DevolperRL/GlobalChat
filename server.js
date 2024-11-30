
const express = require("express");
const http = require("http");
const WebSocket = require("ws");
// Set up Express
const app = express();
const port = process.env.PORT || 3000;
// Serve static files from 'public'
app.use(express.static("public"));
// Create an HTTP server
const server = http.createServer(app);
// Create WebSocket server attached to HTTP server
const wss = new WebSocket.Server({ server });
// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("A new client connected!");
  
  // Broadcast messages to all clients
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message); // Send the message to all clients
      }
    });
  });
  // Handle disconnections
  ws.on("close", () => {
    console.log("Client disconnected.");
  });
});
// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Server is running on http://localhost:${port}`);
});
