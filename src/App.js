import React from 'react';
import './App.css';
import Board from "./components/Board.js"
import backtrack from "./components/backtrack.js"

 /* eslint-disable */

const initialFilled = 27;
const squareBackgroundColor = "#E9E9E9";
const speed_max = 200;
const speed_min = 10;



export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matrix: this.generateMatrix(initialFilled, false),
      solved: {},
    };

  }

  componentDidMount() {
    this.generateMatrix = this.generateMatrix.bind(this);
    this.squareClicked = this.squareClicked.bind(this);
    this.timeouts = [];
    this.currentanimations = [];
    }

  generateMatrix = (filled, started) => {

        var board =      [[0, 0, 0,  0, 0, 0,  0, 0, 0],
                          [0, 0, 0,  0, 0, 0,  0, 0, 0],
                          [0, 0, 0,  0, 0, 0,  0, 0, 0],

                          [0, 0, 0,  0, 0, 0,  0, 0, 0],
                          [0, 0, 0,  0, 0, 0,  0, 0, 0],
                          [0, 0, 0,  0, 0, 0,  0, 0, 0],

                          [0, 0, 0,  0, 0, 0,  0, 0, 0],
                          [0, 0, 0,  0, 0, 0,  0, 0, 0],
                          [0, 0, 0,  0, 0, 0,  0, 0, 0]]

        var counter = 0;
        var randRow;
        var randCol;
        var randNum;
        while ( counter < filled ){
          randRow = getRndInteger(0,8);
          randCol = getRndInteger(0,8);
          randNum = getRndInteger(1,9);

          if (isValid(board, randRow, randCol, randNum) && board[randRow][randCol] === 0){
            board[randRow][randCol] = randNum;
            counter += 1;
          }

        }


        var newMatrix = [];
        for (var i = 0; i < 9; i++) {
          newMatrix.push([])
          for (var j = 0; j < 9; j++) {
            if ( board[i][j] === 0 ){
              newMatrix[i].push({ val : " ", row : i, col : j, id : i * 9 + j })
            }else{
              newMatrix[i].push({ val : board[i][j], row : i, col : j, id : i * 9 + j })
            }
          }
        }
        var solution;
        if (started) {
          solution = backtrack(newMatrix, this.state.solved);
        }else{
          solution = backtrack(newMatrix, {});
        }

        if ( solution.length !== 0 ){
            if (started){
              this.state.solved[newMatrix] = solution;
            }
            return newMatrix ;

        }else{
          return this.generateMatrix(filled, started);
        }

    }

  generateRandomBoard = () => {
    var newBoard = this.generateMatrix(initialFilled, true);
    this.setState({matrix: newBoard});
    this.stopCurrentSolution();
    this.resetBoard(newBoard,true);
  }

  clearBoard = () => {
    var newMatrix = [];
    for (var i = 0; i < 9; i++) {
      newMatrix.push([]);
      for (var j = 0; j < 9; j++) {
          newMatrix[i].push({ val : " ", row : i, col : j, id : i * 9 + j });
      }
    }
    this.setState({matrix : newMatrix})
    this.stopCurrentSolution();
    this.resetBoard(newMatrix, true);
  }

  resetBoard = (matrix, ifColor) => {

    var squares = document.getElementsByClassName("square");
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < matrix[i].length; j++) {
        squares[ i*9 + j ].innerText = matrix[i][j].val;
        if (ifColor) {
          squares[ i*9 + j ].style.backgroundColor = squareBackgroundColor;
        }
      }
    }


  }

  updateBoard = (animations) => {

    this.stopCurrentSolution();

    this.state.solved = {};
    this.timeouts = [];

    var squares = document.getElementsByClassName("square");
    var counter = 0;
    var k = 0;
    //var speed = Math.abs((((-1 * (document.getElementById("speedrange").value)) * speed_max / 100.0) + speed_max));
    var speed = ( (-1 * ( (document.getElementById("speedrange").value - speed_min) / (speed_max - speed_min) ) ) + 1  ) * 20000 / animations.length ;
    var curAnimation;
    var last = 0;
    var index = 0;


    while (counter < animations.length) {

      this.timeouts.push(setTimeout(() => {

        curAnimation = animations[k];

        if (last !== 0){
          last.style.backgroundColor = squareBackgroundColor;
        }

        index = curAnimation.index;
        if ( curAnimation.type === "increase" ){

            squares[index].style.backgroundColor = "green";
            squares[index].innerText = curAnimation.val;
            last = squares[index]
        }else{

          squares[index].style.backgroundColor = "red";
          squares[index].innerText = " ";
          last = squares[index]
        }
        if ( k === animations.length - 1 ){
          last.style.backgroundColor = squareBackgroundColor

          for (var row = 0; row < 9; row++) {
            for (var col = 0; col < 9; col++) {
              this.state.matrix[row][col].val = parseInt(squares[getIndex(row,col)].innerText, 10);
            }
          }
        }

        k++;
      }, counter * speed));
      counter++;
    };
  }

  squareClicked = (row, col) => {

    this.stopCurrentSolution();

    var tempMatrix = makeMatrixNumerical(this.state.matrix);
    var value = this.state.matrix[row][col].val
    var newVal;

    if ( value === " "){
      this.state.matrix[row][col].val = 1;
      newVal = 1;

    }else if ( value === 9 ){
      this.state.matrix[row][col].val = " ";
      newVal = 0;
    }else{
      this.state.matrix[row][col].val = parseInt( value,10 ) + 1;
      newVal = parseInt( value, 10 ) + 1;
    }
    tempMatrix[row][col] = newVal;

    var invalidCordList = getInvalid(tempMatrix);
    var invalidIndexList = [];
    for (var i = 0; i < invalidCordList.length; i++) {
      invalidIndexList.push(invalidCordList[i][0] * 9 + invalidCordList[i][1]);
    }


    var squares = document.getElementsByClassName("square");
    for (var i = 0; i < 81; i++) {
      if ( invalidIndexList.includes(i) ){
        squares[i].style.backgroundColor = "red";
      }else{
        squares[i].style.backgroundColor = squareBackgroundColor;
      }
    }
    this.resetBoard(this.state.matrix, false);
    }

  stopCurrentSolution = () => {
    //Clear all timeouts
    for (var i = 0; i < this.timeouts.length; i++) {
      clearTimeout(this.timeouts[i]);
    }
}

  render() {

    return (
      <div id="UI_container">
        <div className="header">
          <div id="banner">
            <h1>Sudoku Solver Visualization</h1>
          </div>

        </div>
        <div id="button_container">
          <div>

          <button className="control_button" onClick={() => this.clearBoard()}>Clear</button>
          <button className="control_button" onClick={() => this.generateRandomBoard()}>Randomize</button>

          <div id="range_container">
            <div className="data_header">Solving Speed:</div>
            <input type="range" className="slider" id="speedrange" min={speed_min} max={speed_max} defaultValue='50'></input>
          </div>
        </div>
          <button className="control_button solve" onClick={() => this.updateBoard(backtrack(JSON.parse(JSON.stringify(this.state.matrix)), this.state.solved))}>Solve</button>
        </div>

          <div id="boardContainerOuter">
            <div id="boardContainer">
              <Board key={"Board"} matrix={this.state.matrix} updateFunction={this.squareClicked}/>
              </div>
          </div>
      </div>

    );
  }
}


