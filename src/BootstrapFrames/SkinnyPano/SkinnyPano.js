import React, {Component} from 'react';
import {Container, Row, Col} from '../lib/Bootstrap.js';
import PropTypes from 'prop-types';
import * as parentStyles from '../BootstrapFrames.scss';

const SkinnyPano = props => (
  <header style={
    {
      ...parentStyles.articleHeader,
      ...parentStyles.skinnyPano
    }
  }>

  {props.TopDivContent} {/*Feature Image*/}

  <Container>
    <Row> {/*Brow and Title*/}
      <Col sm={{span:10}} style={parentStyles.headerCopy}>
        {props.Row1}
      </Col>
    </Row>

    {props.Row2 &&
          <Row> {/*Product Comparison Grid*/}
            <Col sm={{span:12}}>
              {props.Row2}
            </Col>
          </Row>
    }

    <Row> {/*Deck*/}
      <Col sm={{span:10, offset:1}} md={{span:8, offset:2}} className={`${parentStyles.headerCopy} header-copy`}>
        {props.Row3}
      </Col>
    </Row>

    {props.Row4 &&
          <Row> {/*Share Buttons*/}
              {props.Row4}
          </Row>
    }



{props.UnderRows} {/*Author, Sponsor Logo*/}
  </Container>
</header>
);

SkinnyPano.propTypes = {
  TopDivContent:PropTypes.node,//not required
  Row1:PropTypes.node.isRequired,
  Row2:PropTypes.node,
  Row3:PropTypes.node.isRequired,
  Row4:PropTypes.node,
  UnderRows:PropTypes.node
}

export default SkinnyPano;
