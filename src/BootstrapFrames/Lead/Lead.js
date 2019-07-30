import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Container, Row, Col} from '../lib/Bootstrap.js';
import * as parentStyles from '../BootstrapFrames.scss';
import * as styles from './Lead.scss';


const Lead = props => {
  
  return <React.Fragment>
      <Row>
        <div style={parentStyles.headerCopy}>
          {props.Row1Top} {/*Brow*/}

          <div style={{
            ...parentStyles.fullWidthLanderGraphic,
            ...styles.row1MiddleWrapper
          }}>
            <div>
              {props.Row1Middle} {/*Feauture Item*/}
            </div>
          </div>


            {props.Row1Bottom} {/*Title*/}
        </div>
      </Row>

      {props.Row2 &&

        <Row>
          <Col sm={{span:12}}>
          {props.Row2}
          </Col>
        </Row>
      }

      {props.Row3 && (
        <Row> {/*Share Buttons*/}
          <div
            style={parentStyles.articleShareBar}
          >
            {props.Row3}

          </div>
        </Row>
      )}

      <Row>
        <Col sm={{span:10,offset:1}} md={{span:8, offset:2}} style={parentStyles.headerCopy} className='header-copy'>
          {props.Row4} {/*Deck*/}
        </Col>
      </Row>

{props.UnderRows} {/*Author, SponsorLogo*/}


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
