import React, {Component} from 'react';
import PropTypes from 'prop-types';

const FeatureItemArea = props=>{

 

  return  <React.Fragment><div className='background' style={{
          background:props.background
        }}>
          <div className='width' style={{width:props.width,margin:'0 auto',maxWidth:'100%'}}>{props.children}</div>
        </div>

      {props.captionArea}
      </React.Fragment>


};

FeatureItemArea.defaultProps = {
  background:'#f6f6f6'
}


FeatureItemArea.propTypes = {
  children:PropTypes.node.isRequired,
  width:PropTypes.string,
  background:PropTypes.string,
  captionArea:PropTypes.node
}

export default FeatureItemArea;
