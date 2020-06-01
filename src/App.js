import React from 'react';
import './App.css';
import Board from "./components/Board.js"
import backtrack from "./components/backtrack.js"
//import Square from "./components/Square.js"



export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matrix: generateMatrix(),
    };

  }

  updateBoard = (animations) => {

    this.timeouts = [];

    var squares = document.getElementsByClassName("square");
    var counter = 0;
    var k = 0;

    var speed = 1;

    var curAnimation;
    var last = 0;
    var index = 0;


    while (counter < animations.length) {

      this.timeouts.push(setTimeout(() => {

        curAnimation = animations[k];

        if (last != 0){
          last.style.backgroundColor = "white"
        }

        if ( curAnimation.type === "increase" ){
            index = getIndex(curAnimation.row, curAnimation.col);
            squares[index].style.backgroundColor = "green";
            squares[index].innerText = curAnimation.val;
            last = squares[index]
        }else{
          index = getIndex(curAnimation.row, curAnimation.col);
          squares[index].style.backgroundColor = "red";
          squares[index].innerText = " ";
          last = squares[index]
        }
        if ( k === animations.length - 1 ){
          last.style.backgroundColor = "white"
        }

        k++;
      }, counter * speed));
      counter++;
    };

  }


  render() {

    return(<div id="solver">
      <div id="header">
          <button onClick={() => this.updateBoard(backtrack(JSON.parse(JSON.stringify(this.state.matrix))))}>Solve</button>
        </div>

      <div id="boardContainer">
        <Board matrix={this.state.matrix}/>
      </div>
    </div>
    );

  }

}


function generateMatrix(){

    var initial =  [[5, 3, 0,  0, 7, 0,  0, 0, 0],
                    [6, 0, 0,  1, 9, 5,  0, 0, 0],
                    [0, 9, 8,  0, 0, 0,  0, 6, 0],

                    [8, 0, 0,  0, 6, 0,  0, 0, 3],
                    [4, 0, 0,  8, 0, 3,  0, 0, 1],
                    [7, 0, 0,  0, 2, 0,  0, 0, 6],

                    [0, 6, 0,  0, 0, 0,  2, 8, 0],
                    [0, 0, 0,  4, 1, 9,  0, 0, 5],
                    [0, 0, 0,  0, 8, 0,  0, 7, 9]]

    initial =      [[0, 3, 0,  0, 7, 0,  0, 0, 0],
                    [0, 0, 0,  1, 9, 5,  0, 0, 0],
                    [0, 9, 8,  0, 0, 0,  0, 6, 0],

                    [8, 0, 0,  0, 0, 0,  0, 0, 3],
                    [4, 0, 0,  8, 0, 3,  0, 0, 1],
                    [7, 0, 0,  0, 0, 0,  0, 0, 6],

                    [0, 6, 0,  0, 0, 0,  2, 8, 0],
                    [0, 0, 0,  4, 1, 9,  0, 0, 5],
                    [0, 0, 0,  0, 8, 0,  0, 7, 9]]

    var newMatrix = [];

    for (var i = 0; i < initial.length; i++) {
      newMatrix.push([])
      for (var j = 0; j < initial[i].length; j++) {
        if (initial[i][j] === 0){
          newMatrix[i].push({ val : " ", row : i, col : j, key : i * 9 + j })
        }else{
          newMatrix[i].push({ val : initial[i][j], row : i, col : j, key : i * 9 + j })
        }
      }
    }

    return newMatrix
}


function getIndex(row,col){
  return (row * 9) + col
}
