import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Container, Row, Col} from '../lib/Bootstrap.js';
import * as parentStyles from '../BootstrapFrames.scss';
import * as styles from './Lead.scss';

import HeaderInfoSection from '../HeaderInfoSection/HeaderInfoSection.js';


const Lead = props => {
  
  return <React.Fragment>
      <Row>
        <div style={parentStyles.headerCopy}>

          {/*Is it necessary for this to be different than Full/Pano? Also it's a Row not inside a Container...*/}
          <div style={{
            ...parentStyles.fullWidthLanderGraphic,
            ...styles.row1MiddleWrapper
          }}>
            <div>
              {props.Row1Middle} {/*Feauture Item*/}
            </div>
          </div>


        </div>
      </Row>

      <HeaderInfoSection 
        Row1={props.Row1}
        Row2={props.Row2}
        Row3={props.Row3}
        Row4={props.Row4}
        Row5={props.Row5}
      />

  </React.Fragment>

};

Lead.propTypes = {
  Row1Top:PropTypes.node.isRequired,
  Row1Middle:PropTypes.node.isRequired,
  Row1MiddleMaxWidth:PropTypes.number,
  Row1Bottom:PropTypes.node.isRequired,

  Row2:PropTypes.node,
  Row3:PropTypes.node,
  Row4:PropTypes.node.isRequired,
  UnderRows:PropTypes.node.isRequired,
}

export default Lead;
