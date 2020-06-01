import React from 'react';


function backtrack(matrix, solvedDict){

    //Move all the values from the matrix over to an array
    var valuesMatrix = [];
    for (var i = 0; i < matrix.length; i++) {
      valuesMatrix.push([])
      for (var j = 0; j < matrix[i].length; j++) {
          valuesMatrix[i].push(matrix[i][j].val)
        }
      }

    // if the array has already been solved then return its solution
    if ( valuesMatrix in solvedDict ){
      return solvedDict[valuesMatrix];
    }

    // replace all " " with 0s
    var complete = false;
    for (var h = 0; h < 9; h++) {
      for (var k = 0; k < 9; k++) {
        if ( valuesMatrix[h][k] == " " ){
          complete = true;
          valuesMatrix[h][k] = 0;
        }
      }
    }

    if (!complete){
      return([])
    }

    // Find the solution
    var animations = [];
    var start = getNext( valuesMatrix, -1, -1 );
    var result = sudokuNext( valuesMatrix, start[0], start[1], animations )
    if ( result === true ){
      return(animations)
    }else{
      return([])
    }

}
export default backtrack;

function sudokuNext( board, row, col, animations){
  //If it seems like this isnt a valid solution then cancel everything
  if (animations.length > 40000){
    return false
  }

  for (var i = 1; i < 10; i++) {
    if ( isValid( board, row, col, i ) ) {

      animations.push(new Animation("increase", row, col, i));
      board[row][col] = i;
      var next = getNext( board , row, col);

      if (next === false){
        return true
      }
      if (sudokuNext( board, next[0], next[1], animations ) ) {
        return true
      }else{
        animations.push(new Animation("reset", row, col, 0));
        board[row][col] = 0
      }

    }

  }
  return false
}

function getNext( board, ignoreRow, ignoreCol ){

  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        if (board[i][j] === 0){
          if (i !== ignoreRow || j !== ignoreCol){
            return [i, j];
          }
        }
    }
  }

  return false
}

function isValid(board, rowNum, colNum, number){
  //Determine if a number is valid in a position

  //Check Row
  for (var i = 0; i < 9; i++) {
    if ( board[rowNum][i] === number ){
      return false
    }
  }

  //Check Col
  for (var i = 0; i < 9; i++) {
    if ( board[i][colNum] === number ){
      return false
    }
  }

  //Check Quadrant

  //Get quadrant lower limits
  var quadRow = ( Math.floor(rowNum / 3) + 1 ) * 3 - 3;
  var quadCol = ( Math.floor(colNum / 3) + 1 ) * 3 - 3;

  for (var row = quadRow; row < quadRow + 3; row++) {
    for (var col = quadCol; col < quadCol + 3; col++) {
      if ( board[row][col] === number ){
        return false
      }
    }
  }

  return true


}



class Animation {
  constructor( type, row, col, number){

    this.type = type;
    this.row = row;
    this.col = col;
    this.val = number;
    this.index = 9 * row + col;

  }
}
