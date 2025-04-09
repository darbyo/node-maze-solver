const WebSocket = require('ws');

const mazeID = '4QN8PRSGW9JV6';
const serverUrl = `wss://maze.robanderson.dev/ws/${mazeID}`;
let direction = "up";
let moves = 0;
const directionsMap = new Map([
    ['up', { forward: 'up', backward: 'down', left: 'left', right: 'right' }],
    ['down', { forward: 'down', backward: 'up', left: 'right', right: 'left' }],
    ['left', { forward: 'left', backward: 'right', left: 'down', right: 'up' }],
    ['right', { forward: 'right', backward: 'left', left: 'up', right: 'down' }]
]);

const ws = new WebSocket(serverUrl);

ws.on('open', () => {
    console.time('executionTime');
    console.log('Connected to the WebSocket server');
});

ws.on('message', (message) => {
    console.log('message from server:', message.toString());

    if(message.includes("Congratulations")){
        ws.close();
    } else {
        const parsedData = JSON.parse(message);
        const directions = parsedData.availableDirections;
        let instruction

        if(directions.includes(directionsMap.get(direction).left)) {
            instruction = directionsMap.get(direction).left;
        } else if (directions.includes(directionsMap.get(direction).forward)) {
            instruction = directionsMap.get(direction).forward;
        } else if (directions.includes(directionsMap.get(direction).right)) {
            instruction = directionsMap.get(direction).right;
        } else {
            instruction = directionsMap.get(direction).backward;
        }
        
        const response = `{"command": "go ${instruction}"}`;

        direction = instruction;
        moves++;

        console.log('message to server:', response);
        ws.send(response);
    }
});

// Handle any error that occurs
ws.on('error', (error) => {
    console.error('Error:', error);
});

// When the WebSocket connection is closed
ws.on('close', () => {
    console.log('Connection closed, you found your dream job');
    console.timeEnd('executionTime');
    console.log(`You followed the left wall and completed the maze in ${moves} moves`);
});