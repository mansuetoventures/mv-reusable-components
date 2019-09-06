import ReactDOM from 'react-dom';
import React, { Component, useState, useEffect } from 'react';

import AsyncSwitch from './AsyncSwitch.js';



function App(){
    const [shouldErrorTurningOn,setShouldErrorTurningOn] = useState(false);
    const [shouldErrorTurningOff,setShouldErrorTurningOff] = useState(false);

    return <div>
        <div>
            Should Error Turning On:
            <input type="checkbox" value={shouldErrorTurningOn}  onChange={(e)=>{
                setShouldErrorTurningOn(e.target.checked)}
            }/>
        </div>
        <div>
            Should Error Turning Off:
            <input type="checkbox" value={shouldErrorTurningOff}  onChange={(e)=>setShouldErrorTurningOff(e.target.checked)}/>
            </div>
        <div>
        <AsyncSwitch 
        label='Demo Switch'
        initialChecked={true}
        onSwitchingOn={()=>{
            return new Promise((resolve,reject)=>{
                setTimeout(shouldErrorTurningOn?reject:resolve,1500);
            })
        }}
        onSwitchingOff={()=>{
            return new Promise((resolve,reject)=>{
                setTimeout(shouldErrorTurningOff?reject:resolve,500);
            })
        }}
    />
    </div>
    </div>
}

ReactDOM.render(<App />, document.getElementById('root'));
