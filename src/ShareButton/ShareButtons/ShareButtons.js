import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import isUndefined from 'lodash/isUndefined';
import ShareButton from '../ShareButton.js';
import DraggableList from '../../AutoCompletePicker/DraggableList/DraggableList.js';


  const ShareButtons = props=> {
    const {types, style, widthPx, fontSizePx, url, headline, summary, source, via} = props;

  return <div style={{
    display:'flex',
    justifyContent:'space-between',
    width:`${props.widthPx}px`,
    fontSize:`${props.fontSizePx}px`
  }}>


      {props.types.map((type,i)=>{
  
  



  

   
    return <ShareButton type={type} key={i} style={style} widthPx={widthPx} fontSizePx={fontSizePx} url={url} headline={headline} summary={summary} source={source} via={via}/>
  })}
      </div>
  }

    ShareButtons.propTypes = {
      default:PropTypes.object, //{url,headline,summary}
      override:PropTypes.object //keys must match types {LinkedIn:{url,headline,summary},Facebook:{url,headline,summary} etc}
    }

    ShareButtons.defaultProps={
      override:{}
    }

  export default ShareButtons;
