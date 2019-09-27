import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import isUndefined from 'lodash/isUndefined';
import ShareButton from '../ShareButton/ShareButton.js';


const AbstractShareButtons = props=>{

    return props.types.map((type,i)=>{
  
  
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
      return <ShareButton type={type} key={i} {...config} styleAttr={style}/>
    });
  }
  
AbstractShareButtons.defaultProps = {
    override:{}
}

  const ShareButtons = props=> <div style={{textAlign:'center'}}>
      <AbstractShareButtons types={['LinkedIn','Facebook','Twitter']} {...props}/>
      </div>

  export default ShareButtons;
