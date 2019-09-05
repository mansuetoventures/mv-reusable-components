import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';

const DoubleView = props=>{
    return [props.view1 , props.view2][props.viewIndex];
  }

  export default DoubleView;