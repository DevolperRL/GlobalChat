const express = require("express");
const http = require("http");
const WebSocket = require("ws");

// Create an Express application
const app = express();
const port = process.env.PORT || 10000;

// Serve static files if needed (optional)
app.use(express.static("public"));

// Create an HTTP server
const server = http.createServer(app);

// Attach WebSocket server to HTTP server
const wss = new WebSocket.Server({ server });

// WebSocket event handlers
wss.on("connection", (ws) => {
  console.log("A client connected");

  // Handle incoming messages
  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message); // Send the message to all clients
      }
    });
  });

  // Handle disconnections
  ws.on("close", () => {
    console.log("Client disconnected");
  });

  // Handle errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
