import React, { Component } from 'react';

import PropTypes from 'prop-types';


const Container = props=><div className='container' style={props.style}>{props.children}</div>
Container.propTypes = {
  children:PropTypes.node
}
const Row = props=><div className='row' style={props.style}>{props.children}</div>;
Row.propTypes = {
  children:PropTypes.node
}
const Col = props=>{
  let className = `${props.className} ` || '';
  if (props.sm){
    if (typeof props.sm == 'number') className+=`col-sm-${props.sm} `;
    else {
      className+=`col-sm-${props.sm.span} `;
      if (props.sm.offset) className+=`offset-sm-${props.sm.offset} `;
    }
  }

  if (props.md){
    if (typeof props.md == 'number') className+=`col-md-${props.md} `;
    else {
      className+=`col-md-${props.md.span} `;
      if (props.md.offset) className+=`offset-md-${props.md.offset} `;
    }
  }


  return <div className={className} style={props.style}>{props.children}</div>
}
Col.propTypes = {
  className:PropTypes.string,
  children:PropTypes.node,
  sm:PropTypes.object,
  md:PropTypes.object
}

export {
  Container,Row,Col
}
