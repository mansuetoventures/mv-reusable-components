import React, {Component} from 'react';
import PropTypes from 'prop-types'
import css from './AutoCompleteOption.scss'

class AutoCompleteOption extends Component{
  constructor(){
    super();
    this.state={
      selected:false
    };
  }
  handleClick(event){
    this.setState({selected:!this.state.selected});
    this.props.onClick(event);
  }
  render(){
    return <li className={this.state.selected?css.selectedAutoComplete:''} onClick={this.handleClick.bind(this)}>{this.props.children}</li>;
  }
}

AutoCompleteOption.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.array
}

export default AutoCompleteOption;
