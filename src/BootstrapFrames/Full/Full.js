

//This doesn't seem to be right. HTML source on live inc site shows container and featureitem.
import React, {Component} from 'react';
//import Container from 'react-bootstrap/Container'
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';



import HeaderInfoSection from '../HeaderInfoSection/HeaderInfoSection.js';

const Full = props=>{

 

  return <React.Fragment>
      <HeaderInfoSection 
        Row1={props.Row1}
        Row2={props.Row2}
        Row3={props.Row3}
        Row4={props.Row4}
        Row5={props.Row5}

      />

      {props.UnderContainer}

    </React.Fragment>
};

Full.defaultProps = {
  featureAreaBackground:'#f6f6f6'
}


Full.propTypes = {
  Row1:PropTypes.node.isRequired,
  Row2:PropTypes.node,
  Row3:PropTypes.node.isRequired,
  Row4:PropTypes.node.isRequired,
  Row5:PropTypes.node,
  UnderRows:PropTypes.node,
  UnderContainer:PropTypes.node
}

export default Full;
