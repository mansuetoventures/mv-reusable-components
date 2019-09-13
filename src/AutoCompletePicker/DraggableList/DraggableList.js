import React, {Component, useImperativeHandle, useEffect, useState, useRef, useLayoutEffect} from 'react';
import PropTypes from 'prop-types';
import Item from '../Item/Item.js';

import css from '../AutoCompletePicker.scss';
import {toArray, last} from 'lodash';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMinus, faMinusSquare, faMinusCircle } from '@fortawesome/fontawesome-free-solid';

//In theory I can support undo/redo in this component but due to time I'm not going to fully implement this now.


//Is the initial children pattern good? Or should I just pass an array?
//"Intiial children" and initial props in general feel weird because you should be allowed to change props. You should handle both state change and props change.
//But with children it would be difficult to handle what to do when children change. Is this easy to do? If not, just pass in an array for now and experiment with this idea later.

function getLocalMouseY(containerElement,globalMouseY){

  //Chose clientY arbitrarily (as opposed to screenY or pageY)
  //Where the click is on the page - where the element is positioned on the page will give how far down the mouse is inside of the element.

  return globalMouseY - containerElement.getBoundingClientRect().y;
}


import DraggableListWrapperDiv from './DraggableListWrapperDiv.js';


import usePrevious from '../../usePrevious/usePrevious.js';


import useHook from './hook.js';

