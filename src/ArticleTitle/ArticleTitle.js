import React, { Component, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useCKEditor from '../hooks/useCKEditor.js';


function ArticleTitle(props){
    const IncCKEditorFeatures = useCKEditor('title');
    const h1El = useRef(null);

    useEffect(()=>{
        if (typeof IncCKEditorFeatures == 'object') {
            const TitleDeckConfig = {
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
              };
          
              /*
              const DeckConfig = {
                ...TitleDeckConfig,
                plugins:[...TitleDeckConfig.plugins,'Italic'],
                toolbar:['italic']
              }*/


            const InlineEditor = IncCKEditorFeatures.InlineEditor;

            InlineEditor.create(
                h1El.current,
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
    return <h1 ref={h1El}>{props.children}</h1>
}
ArticleTitle.defaultProps={
 
}

ArticleTitle.propTypes = {
  
};


export default ArticleTitle;
