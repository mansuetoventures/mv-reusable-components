import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon,} from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/fontawesome-free-solid';


const Plus = props=><FontAwesomeIcon icon={faPlus}  onClick={props.action} style={{cursor:'pointer'}}/>;
Plus.propTypes = {
  action: PropTypes.func
};

export default Plus;