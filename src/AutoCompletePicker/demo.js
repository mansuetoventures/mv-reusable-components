import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import AutoCompletePicker from './AutoCompletePicker.js';
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
        placeholder='Add fruit' //"Add action directions"

        customFilteredDataFunction={(query)=>{
            return Promise.resolve(dataSource.filter(f=>f.name.indexOf(query) > -1));
        }}

    />
    <h1>Just Main Menu</h1>
    <MainMenu 
        data={[{name:'Alligator'},{name:'Bear'},{name:'Cow'},{name:'Dog'},{name:'Elephant'},{name:'Flamingo'},{name:'Giraffe'}]}
        customFilteredDataFunction={(query)=>{
            return Promise.resolve(dataSource2.filter(f=>f.name.indexOf(query) > -1));
        }}
    />
    <h1>Just Auto Complete</h1>
    <AutoComplete 
        nameField={'name'} 
        onChoose={()=>{console.log("Choose")}} 
        customFilteredDataFunction={(query)=>{
            if (query=='error') return Promise.reject("This is an error");
            else return Promise.resolve(dataSource2.filter(f=>f.name.indexOf(query) > -1));
        }} onError={(err)=>{console.log(err)}}>
            This is the placeholder
        </AutoComplete>
    </div>
}
ReactDOM.render(<AutoCompletePickerDemo />, document.getElementById('root'));
