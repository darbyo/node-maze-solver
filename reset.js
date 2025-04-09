const WebSocket = require('ws');

const mazeID = '4QN8PRSGW9JV6';
const serverUrl = `wss://maze.robanderson.dev/ws/${mazeID}`;

const ws = new WebSocket(serverUrl);

ws.on('open', () => {
    console.log('Connected to the WebSocket server');
});

ws.on('message', (message) => {
    ws.send(`{"command": "reset"}`);
    ws.close();
});

// Handle any error that occurs
ws.on('error', (error) => {
    console.error('Error:', error);
});

// When the WebSocket connection is closed
ws.on('close', () => {
    console.log('Connection closed');
});