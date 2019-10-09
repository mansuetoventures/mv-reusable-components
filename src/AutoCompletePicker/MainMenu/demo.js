import ReactDOM from 'react-dom';
import React, { Component, useState } from 'react';

import MainMenu from './MainMenu.js';

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



const MainMenuDemo = props=>{
    const [showMenu,setShowMenu] = useState(false);
    const [list,setList] = useState([]);

    return <div>
    {showMenu?
        <MainMenu 
            data={[{name:'Alligator'},{name:'Bear'},{name:'Cow'},{name:'Dog'},{name:'Elephant'},{name:'Flamingo'},{name:'Giraffe'}]}
            customFilteredDataFunction={(query)=>{
                return Promise.resolve(dataSource2.filter(f=>f.name.indexOf(query) > -1));
            }}
            onEx={()=>setShowMenu(false)}
            onChange={obj=>{setList(obj)}}
        />:
        <div onClick={()=>setShowMenu(true)}>Click to show menu</div>
    }
       
        <div>
            <h2>Data Source</h2>
            <ObjectOutput>
                {JSON.stringify(dataSource2)}
            </ObjectOutput>

            <h2>List</h2>
            <ObjectOutput>
                {JSON.stringify(list)}
            </ObjectOutput>
        </div>
        <div>
            <p>The component that this is demoing is the entire screen containing the list, the plus, the "Apply", the autocomplete, and the X.</p>
            <p>This component accepts a prop called `data` which is the currently selected items</p>
            <p>onEx prop allows you to set a state which hides/shows. (I wonder if passing the entire X component makes more sense.</p>
            <p>onChange prop allows you to get and output the current list after a change.</p>
            
            
            <p>It accepts `customFilteredDataFunction` which is just passed to AutoComplete to determines what the AutoComplete results should be given a query (should this be abstracted?)</p>

        </div>
    </div>
}
ReactDOM.render(<MainMenuDemo />, document.getElementById('root'));
