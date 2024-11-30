
const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const port = process.env.PORT || 3000; // Railway assigns the PORT environment variable

// Serve static files from the "public" folder (if needed)
app.use(express.static("public"));

// Create an HTTP server
const server = http.createServer(app);

// Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("A new client connected!");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    
    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("A client disconnected.");
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
