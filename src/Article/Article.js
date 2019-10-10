import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import styles from './Article.scss';

import DialogBasedOnDialogMessage from '../DialogBasedOnDialogMessage/DialogBasedOnDialogMessage.js';
import MultipleArticleHeaderFrames from '../BootstrapFrames/MultipleArticleHeaderFrames/MultipleArticleHeaderFrames.js';

import EditableTitle from '../EditableTitle/EditableTitle.js';
import ArticleDeck from '../EditableDeck/EditableDeck.js';
import EditableBody from '../EditableBody/EditableBody.js';
import AsyncSwitch from '../AsyncSwitch/AsyncSwitch.js';
import ShareButtons from '../ShareButton/ShareButtons/ShareButtons.js';
import useSavable from '../hooks/useSavable.js';


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

    const [title,setTitle] = useState(props.title);

    const [setModified,saveState,saveResult,save,editableProps] = useSavable({
        title:props.title,
        deck:props.deck,
        body:props.body
    });

    function handleOnChange (changedProp,changedVal) {
        setModified(changedProp,changedVal);
        props.onChange(changedProp,changedVal);
    }
    return <div>
        <DialogBasedOnDialogMessage message={dialogMessage}/>
        
        <MultipleArticleHeaderFrames 
            headerType={props.headerType}

            topRegion={
                <div>
                    <AsyncSwitch label='Edit Mode' onSwitchedOn={()=>setEditMode(true)} onSwitchedOff={()=>setEditMode(false)}/>
                    {editableProps.title}
                    {editMode && <div>
                        <button disabled={saveState==0} onClick={save}>{['Edit to save','Save','Saving'][saveState]}</button>
                        {['','Success!','Error'][saveResult]}
                    </div>}

                </div>}
            shareButtons={<ShareButtons />}
            brow={<div>Brow</div>}
            h1={<EditableTitle style = {{display: "block"}} className = "class" onChange = {handleOnChange.bind(null,'title')} editable={editMode}>{editableProps.title}</EditableTitle>}
            h2={<ArticleDeck editable={editMode} onChange={handleOnChange.bind(null,'deck')}>{editableProps.deck}</ArticleDeck>}
            featureItem={<div>Feature Item</div>}
            authors={<div>Authors</div>}
            grid={<div>grid</div>}
            sponsorLogo={<div>sponsor logo</div>}
    
            bottomRegion={<div>Here is some bottom text.</div>}
        />
        <RandomWaypoint />
        <BodyAndOtherBS 
            articleBody={<EditableBody editable={editMode} onChange ={handleOnChange.bind(null,'body')}>{editableProps.body}</EditableBody>}
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
