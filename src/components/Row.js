/*import React from 'react';
import Square from './Square'*/


function Rows(items){

  var row = Array();
  for (var i = 0; i < items.length; i++) {
    row.push(items[i]);
  }
  return row;
}

export default Rows;
/*
export default ({items}) => (
  console.log(items),

  <div id='row'>
    {items.map(
      ({val}) => <Square value = {val}/>
    )}
  </div>
)
*/
