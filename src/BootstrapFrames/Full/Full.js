

//This doesn't seem to be right. HTML source on live inc site shows container and featureitem.
import React, {Component} from 'react';
//import Container from 'react-bootstrap/Container'
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import PropTypes from 'prop-types';

//temp
import * as parentStyles from '../BootstrapFrames.scss';
import * as styles from './Full.module.scss';
import {Container, Row, Col} from '../lib/Bootstrap.js';

import FeatureItemArea from '../FeatureItemArea/FeatureItemArea.js';

const Full = props=>{

 

  return <React.Fragment>
    <Container>

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

        {props.Row5  &&
         (
        <Row>
          {props.Row5}
        </Row>
      )}

      {props.UnderRows}
      </Container>

      {props.FeatureArea &&  //You need an "UnderUnder container" for the image caption and credit now.
        <FeatureItemArea background={props.featureAreaBackground} width={props.featureItemWidth} captionArea={props.captionArea}>
          {props.FeatureArea}
          {props.underFeatureArea}
        </FeatureItemArea>
      }

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
  UnderRows:PropTypes.node.isRequired,
  FeatureArea:PropTypes.node,
  underFeatureArea:PropTypes.node,
  featureAreaBackground:PropTypes.string,
  featureItemWidth:PropTypes.string
}

export default Full;
