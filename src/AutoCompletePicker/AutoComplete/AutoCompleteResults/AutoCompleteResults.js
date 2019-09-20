import React, {Component} from 'react';
import PropTypes from 'prop-types'

import css from './AutoCompleteResults.scss';
const AutoCompleteResults = props => <ul style={css.ul_results}>{props.children}</ul>;
AutoCompleteResults.propTypes = {
  children: PropTypes.node
};

export default AutoCompleteResults;
