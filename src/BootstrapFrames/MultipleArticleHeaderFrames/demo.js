import ReactDOM from 'react-dom';
import React, { Component, useState } from 'react';

import MultipleArticleHeaderFrames from './MultipleArticleHeaderFrames.js';

import ArticleFrameTypeSelect from './select.js';


function App(){
    const [headerType,setHeaderType] = useState('lead');
    const [border,setBorder] = useState(10);

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

    <div style={{borderTop:`${border}px solid black`}}>This is not part of the header component. It has a top border style of 10px.</div>

    <ArticleFrameTypeSelect onSelect={(val)=>{
        setHeaderType(val)
    }} value={headerType}/>


    </div>

}

ReactDOM.render(<App />, document.getElementById('root'));
