import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Article.scss';

import DialogBasedOnDialogMessage from '../DialogBasedOnDialogMessage/DialogBasedOnDialogMessage.js';
import MultipleArticleHeaderFrames from '../BootstrapFrames/MultipleArticleHeaderFrames/MultipleArticleHeaderFrames.js';

function ArticleHeaderSupport(){
    return "To do";
}

function RandomWaypoint(){
    return "To do";
}

function BodyAndOtherBS(){
    return "To do";
}

function Sidebar(){
    return "To do";
}

function PublishButton(){
    return "To do";
}

function WaypointPassedInAsProp(){
    return "To do";
}

function ArticleFooter(){
    return "To do";
}

function ArticleStubButton(){
    return "To do";
}

function CustomJS(){
    return "To do";
}



function Article(){
    const [dialogMessage, setDialogMessage] = useState(null);
    return <div>
        <DialogBasedOnDialogMessage message={dialogMessage}/>
        <MultipleArticleHeaderFrames 
            topRegion={<div>Here is some top text</div>}

            headerType={'full'}
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
        <RandomWaypoint />
        <BodyAndOtherBS />
        <Sidebar />
        <PublishButton />
        <WaypointPassedInAsProp />
        <ArticleFooter />
        <ArticleStubButton />
        <CustomJS />
    </div>
}

export default Article;
