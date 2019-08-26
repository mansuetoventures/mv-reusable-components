import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Article.scss';

import DialogBasedOnDialogMessage from '../DialogBasedOnDialogMessage/DialogBasedOnDialogMessage.js';
import MultipleArticleHeaderFrames from '../BootstrapFrames/MultipleArticleHeaderFrames/MultipleArticleHeaderFrames.js';

import ArticleTitle from '../ArticleTitle/ArticleTitle.js';
import ArticleDeck from '../ArticleDeck/ArticleDeck.js';
import ArticleBody from '../ArticleBody/ArticleBody.js';

function ArticleHeaderSupport(){
    return "To do";
}

function RandomWaypoint(){
    return "To do";
}

function BodyAndOtherBS(){
    return  <ArticleBody>Article Body component</ArticleBody>;
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



function Article(props){
    const [dialogMessage, setDialogMessage] = useState(null);



    
    return <div>
        <DialogBasedOnDialogMessage message={dialogMessage}/>
        <MultipleArticleHeaderFrames 
            headerType={props.headerType}

            topRegion={<div>Here is some top text</div>}
            shareButtons={<div>Share buttons</div>}
            brow={<div>Brow</div>}
            h1={<ArticleTitle>{props.title}</ArticleTitle>}
            h2={<ArticleDeck>{props.deck}</ArticleDeck>}
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
