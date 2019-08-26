import React, { Component } from 'react';
import PropTypes from 'prop-types';

import css from './ViewPicker.scss';

import {Optional, OneOf} from '../Optional/Optional.js';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { type } from 'os';

const X = props=><FontAwesomeIcon icon={['fas', 'times']}  onClick={props.onClick} />;
X.propTypes = {
  onClick: PropTypes.func
};

class ViewPicker extends React.Component{
  constructor(){
    super();
    this.state = {
      menuKey:null
    };
  }
  render(){
    const props = this.props;

    return <div className={css.viewPicker}>
      <h1>Insert Inline Item</h1>
      <OneOf whichOne={this.state.menuKey !== null}>
        <ul className={css.views}>
          {Object.keys(props.views).map(key=>{
            return <li key={key} onClick={()=>this.setState({
              menuKey:key
            })}>{key}</li>;
          })}
        </ul>
        <div>
          <X onClick={()=>{this.setState({menuKey:null})}} />
          <div>{this.props.views[this.state.menuKey]}</div>
        </div>

      </OneOf>

    </div>;
  }
}

ViewPicker.propTypes = {
  views: PropTypes.node
}

export default ViewPicker;