function getIndex(row,col){
  return (row * 9) + col
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function isValid(board, rowNum, colNum, number){
  //Determine if a number is valid in a position

  //Check Row
  for (var i = 0; i < 9; i++) {
    if ( board[rowNum][i] === number && i !== colNum ){
      return false
    }
  }

  //Check Col
  for (var j = 0; j < 9; j++) {
    if ( board[j][colNum] === number  && j !== rowNum){
      return false
    }
  }

  //Check Quadrant

  //Get quadrant lower limits
  var quadRow = ( Math.floor(rowNum / 3) + 1 ) * 3 - 3;
  var quadCol = ( Math.floor(colNum / 3) + 1 ) * 3 - 3;

  for (var row = quadRow; row < quadRow + 3; row++) {
    for (var col = quadCol; col < quadCol + 3; col++) {
      if ( board[row][col] === number  && row !== rowNum && col !== colNum){
        return false
      }
    }
  }

  return true


}

function getInvalid(board){

  var invalidList = [];

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        if ( board[i][j] !== 0 && !isValid(board, i, j, board[i][j] ) ){
          invalidList.push([i,j]);
        }
    }
  }
  return invalidList;
}

function makeMatrixNumerical( matrix ){

  var newMatrix = []

  for (var i = 0; i < 9; i++) {
    newMatrix.push([])
    for (var j = 0; j < 9; j++) {
      if ( matrix[i][j].val == " " ){
        newMatrix[i][j] = 0
      }else{
        newMatrix[i][j] = matrix[i][j].val
      }
    }
  }
  return newMatrix;
}



/*
 * squareClicked = (row, col) => {

   var iteration = 0
   var tempMatrix = makeMatrixNumerical(this.state.matrix);

   var value = this.state.matrix[row][col].val

   while (iteration < 9) {

     if ( value === " "){
       if ( isValid(tempMatrix, row, col, 1) ){
         this.state.matrix[row][col].val = 1;
         break;
       }else{
         value = 1;
         iteration += 1
       }

     }else if ( value === 9 ){
       this.state.matrix[row][col].val = " ";
       break;
     }

     if ( isValid(tempMatrix, row, col, value + 1) ){
         this.state.matrix[row][col].val = parseInt(value,10) + 1;
         break;
       }

     value += 1
     iteration += 1;

     }
     this.resetBoard(this.state.matrix);
   }
 */


/*<div className="bars_and_data">

  <div id="interfaceOuter">
    <div id="interfaceInner">



      <div className="control_button_container">


      </div>

      <div id="range_container">

        <div className="data_header">Solving Speed</div>
        <input type="range" className="slider" id="speedrange" min="10" max="200" defaultValue='50'></input>

      </div>

    </div>
  </div>
  <div id="boardContainerOuter">
    <div id="boardContainer">
      <Board matrix={this.state.matrix} updateFunction={this.squareClicked}/>
      </div>
  </div>
</div>
</div>*/