const DraggableList = props=>{

  //Declare Initial State
  //Keep track of the current list items in a history array
  const [itemHistory,setItemHistory] = useState([props.list]);
  const [historyIndex, setHistoryIndex] = useState(0);

  //Declare element refs
  const wrapperDivRef = useRef(null);

  //Declare dragging vars
  //Hooks note: On second thought, these probably don't need to be refs. They can probably just be regular variables because I don't see the need to keep these values between renders.
  const dragging = useRef(null);
  const draggingIndex = useRef(null);
  const draggingInitialY = useRef(null);
  const initialMouseY = useRef(null);




  //If new items are passed into the component, update the history and fire onChange.
  const prevListProp = usePrevious(props.list.join('|||'));
  useEffect(()=>{
    debugger;
    //Hooks note: This code needs to be in useEffect in order to have acceess to usePrevious variable (perhaps react hooks are a bit weird)
    if (prevListProp && prevListProp!==props.list.join('|||')) {

      //updateItemHistory is called for DOM stuff. This is all react so it's hardcoded again
      setItemHistory(oldItemHistory=>[...oldItemHistory,props.list]);
      setHistoryIndex(historyIndex=>historyIndex+1);
      props.onChange(props.list);

    }
  })
  

  



  //Capture these elements so that dragging functionality can be calculated and executed
  const listElements = useRef([]);
  const listElementYValues = useRef([]);


  //Hooks ToDo: Move some functionality to a hook for reusability
  useHook();



  //handlers for dragging and deleting items.
  const handleMouseDown = function(event){
    console.log("MOUSE DOWN CALLED!!!!!!")
    const handleMouseMove = function(event){
      //on click item, replace it with a placeholder, then make the child absolutely positioned. (not sure if this comment is still relevant)
  
  
  
      let mouseY = getLocalMouseY(wrapperDivRef.current,event.clientY);
  
  
      let mouseMovement = mouseY - initialMouseY.current;
      
      listElements.current.forEach((child,i)=>{
  
        if (child==dragging.current) {

          child.style.top=`${listElementYValues.current[i] + mouseMovement}px`;
          child.style.background='white';
        }
        else{
          if (listElementYValues.current[i] < draggingInitialY.current){
            if (listElementYValues.current[i]+(child.offsetHeight/2) > draggingInitialY.current + mouseMovement) child.style.top=`${listElementYValues.current[i] +dragging.current.offsetHeight}px`;
            else child.style.top=`${listElementYValues.current[i]}px`;
          }
          else if (listElementYValues.current[i] > draggingInitialY.current){
            if (draggingInitialY.current + dragging.current.offsetHeight + mouseMovement > listElementYValues.current[i] + (child.offsetHeight/2)) child.style.top=`${listElementYValues.current[i] - dragging.current.offsetHeight}px`;
            else child.style.top=`${listElementYValues.current[i]}px`;
          }
          else child.style.background='white';
        }
      });
    }

    const handleMouseUp = function(e){
    
      //if it's above it's actually the first one that changed. If below it's the last.
    
      const indexToSwitchWith = listElements.current.reduce((accumulator,element,index)=>{
        //console.log(listElementYValues.current[index] , draggingInitialY.current);
        //console.log(element,dragging.current,element == dragging.current)
        //console.log(listElementYValues.current[index], draggingInitialY.current);

        //This function either doesn't update the return value (return accumulator) or updates the return value (index).

        //If the looped element is above the dragged element's starting position
        //console.log(listElementYValues.current[index] < draggingInitialY.current,element == dragging.current,listElementYValues.current[index]> draggingInitialY.current)
        //console.log(element.innerHTML,dragging.current.innerHTML);
        if (listElementYValues.current[index] < draggingInitialY.current){
          if (accumulator !== null) return accumulator; //hmmm
          //if the looped element's Y value is NOT the same as its current calculated value. Hmmm....
          else if (listElementYValues.current[index] !== element.getBoundingClientRect().y - wrapperDivRef.current.getBoundingClientRect().y) return index;
          else return accumulator;
        }
        else if (element == dragging.current) return accumulator; //You wouldn't switch with yourself right
        else if (listElementYValues.current[index]> draggingInitialY.current){
          if (listElementYValues.current[index] !== element.getBoundingClientRect().y - wrapperDivRef.current.getBoundingClientRect().y) return index;
          else return accumulator;
        }
    
      },null);

    
      wrapperDivRef.current.style.height='';
      listElements.current.forEach((child,i)=>{
        child.style.position='';
        child.style.top='';
        child.style.width='';
        child.style.zIndex='';
        child.style.background='';
      });
    
    
      if (indexToSwitchWith){
        if (draggingIndex.current > indexToSwitchWith){
          wrapperDivRef.current.insertBefore(dragging.current,wrapperDivRef.current.children[indexToSwitchWith]);
        }
        else{
          wrapperDivRef.current.insertBefore(dragging.current,wrapperDivRef.current.children[indexToSwitchWith + 1]);
        }
        if (draggingIndex.current!==indexToSwitchWith) {
          const mostRecentHistoryItem = [...wrapperDivRef.current.children].map(c=>c.children[0].innerHTML);
          setItemHistory(itemHistory=>[...itemHistory,mostRecentHistoryItem]); //This doesn't work...why?
          //Update: Turns out it wasn't this that wasn't working, it was the next call I think.


          //setItemHistory([...getItemHistory(),mostRecentHistoryItem]); //This worked
          /*setItemHistory(oldItemHistory=>{
            return [...oldItemHistory,mostRecentHistoryItem]}
          );*/ //This works https://stackoverflow.com/questions/54676966/push-method-in-react-hooks-usestate
          
          props.onChange(mostRecentHistoryItem);
        }
      }

    
      wrapperDivRef.current.removeEventListener('mousemove',handleMouseMove);
      wrapperDivRef.current.removeEventListener('mouseup',handleMouseUp);

      //this.useEffect();
      //this.setState({placeholderIndex:null});
      //debugger;
      //assignListRefs();
    }
  

    //on click item, replace it with a placeholder, then make the child absolutely positioned.
    
    
    //Get the initialMouseY value, written in terms of it's "local" value to the element rather than it's "global" value from the page. It's derived from the global Y value and the Y position of the element you want to treat as the local element.
    initialMouseY.current = getLocalMouseY(wrapperDivRef.current,event.clientY);




    //Hardcode the height of the outerwrapper
    wrapperDivRef.current.style.height=`${listElements.current.reduce((sum,child)=>sum+child.offsetHeight,0)}px`;

    listElements.current.forEach((child,i)=>{
      child.style.position='absolute';
      child.style.top=`${listElementYValues.current[i]}px`;
      //child.style.width = '155px';
      //child.style.width='175px';
      child.style.width='100%';

    });

  
    let currentIndex=0;
    //While the bottom of an element is above the mouse click, it is not the "currentIndex"
    while(listElementYValues.current[currentIndex]+listElements.current[currentIndex].offsetHeight<initialMouseY.current) currentIndex++;
    console.warn(`You are dragging item ${currentIndex} out of ${listElements.current.length-1}`);
    
    //Now you have found the element that is currently intended by the user to be dragged
    dragging.current = listElements.current[currentIndex];
    dragging.current.style.zIndex='2';
    draggingIndex.current = currentIndex;
    draggingInitialY.current = listElementYValues.current[currentIndex];

    
    wrapperDivRef.current.addEventListener('mousemove',handleMouseMove);
    wrapperDivRef.current.addEventListener('mouseup',handleMouseUp);






  }


  //after render and updating the list based on props, recalculate the values needed for dragging calculation.
  useLayoutEffect(()=>{
    

    //This needs to be called initially and whenever the list fundamentally changes.

    listElements.current = toArray(wrapperDivRef.current.children); 
    console.warn("Assigned listElements",listElements.current);
    listElementYValues.current = listElements.current.reduce((currentYValuesArray,listElement,i)=>{
      if (i == 0) currentYValuesArray[i] = 0;
      else{
        currentYValuesArray[i] = currentYValuesArray[i-1] + listElements.current[i-1].offsetHeight;
      }
      return currentYValuesArray;
    },[]);

    setHistoryIndex(itemHistory.length-1);
    debugger;
  },[itemHistory.length]); //convert props.children to a string somehow with map or something.

  //lastly add event listeners for dragging and deleting
  useLayoutEffect(()=>{
    wrapperDivRef.current.addEventListener('mousedown',handleMouseDown);
    if (typeof window.arr=='undefined') window.arr = [];
    //after dragging this becomes a bug
    [...wrapperDivRef.current.querySelectorAll('.minus')].forEach((e,i)=>{
      e.addEventListener('mousedown',e=>{
        e.stopPropagation();
        const svg = e.target.tagName == 'path'? e.target.parentNode: e.target;
        svg.parentNode.parentNode.removeChild(svg.parentNode);
        const mostRecentHistoryItem = [...wrapperDivRef.current.children].map(c=>c.children[0].innerHTML);
        //setItemHistory([...itemHistory,mostRecentHistoryItem]); This doesn't work...why?
        //setItemHistory([...getItemHistory(),mostRecentHistoryItem]); //This worked
        setItemHistory(oldItemHistory=>[...oldItemHistory,mostRecentHistoryItem]); //This works https://stackoverflow.com/questions/54676966/push-method-in-react-hooks-usestate
        setHistoryIndex(oldHistoryIndex=>{
          return oldHistoryIndex+1
        });
        props.onChange(mostRecentHistoryItem);
      })
    })
  },[])

  const debug=()=>{
    console.log(itemHistory,historyIndex);
  }

  const arr = itemHistory[historyIndex];
  console.log('RENDERING',arr,historyIndex);

  debugger;
  return <div><DraggableListWrapperDiv ref={wrapperDivRef}>

      {arr.map((item,i)=>{
        debugger;
        return <div key={i} data-name={item}>
          <div className='draggableArea' style={{display:'inline-block',width:'100px'}}>{item}</div>
          <FontAwesomeIcon className='minus' icon={faMinusSquare} />
          {/*<div className='minus' style={{display:'inline-block',marginLeft:'30px',background:'green'}}>-</div>*/}
        </div>
      })}

    </DraggableListWrapperDiv>
    {props.debug && <div onClick={debug}>Debug</div>}
    </div>;

}


DraggableList.defaultProps = {
  children:[],
  onChange:()=>{console.log("Changed!!!")}
}

DraggableList.propTypes = {
  children: PropTypes.array,
  onChange: PropTypes.func
}










DraggableList.defaultProps = {
  children:[],
  onChange:()=>{console.log("Changed!!!")}
}

DraggableList.propTypes = {
  children: PropTypes.array,
  onChange: PropTypes.func
}



export default DraggableList;
