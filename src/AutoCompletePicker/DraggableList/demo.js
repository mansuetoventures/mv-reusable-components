import ReactDOM from 'react-dom';
import React, { Component, useState } from 'react';

import DraggableList from './DraggableList.js';

let currentList = 0;
const arrays = [
    ['First','Second','Third','Fourth','Fifth','Sixth'],
    ['Winter','Spring','Summer','Fall'],
    ['Jan','Feb','March','April','May','June','July','August','September','October','November','December']
]

function App(){


    const [list, setList] = useState(arrays[currentList]);
    const [outputtedList, setOutputtedList] = useState(arrays[currentList])
    return <div><div>Hello</div>
    <DraggableList list={list} debug={()=>{}} onChange={(list)=>{
        setOutputtedList(list);
    }} />
    <button onClick={()=>{
        currentList++;
        setList(arrays[currentList % arrays.length]);
    }}>Change items</button>
    {outputtedList.join(', ')}
          </div>

}

ReactDOM.render(<App />, document.getElementById('root'));
