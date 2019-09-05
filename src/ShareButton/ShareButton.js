import React, { Component,useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import isUndefined from 'lodash/isUndefined';
import { faLinkedin,faLinkedinIn,faFacebook,faFacebookF,faTwitter,faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

import styled from 'styled-components';

const ShareButtonWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 90px;
  margin-left: 20px;
  font-size: 15px;
  vertical-align: -2px;
  //Also
  font-size: 20px;
  width: auto;
  margin-left: initial;
  margin-right: 20px;
`;

const shareButtonStyle = {
    display: 'inline-flex',
    justifyContent: 'space-between',
    width: '90px',
    marginLeft: '20px',
    fontSize: '15px',
    verticalAlign: '-2px',
    //Also
    fontSize: '20px',
	width: 'auto',
	marginLeft: 'initial',
	marginRight: '20px'
}



const ShareButton = props=> {



    const handleShareButtonClick=function() {
        // Handle opening via `window.open` here
      }

      let icon, url;
      if (props.type === 'LinkedIn') {
          //icon = ['fab', props.style == 'default' ? 'linkedin-in' : 'linkedin'];
          icon = props.style == 'default'? faLinkedinIn : faLinkedin;
          url = `http://www.linkedin.com/shareArticle?mini=true&url=https://www.inc.com/${props.url}&title=${props.headline}&summary=${props.summary}&source=Inc.com`;
      }
      else if (props.type === 'Facebook') {
          //icon = ['fab', this.state.style == 'default' ? 'facebook-f' : 'facebook'];
          icon = props.style == 'default'? faFacebookF : faFacebook;
          url = `https://www.facebook.com/sharer/sharer.php?u=https://www.inc.com/${encodeURI(props.url)}`;
      }
      else if (props.type === 'Twitter') {
          //icon = ['fab', this.state.style == 'default' ? 'twitter' : 'twitter-square'];
          icon = props.style == 'default'? faTwitter : faTwitterSquare;
          url = `https://twitter.com/intent/tweet?url=https://www.inc.com/${props.url}&text=${props.headline || 'Share on Twitter!'}&via=Inc`;
      }
      else if (props.type === 'Email'){
          icon = faEnvelope;
          url = `mailto:nowhere@mozilla.org`;
      }

          
    return (
        <ShareButtonWrapper style={props.styleAttr} onClick={handleShareButtonClick}>
          <a style={{color:'#000'}} target="_blank" rel="noopener noreferrer noskim" className={`${props.faClasses} ShareButtonAnchor`} href={url}>
            <FontAwesomeIcon icon={icon} />
          </a>
        </ShareButtonWrapper>
      );
}

ShareButton.propTypes = {
    type: PropTypes.string,
    style: PropTypes.string,
    styleAttr: PropTypes.object,
    url: PropTypes.string,
    headline: PropTypes.string,
    summary: PropTypes.string,
    faClasses: PropTypes.string
  };
   export default ShareButton;


