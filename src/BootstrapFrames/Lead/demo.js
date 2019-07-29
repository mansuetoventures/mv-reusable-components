import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Lead from './Lead.js';

function App(){
    return <Lead 
    Row1Top={<div>This is row 1 top</div>}
    Row1Middle={<div style={{
        background:'green',
        maxWidth:'970px'
    }}>This is row 1 middle</div>}
    Row1Bottom={<div>This is row 1 bottom</div>}

    Row2={<div>This is row 2</div>}
    Row3={<div>This is row 3</div>}
    Row4={<div>This is row 4</div>}

    UnderRows={<div>This is Under Rows</div>}
    />

}

ReactDOM.render(<App />, document.getElementById('root'));
