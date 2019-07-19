import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Article.scss';

import DialogBasedOnDialogMessage from '../DialogBasedOnDialogMessage/DialogBasedOnDialogMessage.js';

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
        <ArticleHeaderSupport />
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
