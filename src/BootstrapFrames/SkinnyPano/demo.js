import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import SkinnyPano from './SkinnyPano.js';

function App(){
    return <SkinnyPano 
        Row1={<div>This is row 1</div>}
        Row3={<div>This is row 3</div>}
        UnderRows={<div>Under Rows</div>}
    />

}

ReactDOM.render(<App />, document.getElementById('root'));
