import React, {Component, useImperativeHandle, useEffect, useState, useRef, useLayoutEffect} from 'react';

import PropTypes from 'prop-types';
import DraggableListWrapperDiv from './DraggableListWrapperDiv.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faMinus, faMinusSquare, faMinusCircle } from '@fortawesome/fontawesome-free-solid';
import {toArray, last} from 'lodash';

function getLocalMouseY(containerElement,globalMouseY){

    //Chose clientY arbitrarily (as opposed to screenY or pageY)
    //Where the click is on the page - where the element is positioned on the page will give how far down the mouse is inside of the element.
  
    return globalMouseY - containerElement.getBoundingClientRect().y;
  }
  
class DraggableListClass extends React.Component{
    constructor(props){
        super(props);
        console.log('c')

        //Declare Initial State
        //Keep track of the current list items in a history array
        this.state = {
            itemHistory:[props.list],
            historyIndex:0
        }


        //Declare element refs
        this.wrapperDivRef = React.createRef();
  
    //Declare dragging vars
      this.dragging = null;
      this.draggingIndex = null;
      this.draggingInitialY = null;
      this.initialMouseY = null;

        
    //Capture these elements so that dragging functionality can be calculated and executed
    this.listElements = [];
    this.listElementYValues = [];
  
  
    }
    handleMouseDown(){
      console.log('hmd')
      const handleMouseMove = function(event){
        console.log('hmm')

        //on click item, replace it with a placeholder, then make the child absolutely positioned. (not sure if this comment is still relevant)
    
    
    
        let mouseY = getLocalMouseY(this.wrapperDivRef.current,event.clientY);
    
    
        let mouseMovement = mouseY - this.initialMouseY;
        
        this.listElements.forEach((child,i)=>{
    
          if (child==this.dragging) {
  
            child.style.top=`${this.listElementYValues[i] + mouseMovement}px`;
            child.style.background='white';
          }
          else{
            if (this.listElementYValues[i] < this.draggingInitialY){
              if (this.listElementYValues[i]+(child.offsetHeight/2) > this.draggingInitialY + mouseMovement) child.style.top=`${this.listElementYValues[i] +this.dragging.offsetHeight}px`;
              else child.style.top=`${this.listElementYValues[i]}px`;
            }
            else if (this.listElementYValues[i] > this.draggingInitialY){
              if (this.draggingInitialY + this.dragging.offsetHeight + mouseMovement > this.listElementYValues[i] + (child.offsetHeight/2)) child.style.top=`${this.listElementYValues[i] - this.dragging.offsetHeight}px`;
              else child.style.top=`${this.listElementYValues[i]}px`;
            }
            else child.style.background='white';
          }
        });
      }
      const handleMouseMoveBound = handleMouseMove.bind(this);
  
      const handleMouseUp = function(e){
      console.log('hmu')
        //if it's above it's actually the first one that changed. If below it's the last.
        const indexToSwitchWith = this.listElements.reduce((accumulator,element,index)=>{
          //console.log(this.listElementYValues[index] , this.draggingInitialY);
          //console.log(element,this.dragging,element == this.dragging)
          //console.log(this.listElementYValues[index], this.draggingInitialY);
  
          //This function either doesn't update the return value (return accumulator) or updates the return value (index).
  
          //If the looped element is above the dragged element's starting position
          //console.log(this.listElementYValues[index] < this.draggingInitialY,element == this.dragging,this.listElementYValues[index]> this.draggingInitialY)
          //console.log(element.innerHTML,this.dragging.innerHTML);
          if (this.listElementYValues[index] < this.draggingInitialY){
            if (accumulator !== null) return accumulator; //hmmm
            //if the looped element's Y value is NOT the same as its current calculated value. Hmmm....
            else if (this.listElementYValues[index] !== element.getBoundingClientRect().y - this.wrapperDivRef.current.getBoundingClientRect().y) return index;
            else return accumulator;
          }
          else if (element == this.dragging) return accumulator; //You wouldn't switch with yourself right
          else if (this.listElementYValues[index]> this.draggingInitialY){
            if (this.listElementYValues[index] !== element.getBoundingClientRect().y - this.wrapperDivRef.current.getBoundingClientRect().y) return index;
            else return accumulator;
          }
      
        },null);
  
        console.log('Removing position styles from children');
        this.wrapperDivRef.current.style.height='';
        this.listElements.forEach((child,i)=>{
          child.style.position='';
          child.style.top='';
          child.style.width='';
          child.style.zIndex='';
          child.style.background='';
        });
      
      
        if (indexToSwitchWith){
          if (this.draggingIndex > indexToSwitchWith){
            this.wrapperDivRef.current.insertBefore(this.dragging,this.wrapperDivRef.current.children[indexToSwitchWith]);
          }
          else{
            this.wrapperDivRef.current.insertBefore(this.dragging,this.wrapperDivRef.current.children[indexToSwitchWith + 1]);
          }
          if (this.draggingIndex!==indexToSwitchWith) {
            const mostRecentHistoryItem = [...this.wrapperDivRef.current.children].map(c=>c.children[0].innerHTML);
            this.setState({itemHistory:[...this.state.itemHistory,mostRecentHistoryItem]})
            //Update: Turns out it wasn't this that wasn't working, it was the next call I think.
  
  
            //setItemHistory([...getItemHistory(),mostRecentHistoryItem]); //This worked
            /*setItemHistory(oldItemHistory=>{
              return [...oldItemHistory,mostRecentHistoryItem]}
            );*/ //This works https://stackoverflow.com/questions/54676966/push-method-in-react-hooks-usestate
            
            this.props.onChange(mostRecentHistoryItem);
          }
        }

  
      
        this.wrapperDivRef.current.removeEventListener('mousemove',handleMouseMoveBound);
        this.wrapperDivRef.current.removeEventListener('mouseup',handleMouseUpBound);
  
        //this.useEffect();
        //this.setState({placeholderIndex:null});
        //debugger;
        //assignListRefs();
      }
      const handleMouseUpBound = handleMouseUp.bind(this)

  
      //on click item, replace it with a placeholder, then make the child absolutely positioned.
      
      
      //Get the initialMouseY value, written in terms of it's "local" value to the element rather than it's "global" value from the page. It's derived from the global Y value and the Y position of the element you want to treat as the local element.
      this.initialMouseY = getLocalMouseY(this.wrapperDivRef.current,event.clientY);
  
  
  
  
      //Hardcode the height of the outerwrapper
      this.wrapperDivRef.current.style.height=`${this.listElements.reduce((sum,child)=>sum+child.offsetHeight,0)}px`;
  
      this.listElements.forEach((child,i)=>{
        child.style.position='absolute';
        child.style.top=`${this.listElementYValues[i]}px`;
        //child.style.width = '155px';
        //child.style.width='175px';
        child.style.width='100%';
  
      });
  
    
      let currentIndex=0;
      //While the bottom of an element is above the mouse click, it is not the "currentIndex"
      while(this.listElementYValues[currentIndex]+this.listElements[currentIndex].offsetHeight<this.initialMouseY) currentIndex++;
      console.warn(`You are dragging item ${currentIndex} out of ${this.listElements.length-1}`);
      
      //Now you have found the element that is currently intended by the user to be dragged
      this.dragging = this.listElements[currentIndex];
      this.dragging.style.zIndex='2';
      this.draggingIndex = currentIndex;
      this.draggingInitialY = this.listElementYValues[currentIndex];
  
      
      this.wrapperDivRef.current.addEventListener('mousemove',handleMouseMoveBound);
      this.wrapperDivRef.current.addEventListener('mouseup',handleMouseUpBound);
  
    }

