import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon,} from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/fontawesome-free-solid';


const X = props=><FontAwesomeIcon icon={faTimes}  onClick={props.action} style={{cursor:'pointer'}} />;
X.propTypes = {
  action: PropTypes.func
};

export default X;