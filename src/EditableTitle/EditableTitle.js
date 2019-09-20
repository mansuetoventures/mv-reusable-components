import React, { Component, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useCKEditor from '../hooks/useCKEditor.js';

import usePrevious from '../usePrevious/usePrevious.js';
import useEditable from '../useEditable/useEditable.js';

function EditableTitle(props){
    const IncCKEditorFeatures = useCKEditor('title');
    const h1El = useRef(null);
    const editable = props.editable;

    useEditable(editable,h1El.current,{
      plugins: [
        //Essentials, // enables clipboard, Enter, ShiftEnter, typing and undo support.
        'Clipboard',
        'Typing',
        'Undo',
        'Paragraph',
        //'Heading',
        //'HeadingButtonsUI',
        //'ParagraphButtonUI'
      ].map(n=>IncCKEditorFeatures[n]),
      /*
      toolbar: {
        items:[],
        viewportTopOffset:this.state.distractionFreeMode?60:155
      },*/
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph'
          },
          {
            model: 'heading1',
            view: 'h1',
            title: 'Heading 1',
            class: 'ck-heading_heading1'
          }
        ]
      },
      //removePlugins: ['Toolbar']
    },()=>{},()=>{},props.onChange);



    
    return <h1 className = {props.className} style = {props.style} ref={h1El}>{props.children}</h1>
}
EditableTitle.defaultProps={
  
}

EditableTitle.propTypes = {
  //style class onchange
};


export default EditableTitle;
