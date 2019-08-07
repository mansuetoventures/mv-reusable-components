import ReactDOM from 'react-dom';
import React, { Component, useState } from 'react';

import Article from './Article.js';
import ArticleHeaderSelect from '../BootstrapFrames/MultipleArticleHeaderFrames/select.js';

function App(){

    const [headerType,setHeaderType] = useState('full');

    return <React.Fragment>
    <Article 
        headerType={headerType}
    />
    <ArticleHeaderSelect value={headerType} onSelect={newValue=>{setHeaderType(newValue)}}/>
    </React.Fragment>
}

ReactDOM.render(<App />, document.getElementById('root'));
