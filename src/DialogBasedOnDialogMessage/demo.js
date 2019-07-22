import ReactDOM from 'react-dom';
import React, { Component, useState } from 'react';

import DialogBasedOnDialogMessage from './DialogBasedOnDialogMessage.js';

function App(){
    const [message, setMessage] = useState('hello');

    window.setMessage=setMessage;

    return <div className='huh'>
        <p>Open the console and call the function setMessage() with an argument.</p>
        <p>This component is simply a dialog box that takes a "message" prop. If you pass a "message", then the dialog box opens up. If you close the dialog, then the internal state of the component closes the box. </p>
        <p>Note: If you pass the same message twice in a row, then useEffect will not trigger because React didn't detect that a prop changed. To get around this, either manually set the message to null in the parent component when the dialog changes using the event callback props.onClose, or pass an object instead of a string &#x6D;&#x65;&#x73;&#x73;&#x61;&#x67;&#x65;&#x3D;&#x7B;&#x7B;&#x6D;&#x65;&#x73;&#x73;&#x61;&#x67;&#x65;&#x3A;&#x27;&#x68;&#x65;&#x6C;&#x6C;&#x6F;&#x27;&#x7D;&#x7D;</p>
        <DialogBasedOnDialogMessage message={message}/>
    </div>

}



ReactDOM.render(<App />, document.getElementById('root'));
