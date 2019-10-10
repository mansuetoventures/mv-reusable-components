import ReactDOM from 'react-dom';
import React, { Component, useState } from 'react';

import ShareButton, {types, styles} from './ShareButton.js';

function ShareButtonDemo(){
    const [type,setType] = useState(types[0]);
    const [style, setStyle] = useState(styles[0]);
    return (
        <div>
            <ShareButton 
                type={type}
                style={style}
            />

            <select value={type} onChange={e=>setType(e.target.value)}>
                {types.map((typeName,i)=>
                    <option value={typeName} key={i}>{typeName}</option>)}
            </select>

            <select value={style} onChange={e=>setStyle(e.target.value)}>
                {styles.map((styleName,i)=>
                    <option value={styleName} key={i}>{styleName}</option>)}
            </select>
            
            
        </div>
      );
}


ReactDOM.render(<ShareButtonDemo />, document.getElementById('root'));

