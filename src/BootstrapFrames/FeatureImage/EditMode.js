import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Row, Col} from '../lib/Bootstrap.js';
import * as parentStyles from '../BootstrapFrames.scss';
import * as styles from './FeatureImage.module.scss';

const EditMode = props => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            {props.Image}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
};

EditMode.propTypes = {
  Image:PropTypes.node.isRequired,
  Buttons:PropTypes.array
}

export default EditMode;
