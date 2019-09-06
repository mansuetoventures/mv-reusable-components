import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {identity} from 'lodash';
import css from '../AutoCompletePicker.scss';

const MenuBar = props=>{
  let children = props.children.filter(identity);
  return <div className={`${css.row}`}>
    {children[0]}
    {children[1]}
    {children[2]}
  </div>;
};

MenuBar.propTypes = {
  children: PropTypes.node
};

export default MenuBar;
