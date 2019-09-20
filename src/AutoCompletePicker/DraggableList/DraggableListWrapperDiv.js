
import React, {Component, useImperativeHandle, useEffect, useState, useRef, useLayoutEffect} from 'react';

const DraggableListWrapperDiv = React.forwardRef((props,ref)=>{
    const wrapperDivRef = useRef(null);
    useImperativeHandle(ref, ()=>wrapperDivRef.current);
    return <div className='wrapperDiv' style={{position:'relative'}} onMouseDown={props.onMouseDown} onMouseUp={props.onMouseUp} ref={wrapperDivRef}>{props.children}</div>
  });

  export default DraggableListWrapperDiv;
