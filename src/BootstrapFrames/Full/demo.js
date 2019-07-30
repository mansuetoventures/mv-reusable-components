import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Full from './Full.js';

function App(){
    return <Full 
    Row1={<div>This is row 1 </div>}
    Row2={<div>This is row 2</div>}
    Row3={<div>This is row 3</div>}
    Row4={<div>This is row 4</div>}
    Row5={<div>This is row 5</div>}
    UnderRows={<div>This is Under Rows</div>}
    UnderContainer={<div style={{background:'black',color:'white'}}>This is Under Container</div>}
    underContainerWidth='400px'
    />

}

ReactDOM.render(<App />, document.getElementById('root'));
