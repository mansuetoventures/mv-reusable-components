import React, { Component, useState, useEffect } from 'react';
import loadScript from 'load-script';

//You can't put scripts in the state because the purpose of this component is to globally keep track of whether a script has loaded. Putting it in state will make it component specific.
if (typeof window!=='undefined') window.scripts_NOCONFLICT = {};

const SCRIPT_NOT_YET_CALLED = 0;
const SCRIPT_CALLED = 1;
const SCRIPT_ERROR = 2;



export default function useGlobalScript(scriptName,windowVarName,calledFrom){
    //if (calledFrom=='deck') console.log('useGlobalScript called from deck')
    
    if (typeof scripts == 'undefined') return undefined; //This hook should only run on browser, not server

    const [scriptsState,setScriptsState] = useState(window.scripts_NOCONFLICT) //Keep a local copy of window.scripts_NOCONFLICT for updating purposes
    //if (calledFrom=='deck') console.log('scriptsState',scriptsState)


    function setStateAndGlobal(val){
        scripts[scriptName]=val;
        setScriptsState({
            ...scripts,
            [scriptName]:val
        });
    }


    //const [scripts,setScripts] = useState({});

    /*
    console.log(scripts);
    function setScript(val){
        console.log("huh");
        setScripts({
            ...scripts,
            [scriptName]:val
        })
        console.log("yes")
    }*/

    if (typeof scripts[scriptName]=='undefined') {
        //console.log('scripts',scripts);
        //setScript(SCRIPT_NOT_YET_CALLED);
        setStateAndGlobal(SCRIPT_NOT_YET_CALLED);
    }
    else if (scripts[scriptName] == SCRIPT_NOT_YET_CALLED) {
        //setScript(SCRIPT_CALLED);
        //if (calledFrom=='deck') console.log('SCRIPT_NOT_YET_CALLED',scriptsState)

        setStateAndGlobal(SCRIPT_CALLED);

        loadScript(scriptName,(err)=>{
            //if (err) setScript(SCRIPT_ERROR);
            //else setScript(window[windowVarName]);
            if (err) {
                setStateAndGlobal(SCRIPT_ERROR);

             
            }
            else {
                setStateAndGlobal(window[windowVarName]);
            }
        });
    }

   
    return scripts[scriptName];
}
