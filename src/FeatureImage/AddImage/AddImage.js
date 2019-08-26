import React, {Component} from 'react';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFile from '@fortawesome/fontawesome-free-solid/faFileImage';
fontawesome.library.add(faFile);
import css from './AddImage.scss';
import PropTypes from 'prop-types';

class AddImage extends React.Component{
  render(){
    return (
      <div className={css.wrapper} onClick={this.props.onClick}>
        <div className={css.icon}>
          <FontAwesomeIcon icon={['fas', 'file-image']}/>
        </div>
        <div className={css.text}>{this.props.text} <br /> Image</div>
      </div>
    );
  }
}

AddImage.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.text
}

export default AddImage;
