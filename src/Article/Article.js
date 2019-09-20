import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Article.scss';

import DialogBasedOnDialogMessage from '../DialogBasedOnDialogMessage/DialogBasedOnDialogMessage.js';
import MultipleArticleHeaderFrames from '../BootstrapFrames/MultipleArticleHeaderFrames/MultipleArticleHeaderFrames.js';

import EditableTitle from '../EditableTitle/index.js';
import ArticleDeck from '../ArticleDeck/ArticleDeck.js';
import ArticleBody from '../ArticleBody/ArticleBody.js';
import AsyncSwitch from '../AsyncSwitch/AsyncSwitch.js';
import ShareButtons from '../ShareButtons/ShareButtons.js';

function ArticleHeaderSupport(){
    return "To do";
}

function RandomWaypoint(){
    return "To do";
}

function BodyAndOtherBS(props){
    return props.articleBody;
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
    const [editMode, setEditMode] = useState(false);


    
    return <div>
        <DialogBasedOnDialogMessage message={dialogMessage}/>
        <MultipleArticleHeaderFrames 
            headerType={props.headerType}

            topRegion={<AsyncSwitch label='Edit Mode' onSwitchedOn={()=>setEditMode(true)} onSwitchedOff={()=>setEditMode(false)}/>}
            shareButtons={<ShareButtons />}
            brow={<div>Brow</div>}
            h1={<EditableTitle editable={editMode}>{props.title}</EditableTitle>}
            h2={<ArticleDeck editable={editMode}>{props.deck}</ArticleDeck>}
            featureItem={<div>Feature Item</div>}
            authors={<div>Authors</div>}
            grid={<div>grid</div>}
            sponsorLogo={<div>sponsor logo</div>}
    
            bottomRegion={<div>Here is some bottom text.</div>}
        />
        <RandomWaypoint />
        <BodyAndOtherBS 
            articleBody={<ArticleBody editable={editMode}>Article Body component</ArticleBody>}
        />
        <Sidebar />
        <PublishButton />
        <WaypointPassedInAsProp />
        <ArticleFooter />
        <ArticleStubButton />
        <CustomJS />
    </div>
}

export default Article;
