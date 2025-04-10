const WebSocket = require('ws');

const mazeID = '4QN8PRSGW9JV6';
const serverUrl = `wss://maze.robanderson.dev/ws/${mazeID}`;
let direction = "up";
let moves = 0;

const directionsMap = new Map([
    ['up',    { forward: 'up', backward: 'down', left: 'left', right: 'right' }],
    ['down',  { forward: 'down', backward: 'up', left: 'right', right: 'left' }],
    ['left',  { forward: 'left', backward: 'right', left: 'down', right: 'up' }],
    ['right', { forward: 'right', backward: 'left', left: 'up', right: 'down' }]
]);

const ws = new WebSocket(serverUrl);

ws.on('open', () => {
    console.time('executionTime');
});

ws.on('close', () => {
    console.timeEnd('executionTime');
    console.log(`You followed the left wall and completed the maze in ${moves} moves`);
});

ws.on('message', (message) => {
    console.log('message from server:', message.toString());

    if(message.includes("Congratulations")){
        ws.close();
    } else {
        const availableDirections = JSON.parse(message).availableDirections;
        const { left, forward, right, backward } = directionsMap.get(direction);
        const instruction = [left, forward, right, backward].find(dir => availableDirections.includes(dir));
    
        direction = instruction
        moves++;

        console.log('move sent to server:', instruction);
        ws.send(`{"command": "go ${instruction}"}`);
    }
});