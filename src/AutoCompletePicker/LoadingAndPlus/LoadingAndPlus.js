import React, {Component, useState} from 'react';
import PropTypes from 'prop-types';
import { faSpinner } from '@fortawesome/fontawesome-free-solid';
import Plus from '../Plus/Plus.js';

const ACPRow = styled.div`
display: flex;
justify-content: space-between;
align-items:center;
`;

import DoubleView from '../DoubleView/DoubleView.js';

import styled, {keyframes} from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const Loading = props=><LoadingWrapper><FontAwesomeIcon icon={faSpinner}  onClick={props.action} /></LoadingWrapper>;
Loading.propTypes = {
  action: PropTypes.func
};

const spin = keyframes`
    spin { 100% { transform:rotate(360deg); } }
  `;



const LoadingWrapper = styled.div`
position:relative;
  left:-1px;
  animation:${spin} 1.5s linear infinite;`;


const LoadingAndPlus = props=>{
    return <ACPRow>
      <DoubleView
        view1={<Loading />}
        view2={<Plus action={props.onPlus} />}
        viewIndex={props.isLoading ? 0 : 1}
      ></DoubleView>
          </ACPRow>
  }

  LoadingAndPlus.propTypes = {
      onPlus:PropTypes.func,
      isLoading:PropTypes.bool
  }
  
  export default LoadingAndPlus;