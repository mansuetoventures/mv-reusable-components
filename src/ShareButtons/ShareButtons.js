import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import isUndefined from 'lodash/isUndefined';
import ShareButton from '../ShareButton/ShareButton.js';
import DraggableList from '../AutoCompletePicker/DraggableList/DraggableList.js';

  const ShareButtons = props=> <div style={{
    display:'flex',
    justifyContent:'space-between',
    width:`${props.widthPx}px`,
    fontSize:`${props.fontSizePx}px`
  }}>
      {props.types.map((type,i)=>{
  
  
  if (props.override[type]){
      Object.keys(props.override[type]).forEach(key=>{
          if (!props.override[type][key]) delete props.override[type][key];
        })
  }
    


    const config = {
      ...props.default,
      ...props.override[type]
    }

    let style;
    if (i===props.types.length-1) style={marginRight:'0'}
    else style = {};
    return <ShareButton type={type} key={i} {...config} style={props.style} styleAttr={style}/>
  })}
      </div>

    ShareButtons.propTypes = {
      default:PropTypes.object, //{url,headline,summary}
      override:PropTypes.object //keys must match types {LinkedIn:{url,headline,summary},Facebook:{url,headline,summary} etc}
    }

    ShareButtons.defaultProps={
      override:{}
    }

  export default ShareButtons;
