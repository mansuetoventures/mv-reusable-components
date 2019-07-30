import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import FeatureItemArea from './FeatureItemArea.js';

const coffeeImg = 'https://knowledge.wharton.upenn.edu/wp-content/uploads/2019/02/021419_coffeeclimatechange.jpg';

function App(){
    return <FeatureItemArea width='700px' /*background='#ff0000'*/ captionArea={<div><div>Hello</div><div>HOW ARE YOU DOING?</div></div>}>
        <img style={{width:'100%'}} src={coffeeImg}></img>
    </FeatureItemArea>
}

ReactDOM.render(<App />, document.getElementById('root'));
