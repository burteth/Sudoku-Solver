import React from 'react';

function Square(props) {
  var test = [];
  test.push(<div key={"Tile #".concat((props.row * 9 + props.col).toString())} className="square" onClick={() => props.updateFunction(props.row,props.col,0)}>{props.value}</div>);
  if ( ( (props.col + 1) % 3) === 0 && props.col !== 8) {
    test.push(<div key={"VerticalBar at Row #".concat(props.row.toString()).concat(" and Col #").concat(props.col.toString())} className="verticalBar"></div>);
  }
  return test
}
export default Square
