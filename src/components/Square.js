import React from 'react';

function Square(props) {
  var test = [];
  test.push(<div className="square" onClick={() => props.updateFunction(props.row,props.col,0)}>{props.value}</div>);
  if ( ( (props.col + 1) % 3) === 0 && props.col !== 8) {
    test.push(<div className="verticalBar"></div>);
  }
  return test
}
export default Square
