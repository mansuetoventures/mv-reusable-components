import ReactDOM from 'react-dom';
import React, { Component, useState } from 'react';

import ShareButton, {types, styles} from './ShareButton.js';

import {Content,Form,Field} from '../Demo/demoitems.js';
import useShareButtonState from './state.js';

function ShareButtonDemo(){

    const [type, setType] = useState(types[0]);

    const [
        style, setStyle,
        url, setUrl, 
        headline, setHeadline, 
        summary, setSummary,
        source, setSource,
        via, setVia
    ] = useShareButtonState(types[0],styles[0],'http://www.google.com/','A beautiful search engine','This is the summary. I\'m not exactly sure what it\'s for.','Inc.com','Inc');


    return (
        <div>
            <Content>
                <ShareButton 
                    type={type}
                    style={style}

                    url={url}
                    headline={headline}
                    summary={summary}
                    
                    source={source}
                    via={via}
                />
            </Content>
            <Form numberOfColumns={2}>
                <Field label='Type'>
                    <select value={type} onChange={e=>setType(e.target.value)}>
                        {types.map((typeName,i)=>
                            <option value={typeName} key={i}>{typeName}</option>)}
                    </select>
                </Field>
                <Field label='Style'>
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
                    description={<p>Used on Twitter.</p>} />
            </Form>
            
            
        </div>
      );
}


ReactDOM.render(<ShareButtonDemo />, document.getElementById('root'));

