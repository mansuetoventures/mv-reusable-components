import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import AutoCompletePicker from './AutoCompletePickerOld.js';
import MainMenu from './MainMenu/MainMenu.js';
import AutoComplete from './AutoComplete/AutoComplete.js'
const dataSource = [{name:'Apple'},{name:'Orange'},{name:'Banana'}];
const dataSource2 = `
Cat
Dog
Bunny
Horse
Dolphin
Deer
Moose
Buffalo
Alligator
Ram
Bear
Turtle
Pony
Seagull
Rhinoceros
Bat
Zebra
Tiger
Lion
Monkey
Ant
Giraffe
Eagle
Elephant
Leach
Cow
`.split('\n').filter(e=>e).map(e=>{
    return {name:e}
});



const AutoCompletePickerDemo = props=>{
    return <div>
        <h1>Entire Component</h1>
        <AutoCompletePicker 
        placeholder='Add animal' //"Add action directions"
        dataSource={[{name:'Alligator'},{name:'Bear'},{name:'Cow'},{name:'Dog'},{name:'Elephant'},{name:'Flamingo'},{name:'Giraffe'}]}
        

    />
   
    </div>
}
ReactDOM.render(<AutoCompletePickerDemo />, document.getElementById('root'));
