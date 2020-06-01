import React from 'react';

function Square(props) {
  if ( ( (props.col + 1) % 3) === 0 && props.col !== 8) {
    var test = [];
    test.push(<div className="square">{props.value}</div>);
    test.push(<div className="verticalBar"></div>);
    return test
  }else{
    return <div className="square">{props.value}</div>;
  }
}
export default Square
