import ReactDOM from 'react-dom';
import React, { Component, useState } from 'react';

import {types as theTypes, styles} from '../ShareButton.js';
import ShareButtons from './ShareButtons.js';
//import AutoCompletePicker from '../AutoCompletePicker/AutoCompletePicker.js'; todo
import DraggableList from '../../AutoCompletePicker/DraggableList/DraggableList.js';

import {Content,Form,Field} from '../../Demo/demoitems.js';

import useShareButtonState from '../state.js';


function ShareButtonsDemo(){
    const [types, setTypes] = useState(theTypes)
    const [width, setWidth] = useState(100);
    const [fontSize, setFontSize] = useState(20);

    const [
        style, setStyle,
        url, setUrl, 
        headline, setHeadline, 
        summary, setSummary,
        source, setSource,
        via, setVia
    ] = useShareButtonState(
        styles[1],
        'http://www.bing.com/',
        'A beautiful search engine, better than google',
        'Bing is a search engine that was built by microsoft',
        'localhost!',
        'Your name');


    return (
        <div>
            <Content>
                <ShareButtons types={types} widthPx={width} fontSizePx={fontSize} style={style} url={url} headline={headline} summary={summary} source={source} via={via}/>
            </Content>
            {/*
            <AutoCompletePicker list={list} onChange={(list)=>{
                console.log(list);
                setList(list);
            }} />*/}
            <Form>
                <Field label="Buttons">
                    <DraggableList list={types} onChange={(list)=>{
                        setTypes(list);
                    }} />
                </Field>
                <Field label="Width (px)">
                    <input type="range" min={100} max={600} value={width} onChange={e=>setWidth(e.target.value)}/> {width}
                </Field>
            <Field label="Font Size (px)">
                <input type="range" min={10} max={30} value={fontSize} onChange={e=>setFontSize(e.target.value)}/> {fontSize}
            </Field>
            <Field label="Style">
                <select value={style} onChange={e=>setStyle(e.target.value)}>
                    {styles.map((styleName,i)=>
                        <option value={styleName} key={i}>{styleName}</option>)}
                </select>
            </Field>
            <Field 
                    label='Url'
                    value={url}  
                    onChange={e=>{setUrl(e)}}
                    description={<p>The link that you are sharing (most likely the current page).</p>}
                />
                <Field 
                    label='Headline'
                    value={headline}  
                    onChange={e=>{setHeadline(e)}}
                    description={<p>Used on Twitter. Referenced on LinkedIn but seems not to be used in the end.</p>}
                />
                <Field 
                    label='Summary'
                    value={summary} 
                    onChange={e=>{setSummary(e)}}
                    description={<p>Referenced on LinkedIn but seems not to be used in the end.</p>}
                />
                <Field 
                    label='Source' 
                    value={source} 
                    onChange={e=>{setSource(e)}}
                    description={<p>This is used for LinkedIn share button as a query parameter. I'm not exactly sure what it is for; in fact, the entire way we are sharing on linkedin seems to be outdated. <a href="https://docs.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin?context=linkedin/consumer/context">It should be a POST request.</a> Upon investigation, I think that the LinkedIn button only ends up passing the url.</p>} />
                <Field 
                    label='Via' 
                    value={via} 
                    onChange={e=>{setVia(e)}}
                    description={<p>TUsed on Twitter.</p>} 
                    
                />
            </Form>
        </div>
      );
}


ReactDOM.render(<ShareButtonsDemo />, document.getElementById('root'));

