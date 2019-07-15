import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import Full from './BootstrapFrames/Full/Full.js';
import Portrait from './BootstrapFrames/Portrait/Portrait.js';

function App(){
    return <Full 
        Row1={<div>This is row 1</div>}
        Row2={<div>This is row 2</div>}
        Row3={<div>This is row 3</div>}
        Row4={<div>This is row 4</div>}
        UnderRows={<div>Under Rows</div>}
    />

}

ReactDOM.render(<App />, document.getElementById('root'));
