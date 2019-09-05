import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {identity} from 'lodash';
import css from '../AutoCompletePicker.scss';

console.log(css);
const MenuBar = props=>{
  let children = props.children.filter(identity);
  return <div style={css.autoCompletePicker__row}>
    {children[0]}
    {children[1]}
    {children[2]}
  </div>;
};

MenuBar.propTypes = {
  children: PropTypes.node
};

export default MenuBar;
