import React, { Component,useRef,useEffect } from 'react';
import PropTypes from 'prop-types';
import useCKEditor from '../hooks/useCKEditor.js';
import useEditable from '../useEditable/useEditable.js';

function ArticleDeck(props){
    const IncCKEditorFeatures = useCKEditor('deck');
    const h2El = useRef(null);
    const editable = props.editable;

    useEditable(editable,h2El.current,{
      plugins: [
        //Essentials, // enables clipboard, Enter, ShiftEnter, typing and undo support.
        'Clipboard',
        'Typing',
        'Undo',
        'Paragraph',
        'Italic'
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
      toolbar:['italic']
    });

    return <h2 ref={h2El}>{props.children}</h2>
}
ArticleDeck.defaultProps={
 
}

ArticleDeck.propTypes = {
  
};


export default ArticleDeck;
