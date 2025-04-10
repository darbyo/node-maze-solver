# node-maze-solver

This is a small repo to hold my solution to solving invisible mazes, based on the puzzle created by @jamsidedown [here](https://maze.robanderson.dev/)

## Approach
For some strange reason I always remember as a kid being told by my dad that 'if you are ever stuck in a maze, put your hand on the wall and follow it indefinitely'.

Unsurprisingly I never got stuck in a maze and this is the first time that knowledge has came in **handy**!

[Hand on wall rule](https://en.wikipedia.org/wiki/Maze-solving_algorithm#Hand_On_Wall_Rule)

## Running
The solver is configured to connect via websockets to the address `wss://maze.robanderson.dev/ws/{MAZE_ID}` where the maze ID can be taken from the challenge set by Rob.

The solver is currently set up to traverse the left or right hand wall of the maze and will stop when the exit is found. I wanted to add both to see if either could be used to get a shorter path.
However it looks like the way the mazes are generated, the finish is always in the opposite corner to the start - so the difference in the two approaches is minimal. This would differ more given a more random start/finish.

To run the solver use:

```bash
npm install ws

#Traverse the left-hand wall
node followLeft.js

#Traverse the right-hand wall
node followRight.js

#Reset the maze if you get lost, stuck, error
node reset.js
```
