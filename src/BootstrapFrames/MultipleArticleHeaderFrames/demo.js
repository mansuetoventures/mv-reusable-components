import ReactDOM from 'react-dom';
import React, { Component, useState } from 'react';

import MultipleArticleHeaderFrames from './MultipleArticleHeaderFrames.js';



function App(){
    const [headerType,setHeaderType] = useState('lead');
    return <div><MultipleArticleHeaderFrames 
        topRegion={<div>Here is some top text</div>}

        headerType={headerType}
        shareButtons={<div>Share buttons</div>}
        brow={<div>Brow</div>}
        h1={<div>h1</div>}
        h2={<div>h2</div>}
        featureItem={<div>Feature Item</div>}
        authors={<div>Authors</div>}
        grid={<div>grid</div>}
        sponsorLogo={<div>sponsor logo</div>}

        bottomRegion={<div>Here is some bottom text.</div>}
    />

    <select id="lang" onChange={(e)=>{
        setHeaderType(e.target.value)
    }} value={headerType}>
    <option value="lead">Lead</option>
                  <option value="portrait">Portrait</option>
                  <option value="full">Full</option>
               </select>
    </div>

}

ReactDOM.render(<App />, document.getElementById('root'));
