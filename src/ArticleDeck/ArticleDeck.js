import React, { Component,useRef,useEffect } from 'react';
import PropTypes from 'prop-types';
import useCKEditor from '../hooks/useCKEditor.js';

function ArticleDeck(props){
    const IncCKEditorFeatures = useCKEditor('deck');
    const h2El = useRef(null);
    useEffect(()=>{
        if (typeof IncCKEditorFeatures == 'object') {
            const TitleDeckConfig = {
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
              };
          
              /*
              const DeckConfig = {
                ...TitleDeckConfig,
                plugins:[...TitleDeckConfig.plugins,'Italic'],
                toolbar:['italic']
              }*/


            const InlineEditor = IncCKEditorFeatures.InlineEditor;
            InlineEditor.create(
                h2El.current,
                TitleDeckConfig
              ).then(editor => {
                /*
                this.editor = editor;
                this.setState({editMode:true})
                editors.push(editor);
        
                editor.model.document.on('change:data', () => {
                  let data = editor.getData();
                  this.props.onChange(data);
                });
        
                resolve();*/
              }).catch( error => {
                // eslint-disable-next-line no-console
                console.error( error );
              } );
        }
    })
    return <h2 ref={h2El}>{props.children}</h2>
}
ArticleDeck.defaultProps={
 
}

ArticleDeck.propTypes = {
  
};


export default ArticleDeck;