    componentDidMount(){
      console.log('cdm')

        //Class: repeated code

      //useEffect #1

      //This needs to be called initially and whenever the list fundamentally changes.
  
      this.listElements = toArray(this.wrapperDivRef.current.children); 
      console.warn("Assigned listElements",this.listElements);
      this.listElementYValues = this.listElements.reduce((currentYValuesArray,listElement,i)=>{
        if (i == 0) currentYValuesArray[i] = 0;
        else{
          currentYValuesArray[i] = currentYValuesArray[i-1] + this.listElements[i-1].offsetHeight;
        }
        return currentYValuesArray;
      },[]);
      this.setState({
          historyIndex:this.state.itemHistory.length-1
      })

      //useEffect #2

      this.wrapperDivRef.current.addEventListener('mousedown',this.handleMouseDown.bind(this));
      if (typeof window.arr=='undefined') window.arr = [];
      //after dragging this becomes a bug
      [...this.wrapperDivRef.current.querySelectorAll('.minus')].forEach((e,i)=>{
        e.addEventListener('mousedown',e=>{
          e.stopPropagation();
          const svg = e.target.tagName == 'path'? e.target.parentNode: e.target;
          svg.parentNode.parentNode.removeChild(svg.parentNode);
          const mostRecentHistoryItem = [...this.wrapperDivRef.current.children].map(c=>c.children[0].innerHTML);
          //setItemHistory([...itemHistory,mostRecentHistoryItem]); This doesn't work...why?
          //setItemHistory([...getItemHistory(),mostRecentHistoryItem]); //This worked
          this.setState({
              itemHistory:[...this.state.itemHistory,mostRecentHistoryItem],
              historyIndex:this.state.historyIndex+1
            });
        
          props.onChange(mostRecentHistoryItem);
        })
      })
    }

