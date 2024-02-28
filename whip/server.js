const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Handle WHIP WebSocket connections
app.ws('/whip', (ws, req) => {
    console.log('Client connected to WHIP server');

    // Handle incoming WHIP messages
    ws.on('message', (message) => {
        console.log('Received WHIP message:', message);
        // Handle the message as per your requirements

        // Example: Broadcast the message to all connected clients
        expressWs.getWss('/whip').clients.forEach((client) => {
            client.send(message);
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected from WHIP server');
    });
});

// Start the server
app.listen(3001, () => {
    console.log('Server listening on port 3001');
});