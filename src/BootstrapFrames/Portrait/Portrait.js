import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col} from '../lib/Bootstrap.js';
import * as parentStyles from '../BootstrapFrames.scss';

const Portrait = props => (
  <React.Fragment>
    <Container>
      <Row>




        <Col sm={{span:6}} styles={parentStyles.portraitLeft}>
          <Row>
            <Col sm={{span:11}} styles={parentStyles.headerCopy}>

              {props.Col1} {/*Brow, Title, Deck*/}


              {props.InnerRow &&
                    <Row> {/*Share Buttons*/}
                      {props.InnerRow}
                    </Row>
                }

              {props.UnderContent} {/*Author, Sponsor Logo*/}
            </Col>
         </Row>
        </Col>


        <Col sm={{span:6}} styles={parentStyles.portraitImage}>

          {/*Feature Item*/} {/*Really want nested columns?*/}
          {props.Col2  && (
            <Col sm={{span:6}} className="header-copy">{props.Col2}</Col>
          )}
        </Col>




      </Row>
    </Container>
  </React.Fragment>
);

Portrait.propTypes = {
  Col1:PropTypes.node.isRequired,
  InnerRow:PropTypes.node,
  UnderContent:PropTypes.node,
  Col2:PropTypes.node

}

export default Portrait;
