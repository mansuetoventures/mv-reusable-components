import ReactDOM from 'react-dom';
import React, { useState, Component } from 'react';

import AutoComplete from './AutoComplete.js'
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

import ObjectOutput from '../DemoStuff/ObjectOutput.js';


const AutoCompletePickerDemo = props=>{
    const [chosen,setChosen] = useState(null);
    return <div>
    <div>
    <AutoComplete 
        nameField={'name'} 
        onChoose={obj=>setChosen(obj)} 
        customFilteredDataFunction={(query)=>{
            if (query=='error') return Promise.reject("This is an error");
            else return Promise.resolve(dataSource2.filter(f=>f.name.indexOf(query) > -1));
        }} onError={(err)=>{console.log(err)}}>
            Enter an animal name
        </AutoComplete>
        </div>
        <div>
            <h2>Data Source</h2>
            <ObjectOutput>
                {JSON.stringify(dataSource2)}
            </ObjectOutput>
            <h2>Choose</h2>
            <ObjectOutput>
                {JSON.stringify(chosen)}
            </ObjectOutput>
        </div>
    </div>
}
ReactDOM.render(<AutoCompletePickerDemo />, document.getElementById('root'));
