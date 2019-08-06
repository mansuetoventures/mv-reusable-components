import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import HeaderInfoSection from './HeaderInfoSection.js';

function App(){
    return <HeaderInfoSection 
    Row1={<div>This is row 1 </div>}
    Row2={<div>This is row 2</div>}
    Row3={<div>This is row 3</div>}
    Row4={<div>This is row 4</div>}
    Row5={<div style={{background:'red',width:'400px'}}>This is row 5</div>}
    />

}

ReactDOM.render(<App />, document.getElementById('root'));
