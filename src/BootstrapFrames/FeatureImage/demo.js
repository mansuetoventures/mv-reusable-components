import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import FeatureImage from './FeatureImage.js';

function App(){
    return <FeatureImage 
        Row1={<div>This is row 1</div>}
        Row3={<div>This is row 3</div>}
        UnderRows={<div>Under Rows</div>}
    />

}

ReactDOM.render(<App />, document.getElementById('root'));
