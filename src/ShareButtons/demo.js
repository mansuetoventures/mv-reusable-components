import ReactDOM from 'react-dom';
import React, { Component, useState } from 'react';

import {types, styles} from '../ShareButton/ShareButton.js';
import ShareButtons from './ShareButtons.js';
//import AutoCompletePicker from '../AutoCompletePicker/AutoCompletePicker.js'; todo
import DraggableList from '../AutoCompletePicker/DraggableList/DraggableList.js';

function ShareButtonsDemo(){
    const [list, setList] = useState(types)
    const [width, setWidth] = useState(100);
    const [fontSize, setFontSize] = useState(20);
    const [style, setStyle] = useState(styles[0])

    return (
        <div>
            <ShareButtons types={list} widthPx={width} fontSizePx={fontSize} style={style}/>
            {/*
            <AutoCompletePicker list={list} onChange={(list)=>{
                console.log(list);
                setList(list);
            }} />*/}

            <DraggableList list={types} onChange={(list)=>{
                console.log(list);
                setList(list);
            }} />
            <div>
            Width (px): <input type="range" min={100} max={600} value={width} onChange={e=>setWidth(e.target.value)}/> {width}
            </div>
            <div>
            Font Size (px): <input type="range" min={10} max={30} value={fontSize} onChange={e=>setFontSize(e.target.value)}/> {fontSize}
            </div>
            <div>
                Style:
            <select value={style} onChange={e=>setStyle(e.target.value)}>
                {styles.map((styleName,i)=>
                    <option value={styleName} key={i}>{styleName}</option>)}
            </select>
            </div>
            
        </div>
      );
}


ReactDOM.render(<ShareButtonsDemo />, document.getElementById('root'));

