import React, { Component,useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import isUndefined from 'lodash/isUndefined';
import { faLinkedin,faLinkedinIn,faFacebook,faFacebookF,faFacebookSquare,faTwitter,faTwitterSquare } from '@fortawesome/free-brands-svg-icons';
import {faEnvelope as faEnvelopeDefault} from '@fortawesome/free-regular-svg-icons';
import {faEnvelope as faEnvelopeSolid } from '@fortawesome/fontawesome-free-solid';

import styled from 'styled-components';

const ShareButtonWrapper = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 90px;
  margin-left: 20px;
  vertical-align: -2px;
  //Also
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
          //url = `http://www.linkedin.com/shareArticle?mini=true&url=https://www.inc.com/${props.url}&title=${props.headline}&summary=${props.summary}&source=Inc.com`;
          url=`http://www.linkedin.com/shareArticle?mini=true&url=${props.url}&title=${props.headline}&summary=${props.summary}&source=${props.source}`;
      }
      else if (props.type === 'Facebook') {
          //icon = ['fab', this.state.style == 'default' ? 'facebook-f' : 'facebook'];
          icon = props.style == 'default'? faFacebookF : faFacebookSquare;
          //url = `https://www.facebook.com/sharer/sharer.php?u=https://www.inc.com/${encodeURI(props.url)}`;
          url = `https://www.facebook.com/sharer/sharer.php?u=${props.url}`;
      }
      else if (props.type === 'Twitter') {
          //icon = ['fab', this.state.style == 'default' ? 'twitter' : 'twitter-square'];
          icon = props.style == 'default'? faTwitter : faTwitterSquare;
          //url = `https://twitter.com/intent/tweet?url=https://www.inc.com/${props.url}&text=${props.headline || 'Share on Twitter!'}&via=Inc`;
          url = `https://twitter.com/intent/tweet?url=${props.url}&text=${props.headline || 'Share on Twitter!'}&via=${props.via}`;

      }
      else if (props.type === 'Email'){
          icon = props.style == 'default'? faEnvelopeDefault : faEnvelopeSolid;
          url = `mailto:nowhere@mozilla.org`;
      }

          
    return (
        <ShareButtonWrapper onClick={handleShareButtonClick}>
          <a style={{color:'#000'}} target="_blank" rel="noopener noreferrer noskim" className={`${props.faClasses} ShareButtonAnchor`} href={url}>
            <FontAwesomeIcon icon={icon} />
          </a>
        </ShareButtonWrapper>
      );
}

ShareButton.propTypes = {
    type: PropTypes.string.isRequired,
    style: PropTypes.string,
    headline: PropTypes.string,
    summary: PropTypes.string,
    faClasses: PropTypes.string
  };

const types = ['LinkedIn','Facebook','Twitter','Email'];
const styles = ['default','square'];

export {types as types, styles as styles}

export default ShareButton;


