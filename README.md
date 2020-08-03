
<h1 align="center">Sudoku Solver</h1>

<h2 align="center"><a  href="https://burteth.github.io/Sudoku-Solver/">Live Demo</a></h2>

## Description

Sudoku is a logic-based number based puzzle involving a 9x9 partically filled grid of numbers. This application utilizes the backtracking algorithim to find the solution to a game of Sudoku. Users can input their own numbers or generate a random game.

## How to play

### Input Numbers:
- **Click** on the tile where you would increment a number
- Invalid numbers are highlighed in red
- The **Randomize** button partically fills the board with random numbers
  

<p align="center">
<img  src="https://media.giphy.com/media/eijZ29RqzIfF3nI7xZ/giphy.gif" width="60%"></p>

### Finding the Solution:
- Adjust the speed of the visualization with the **Solving Speed** slider 
- **Click** the solve button to begin the solving visualization


<p align="center">
<img  src="https://media.giphy.com/media/VCPpnAJVji45V0cLUx/giphy.gif" width="60%"></p>

## About the project.

### BackTracking Algorithim:
- This Algotithim attempts to solve the board by placing a number starting at 1 in the current tile
- **Valid** numbers are highlighed in green and then the program continues to the next tile.
- **Invalid** numbers are highlighed in red. Invalid Numbers are then incremented by 1
- If all numbers 1-9 are invalid then is returns to the previous tile and increments it by 1 and then it repeats the same process.
  
## Project setup

```
npm install
npm run
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)