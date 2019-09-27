import React, {Component, useState, useEffect} from 'react';

function useSavable(original,onSave){
    const [
        propsBeforeEditing, //originally named "original", the hash representing the properties after editing, before saving
        setPropsBeforeEditing 
    ] = useState(original);

    const [
        propsReceivedDuringEditing, //theoretically it's possible to receieve props during editing. Created this to support handling this in the future.
        setPropsReceievedDuringEditing
    ] = useState({});

    const [
        editedProps, //When you change something, it ends this object.
        setEditedProps
    ] = useState({});

    const READY_TO_EDIT = 0; //"clean"
    const READY_TO_SAVE = 1; //"dirty"
    const SAVING = 2;

    const [saveState,setSaveState] = useState(READY_TO_EDIT);

    
    const NO_SAVE_ATTEMPT = 0;
    const SAVE_SUCCESS = 1;
    const SAVE_ERROR = 2;

    const [saveResult,setSaveResult] = useState(NO_SAVE_ATTEMPT);

    //0

    useEffect(()=>{
        
    },[editedProps])


    const save=()=>{
        setSaveState(SAVING);

        setTimeout(()=>{
            setSaveState(READY_TO_EDIT);
            setSaveResult(SAVE_SUCCESS);

            setPropsBeforeEditing(editedProps);
            setPropsAfterEditing({});
        },500);

        
        onSave();
    }

    //A function to set the state of a particular value. I could simply return setEditedProps but I like abstracting away the iterator thing.
    const setModified = (prop,val)=>{
        setSaveState(READY_TO_SAVE);
        setSaveResult(NO_SAVE_ATTEMPT);
        setEditedProps({
            ...editedProps,
            [prop]:val
        });
    };

    const editableProps = {
        ...propsBeforeEditing,
        ...editedProps
    }

    return [setModified,saveState,saveResult,save,editableProps];
}

export default useSavable;
