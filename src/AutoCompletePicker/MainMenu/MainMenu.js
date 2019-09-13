import React, {Component, useState, useRef} from 'react';
import DraggableList from '../DraggableList/DraggableList.js';

import MenuBar from '../MenuBar/MenuBar.js';
import AutoComplete from '../AutoComplete/AutoComplete.js';

import styled from 'styled-components';

import PropTypes from 'prop-types';
import Plus from '../Plus/Plus.js';
import DoubleView from '../DoubleView/DoubleView.js';
import X from '../X/X.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { pullAt} from 'lodash';
window.pullAt = pullAt;


  
const Styles = styled.div`
width:175px;
`;

const ApplyWrapper = styled.div`
display:flex;
    align-items:center;
    justify-content: center;
    padding:3px;
    `



const MainMenu = props=>{
    const [selected,setSelected] = useState(props.data || []);
    const [showInput, setShowInput] = useState(false);
    const [data, setData] = useState();

    const wrapperDiv = useRef(null);

  function handleItemMinus(i){
    console.log(`index ${i}`);
    const old = selected.map(e=>e.name).join(' ');
    pullAt(selected,i); //returns pulled item
    const _new = selected.map(e=>e.name).join(' ');
    setSelected([...selected]);
    console.log(old);
    console.log(_new);
  }
  
  function handleChoose(obj){
    setSelected([...selected,obj]);
    setShowInput(false);
  }

    function handleOnSwitch(draggingIndex,switchWith){
  
      function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
          var k = new_index - arr.length + 1;
          while (k--) {
            arr.push(undefined);
          }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr; // for testing
      }
  
      array_move(selected,draggingIndex,switchWith);
  
      props.onSwitch && props.onSwitch(selected)
  
    }
  
    function handleApply(){
      console.log(props.onApply)
      props.onApply && props.onApply(selected);
    }
    
    console.log('Render selected',selected.map(e=>e.name).join(' '));
  
    return <Styles>
    <DraggableList onSwitch={handleOnSwitch} list={selected.map((obj)=>obj[props.nameValue])} />  
    <MenuBar>
      <Plus action={()=>setShowInput(true)} />
      <DoubleView
        view1={<ApplyWrapper onClick={handleApply}>
        APPLY
        </ApplyWrapper>}
        view2={<AutoComplete data={data} nameField={props.nameValue} onChoose={handleChoose} customFilteredDataFunction={props.customFilteredDataFunction} onError={()=>{console.log("To do: error handle")}}>{props.placeholder}</AutoComplete>}
        viewIndex={+ showInput}
      />
      <X action={()=>{if (showInput) setShowInput(false); else props.onEx()}} />
    </MenuBar>
  </Styles>;
  }

  MainMenu.defaultProps = {
    nameValue:'name'
  }

  MainMenu.propTypes = {
    data:PropTypes.array,
    onSwitch:PropTypes.func,
    onApply:PropTypes.func,
    nameValue:PropTypes.string,
    placeholder:PropTypes.string,
    customFilteredDataFunction:PropTypes.func
  }


  export default MainMenu;
