

//This doesn't seem to be right. HTML source on live inc site shows container and featureitem.
import React, {Component} from 'react';
//import Container from 'react-bootstrap/Container'
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

//temp
import {Container, Row, Col} from '../lib/Bootstrap.js';
import * as styles from './HeaderInfoSection.scss';
import * as parentStyles from '../BootstrapFrames.scss';

const HeaderInfoSection = props=>{
    return <Container>

      <Row> {/* Eyebrow And Title*/}
        <Col sm={{span:10}} style={styles.row1}>{props.Row1}</Col>
      </Row>

      {props.Row2 && <Row> {/*Product Comparison Grid*/}
        {props.Row2}
      </Row>}

      <Row> {/*Deck*/}
        <Col style={parentStyles.headerCopy} sm={{span:10,offset:1}} md={{span:8, offset:2}}>
          {props.Row3}
        </Col>
      </Row>

      <Row> {/*Share Buttons*/}
        {props.Row4}
      </Row>

        {/*Commenting out row5 because I don't see where it is used or why it was originally here*/}
        {/*props.Row5  &&
         (
        <Row>
          {props.Row5}
        </Row>
         )*/}
      </Container>
}

HeaderInfoSection.propTypes = {
    Row1:PropTypes.node.isRequired,
    Row2:PropTypes.node,
    Row3:PropTypes.node.isRequired,
    Row4:PropTypes.node.isRequired
  }

  
  export default HeaderInfoSection;
