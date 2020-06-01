import React from 'react';
import Row from './Row'


function Board(props) {
  var matrix = props.matrix
  var rows = [];
  var counter = 0
  for (var i = 0; i < matrix.length; i++) {
    if (counter === 3){
      counter = 0
      rows.push(<div className="horizontalBar"></div>)
    }
    rows.push( <Row items = {matrix[i]} key={i} updateFunction={props.updateFunction} />)
    counter = counter + 1

  }
  return rows
}
export default Board

/*
export default ({matrix}) => (


  <div id='board'>
    {matrix.map(
      ({row}) => <Row items = {row}/>
    )}
  </div>
)
*/
