import React, {Component} from 'react';
import PropTypes from 'prop-types'
import css from '../AutoCompletePicker.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';


class Item extends Component{
  constructor(){
    super();
    this.state = {

    };
  }
  handleMouseDown(){
    document.addEventListener('mousemove', this.handleMouseMoveImage,true);

    this.setState({dragging:true});
  }
  handleMouseUp(){
    this.setState({dragging:false})
  }
  render(){
    return <div className={`${css.row}`} ref={div=>this.wrapperDiv=div}>
      {this.props.children}
      <FontAwesomeIcon icon={['fas','minus-square']} onClick={this.props.onClickMinus}/>
    </div>;
  }
}

Item.propTypes = {
  children: PropTypes.array,
  onClickMinus: PropTypes.func
}

export default Item;
