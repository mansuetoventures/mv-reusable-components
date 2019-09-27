import ReactDOM from 'react-dom';
import React, { Component, useState, useEffect } from 'react';

import Article from './Article.js';
import ArticleHeaderSelect from '../BootstrapFrames/MultipleArticleHeaderFrames/select.js';

import useCKEditor from '../hooks/useCKEditor.js';

import ObjectOutput from '../AutoCompletePicker/DemoStuff/ObjectOutput.js';

function App(){

    const [headerType,setHeaderType] = useState('full');
    const [title,setTitle] = useState('This is the title');
    const [deck,setDeck] = useState('This is the deck');

    const [currentChangedProp,setCurrentChangedProp] = useState(null);
    const [currentOriginal,setCurrentOriginal] = useState({});
    const [currentModified,setCurrentModified] = useState({});


    const IncCKEditorFeatures = useCKEditor('demo');

    const ckeditorState = typeof IncCKEditorFeatures == 'number'?IncCKEditorFeatures:2; 
    
    return <React.Fragment>
    <Article 
        headerType={headerType}
        title={title}
        deck={deck}
        onChange={(changedProp,changedVal,newOriginal,newModified)=>{
            console.log(changedProp,changedVal,newOriginal,newModified)
            setCurrentChangedProp(changedProp);
            setCurrentOriginal(newOriginal);
            setCurrentModified(newModified);
        }}
    />




    <div style={{borderTop:'3px solid black',marginTop:'10px'}}>
        <ArticleHeaderSelect value={headerType} onSelect={newValue=>{setHeaderType(newValue)}}/>
        
        {[
            'CKEditor not loaded',
            'CKEditor loading',
            'CKEditor load error',
            'CKEditor loaded'
        ][ckeditorState]}

        <ObjectOutput>{JSON.stringify(currentOriginal)}</ObjectOutput>
        <ObjectOutput>{JSON.stringify(currentModified)}</ObjectOutput>


    </div>
    </React.Fragment>
}

ReactDOM.render(<App />, document.getElementById('root'));
