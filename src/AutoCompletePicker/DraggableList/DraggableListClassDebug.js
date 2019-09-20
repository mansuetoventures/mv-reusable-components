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
  


        
    //Capture these elements so that dragging functionality can be calculated and executed
    this.listElements = [];
    this.listElementYValues = [];
  
  
    }
    handleMouseDownDoesNotWork(){
        console.log('hmd')
       
  
    
        //on click item, replace it with a placeholder, then make the child absolutely positioned.
        
        
        //Get the initialMouseY value, written in terms of it's "local" value to the element rather than it's "global" value from the page. It's derived from the global Y value and the Y position of the element you want to treat as the local element.
        this.initialMouseY = getLocalMouseY(this.wrapperDivRef.current,event.clientY);
    
    
  
    
      

  
        
        this.wrapperDivRef.current.insertBefore(this.listElements[3],this.wrapperDivRef.current.children[2]);
  
  
        const mostRecentHistoryItem = [...this.wrapperDivRef.current.children].map(c=>c.children[0].innerHTML);
        const newHistory = [...this.state.itemHistory,mostRecentHistoryItem];

        //Somehow if this is called before, it still doesn't work
        //this.setState({itemHistory:[...this.state.itemHistory,['bogus','values','but','it','works']]});

        //But this one does
        //this.setState({itemHistory:this.state.itemHistory.map(e=>'e')});
        
        //Doesn't for index reasons
        //this.setState({itemHistory:[]});

        //Works (or does it?)
        //this.setState({itemHistory:['a']});

        //Works
        //this.setState({itemHistory:[['a'],['b']]});

        this.setState({itemHistory:newHistory});
  
        this.props.onChange(mostRecentHistoryItem);
  
        
  
  
    
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

      this.wrapperDivRef.current.addEventListener('mousedown',this.handleMouseDownDoesNotWork.bind(this));
      if (typeof window.arr=='undefined') window.arr = [];
      //after dragging this becomes a bug

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
      const items = this.state.itemHistory[this.state.historyIndex];
      return <div ref={this.wrapperDivRef}>
  
        {items.map((item,i)=>{
          return <div key={i}>
            <div className='draggableArea' style={{display:'inline-block',width:'100px'}}>{item}</div>
          </div>
        })}
  
      </div>
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