    componentDidUpdate(prevProps,prevState){
      //debugger;
      console.log('cdu');

    //If new items are passed into the component, update the history and fire onChange.
    if (this.props.list.join('|||') !== prevProps.list.join('|||')){
        this.setState({
          itemHistory:[...this.state.itemHistory,this.props.list],
          itemIndex:this.state.itemHistory.length+1
        });
        this.props.onChange(props.list);
      }

      //useEffect #1

      //This needs to be called initially and whenever the list fundamentally changes.
      if (prevState.itemHistory.length !== this.state.itemHistory.length){
        this.listElements = toArray(this.wrapperDivRef.current.children); 
        console.warn("Assigned listElements",this.listElements);
        this.listElementYValues = this.listElements.reduce((currentYValuesArray,listElement,i)=>{
          if (i == 0) currentYValuesArray[i] = 0;
          else{
            currentYValuesArray[i] = currentYValuesArray[i-1] + this.listElements[i-1].offsetHeight;
          }
          return currentYValuesArray;
        },[]);
        this.setState({
          historyIndex:this.state.itemHistory.length-1
        })
      }



    }
    render(){
      const items = [...this.state.itemHistory[this.state.historyIndex]];
      console.log(items.join(' '));
      return <div><DraggableListWrapperDiv ref={this.wrapperDivRef}>
  
        {items.map((item,i)=>{
          return <div key={i} data-name={item}>
            <div className='draggableArea' style={{display:'inline-block',width:'100px'}}>{item}</div>
            <FontAwesomeIcon className='minus' icon={faMinusSquare} />
            {/*<div className='minus' style={{display:'inline-block',marginLeft:'30px',background:'green'}}>-</div>*/}
          </div>
        })}
  
      </DraggableListWrapperDiv>
      {this.props.debug && <div onClick={this.props.debug}>Debug</div>}
      </div>;
    }
  
  
  
  
  
  
  
    
  
  
  
  
  

   
  
  
  
  }
  
  
  DraggableListClass.defaultProps = {
    children:[],
    onChange:()=>{console.log("Changed!!!")}
  }
  
  DraggableListClass.propTypes = {
    children: PropTypes.array,
    onChange: PropTypes.func
  }
  
  export default DraggableListClass;
