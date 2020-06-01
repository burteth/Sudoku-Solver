import React from 'react';
import Square from './Square'

export default ({items, updateFunction}) => (

  <div className='row'>{items.map(({row, col, id, val}) =>
    <Square key={id} row={row} col={col} value={val} updateFunction={updateFunction}/>
  )}</div>

)
