import React, {Component} from 'react';
import PropTypes from 'prop-types'

import css from './AutoCompleteResults.scss';

const AutoCompleteResults = props => <ul className={css.results}>{props.children}</ul>;
AutoCompleteResults.propTypes = {
  children: PropTypes.node
};

export default AutoCompleteResults;
