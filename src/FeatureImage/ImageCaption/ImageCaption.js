import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageCaption.scss';
import isUndefined from 'lodash/isUndefined';

class ImageCaption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowing: true
    };

    this.displayCaption = this.displayCaption.bind(this);
    this.hideCaption = this.hideCaption.bind(this);
  }

  componentDidMount() {
    this.timeout = setTimeout(function(){
      this.hideCaption();
    }.bind(this), 5000);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  displayCaption() {
    this.setState({
      isShowing: true
    });
  }

  hideCaption() {
    this.setState({
      isShowing: false
    });
  }

  render() {
    if(isUndefined(this.props.children)) return null;

    return (
      <div className={css.captionContainer} onClick={this.props.onClick}>
        <div className={`${css.captionText} ${this.state.isShowing ? css.captionShowing : ''}`}>
          {!isUndefined(this.props.children) &&
            <div dangerouslySetInnerHTML={{ __html: this.props.children }} ></div>
          }
        </div>
        <div
          className={`${css.sideButton }`}
          onMouseOver={this.displayCaption}
          onMouseLeave={this.hideCaption}
        >
          <img className={css.captionIcon} src="https://www.incimages.com/web-icons/caption-icon.png" />
        </div>
      </div>
    );
  }
}

ImageCaption.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default ImageCaption;
