import React from 'react';
import Row from './Row'


function board(props) {
  var matrix = props.matrix
  var rows = [];
  for (var i = 0; i < matrix.length; i++) {
    rows.push( <Row items = {matrix[i]} />)
  }
  return rows
}
export default board

/*
export default ({matrix}) => (


  <div id='board'>
    {matrix.map(
      ({row}) => <Row items = {row}/>
    )}
  </div>
)
*/
