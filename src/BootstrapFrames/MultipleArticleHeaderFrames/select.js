import ReactDOM from 'react-dom';
import React, { Component, useState } from 'react';


export default props=><select id="lang" onChange={(e)=>{
    props.onSelect(e.target.value)
}} value={props.value}>
<option value="lead">Lead</option>
              <option value="portrait">Portrait</option>
              <option value="full">Full</option>
           </select>;
