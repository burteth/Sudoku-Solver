import React from 'react';
import './App.css';
import Board from "./components/Board.js"
import Square from "./components/Square.js"



export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      matrix: generateMatrix(),
    };

  }


  render() {

    return(<div id="boardContainer">
      <Board matrix={this.state.matrix}/>
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

    var newMatrix = [];

    for (var i = 0; i < initial.length; i++) {
      newMatrix.push([])
      for (var j = 0; j < initial[i].length; j++) {
        newMatrix[i].push( <Square value = {initial[i][j]} row = {i} col = {j} key = {i * 9 + j} />)
      }
    }

    return newMatrix
}
