import React, {Component} from 'react';
import PropTypes from 'prop-types'
import css from './AutoCompleteOption.scss'
import resultsCSS from '../AutoCompleteResults/AutoCompleteResults.scss';
console.log(resultsCSS);
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
    let style = resultsCSS.ul_results_li;
    if (this.state.selected) style = {...style,...css.selectedAutoComplete};
    return <li style={style} onClick={this.handleClick.bind(this)}>{this.props.children}</li>;
  }
}

AutoCompleteOption.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.string
}

export default AutoCompleteOption;
