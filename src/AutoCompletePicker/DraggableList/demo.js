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
    return <div><p>
        This is to demo the DraggableList component which accepts a list prop and displays the list. Inside of the component, you can drag/drop and delete list items, and it keeps track of this internally in the state, and fires an onChange callback.
    </p>
    <p>It is not necessary to keep track of the list in the state of the parent component unless you plan on displaying it elsewhere, as we do on this demo page.</p>
    <div style={{padding:'40px',border:'1px solid black'}}>
    <DraggableList list={list} onChange={(list)=>{
        setOutputtedList(list);
    }} />
    </div>
    <button onClick={()=>{
        currentList++;
        setList(arrays[currentList % arrays.length]);
    }}>Change items</button>
    List (in state of demo component):{outputtedList.join(', ')}
          </div>

}

ReactDOM.render(<App />, document.getElementById('root'));
