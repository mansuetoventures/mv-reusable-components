import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Item from '../Item/Item.js';

import css from '../AutoCompletePicker.scss';
import {toArray} from 'lodash';

const PlaceHolderItem = ()=><div className={`${css.row} ${css.placeholder}`}>Placeholder</div>;

//Is the initial children pattern good? Or should I just pass an array?
//"Intiial children" and initial props in general feel weird because you should be allowed to change props. You should handle both state change and props change.
//But with children it would be difficult to handle what to do when children change. Is this easy to do? If not, just pass in an array for now and experiment with this idea later.

function getLocalMouseY(event,containerElement){
  return event.clientY - containerElement.getBoundingClientRect().y;
}


class DraggableList extends Component{
  constructor(props){
    super();
    this.state = {
      children:props.children,
      placeholderIndex:null
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
    window.dl = this;

    this.wrapperDiv = React.createRef();
  }
  handleMouseMove(event){

    let mouseY = getLocalMouseY(event,this.wrapperDiv.current);
    let mouseMovement = mouseY - this.initialMouseY;

    this.listElements.forEach((child,i)=>{

      if (child==this.dragging) {
        child.style.top=`${child.initialY + mouseMovement}px`;
        child.style.background='white';
      }
      else{
        if (child.initialY < this.dragging.initialY){
          if (child.initialY+(child.offsetHeight/2) > this.dragging.initialY + mouseMovement) child.style.top=`${child.initialY +this.dragging.offsetHeight}px`;
          else child.style.top=`${child.initialY}px`;
        }
        else if (child.initialY > this.dragging.initialY){
          if (this.dragging.initialY + this.dragging.offsetHeight + mouseMovement > child.initialY + (child.offsetHeight/2)) child.style.top=`${child.initialY - this.dragging.offsetHeight}px`;
          else child.style.top=`${child.initialY}px`;
        }
        else child.style.background='white';
      }
    });
  }
  handleMouseDown(event){


    this.useEffect();

    //on click item, replace it with a placeholder, then make the child absolutely positioned.
    this.initialMouseY = getLocalMouseY(event,this.wrapperDiv.current);


    let currentIndex=0;
    while(this.listElements[currentIndex].initialY+this.listElements[currentIndex].offsetHeight<this.initialMouseY) currentIndex++;

    this.wrapperDiv.current.style.height=`${this.listElements.reduce((sum,child)=>sum+child.offsetHeight,0)}px`;

    this.listElements.forEach((child,i)=>{
      child.style.position='absolute';
      child.style.top=`${this.listElements[i].initialY}px`;
      //child.style.width = '155px';
      //child.style.width='175px';
      child.style.width='100%';

    });

    this.dragging = this.listElements[currentIndex];
    this.dragging.style.zIndex='2';
    this.draggingIndex = currentIndex;
    this.draggingInitialY = this.listElements[currentIndex].initialY;

    this.wrapperDiv.current.addEventListener('mousemove',this.handleMouseMove);




    /*
    this.setState({
      placeholderIndex:currentIndex
    });*/

  }
  handleMouseUp(){
    debugger;
    //this code is called on deletion and it messes with it.

    //if it's above it's actually the first one that changed. If below it's the last.

    const indexToSwitchWith = this.listElements.reduce((accumulator,element,index)=>{

      if (element.initialY < this.dragging.initialY){
        if (accumulator !== null) return accumulator;
        else if (element.initialY !== element.getBoundingClientRect().y - this.wrapperDiv.current.getBoundingClientRect().y) return index;
        else return accumulator;
      }
      else if (element == this.dragging) return accumulator;
      else if (element.initialY > this.dragging.initialY){
        if (element.initialY !== element.getBoundingClientRect().y - this.wrapperDiv.current.getBoundingClientRect().y) return index;
        else return accumulator;
      }

    },null);

    this.wrapperDiv.current.style.height='';
    this.listElements.forEach((child,i)=>{
      child.style.position='';
      child.style.top='';
      child.style.width='';
      child.style.zIndex='';
      child.style.background='';
    });


    if (this.draggingIndex > indexToSwitchWith){
      this.wrapperDiv.current.insertBefore(this.dragging,this.wrapperDiv.current.children[indexToSwitchWith]);
    }
    else{
      this.wrapperDiv.current.insertBefore(this.dragging,this.wrapperDiv.current.children[indexToSwitchWith + 1]);

    }


    this.wrapperDiv.current.removeEventListener('mousemove',this.handleMouseMove);
    //this.useEffect();
    //this.setState({placeholderIndex:null});
    this.props.onSwitch(this.draggingIndex,indexToSwitchWith);
  }
  useEffect(){
    console.log('useEffect',this.listElements);
    this.listElements = toArray(this.wrapperDiv.current.children);
    let prevChild;
    this.listElements.forEach((child,i)=>{
      if (i==0) child.initialY = 0;
      else child.initialY = prevChild.initialY + prevChild.offsetHeight;
      prevChild = child;
    });

  }
  componentDidMount(){
    //derives values needed for calculating what happens during drag
    this.useEffect();
  }
  componentDidUpdate(prevProps,prevState){

    
    //Somehow these aren't meshing
    if(prevProps.children!==this.props.children){
      this.setState({children:this.props.children});
    }

    //derives values needed for calculating what happens during drag
    if(prevProps.children.length!==this.props.children.length){this.useEffect();}
  }
  render(){


    //if (this.state.placeholderIndex || this.state.placeholderIndex==0) children.splice(this.state.placeholderIndex,1,<PlaceHolderItem key='placeholder'/>);

    const children = this.state.children
    console.log("Draggable List Render",this.state.children && this.state.children.map(e=>e.props.children[0]).join(' '))
    return <div style={{position:'relative'}} onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)} ref={this.wrapperDiv}>

      {children.map((child,i)=>{
        console.log(child.props.children[0])
        return <div key={i} data-name={child.props.children[0]}>{child}</div>
      })}

    </div>;
  }
}

DraggableList.propTypes = {
  children: PropTypes.array,
  onSwitch: PropTypes.func
}

export default DraggableList;
