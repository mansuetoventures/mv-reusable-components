import React, { Component, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import useCKEditor from '../hooks/useCKEditor.js';

import ViewPicker from '../ViewPicker/ViewPicker.js';
import AutoComplete from '../AutoCompletePicker/AutoComplete/AutoComplete.js';
import FeatureImagePicker from '../FeatureImage/FeatureImagePicker.js';
import usePrevious from '../usePrevious/usePrevious.js';
import useEditable from '../useEditable/useEditable.js';

function ArticleBody(props){
    const IncCKEditorFeatures = useCKEditor();
    const divEl = useRef(null);
    
    const editable = props.editable;

    useEditable(editable,divEl.current,IncCKEditorFeatures?{
      plugins: [
        'Clipboard',
        'Enter',
        'ShiftEnter',
        'Typing',
        'Undo',
        'Paragraph',
        'Bold',
        'Italic',
        'Heading',
        'HeadingButtonsUI',
        'ParagraphButtonUI',
        'InlineItems',
        'BlockQuote',
        'Link',
        'List',
        //'GetEditorOnButtonPress',
        //'IndentTextPlugin'
      ].map(n=>IncCKEditorFeatures[n]),
      toolbar: {
        items: [
          'heading2',
          'paragraph',
          'bold',
          'italic',
          'blockquote',
          'link',
          'numberedList',
          'bulletedList',
          'inlineitem'
          /*'hereIsAnIconName',*/ /*...['buyerzonewidget','comparisongrid','inlineimage','inlinevideo','product','relatedarticle','youtube']*/
          /*'indentLeft',
          'indentRight',*/
        ],
        //viewportTopOffset: this.state.distractionFreeMode ? 60 : 155
      },
      heading: {
        options: [
          {
            model: 'paragraph',
            title: 'Paragraph',
            class: 'ck-heading_paragraph'
          },
          {
            model: 'heading2',
            view: 'h2',
            title: 'Heading 2',
            class: 'ck-heading_heading2'
          }
        ]
      },
      indentText: {
        options: {
            indentLength: 40,
            indentMeasure: 'px',
        },
      },
      inlineItem: {
        onButtonPress:editor => {
        this.setState({
          dialogMessage: (
            <ViewPicker
              views={{
                'Buyer Zone': <div>
                <h2>Please Select a BuyerZone Widget</h2>
                <AutoComplete
                  data='https://www.inc.com/rest/buyerzonewidget'
                  nameField='bzw_name'
                  onChoose={this.insertInline.bind(this,
                    'buyerzonewidget',
                    'bzw_name',
                    editor,
                    'BuyerZone Widget')}
                />
              </div>,
                'Comparison Grid': <div>
                <h2>Please Select a Comparison Grid Widget</h2>
                <AutoComplete
                  data='https://www.inc.com/rest/comparisongridwidget'
                  nameField='grd_title'
                  onChoose={this.insertInline.bind(this,
                    'comparisongrid',
                    'grd_title',
                    editor,
                    'Comparison Grid Widget')}
                />
              </div>,
                Image: (
                  <div style={{color:'red'}}>
                  <FeatureImagePicker
                    onClickImage={(img, imageIndex) =>
                      this.insertInline(
                        'inlineimage',
                        'id',
                        editor,
                        'Inline Image',
                        [{ id: 'thisistheid' }]
                      )
                    }
                  />
                  </div>
                ),
                Video: <div>V</div>,
                Product: <div>
                <h2>Please Select a Product</h2>
                <AutoComplete
                  data='https://www.inc.com/rest/productwidget'
                  nameField='prd_product'
                  onChoose={this.insertInline.bind(this,'product','prd_product',editor,'Product Widget')}
                />
              </div>,
              'Related Article': <div>
                  <h2>Please Select a Related Article</h2>
                  <AutoComplete
                    data='https://www.inc.com/rest/relatedarticlewidget'
                    nameField='inc_headline'
                    onChoose={this.insertInline.bind(this,'relatedarticle','inc_headline',editor,'Related Article')}
                  />
                </div>,
                YouTube: <div>YT</div>
              }}
            />
          )
        });
      }}
    }:undefined,()=>{},()=>{},props.onChange);


   
    return <div ref={divEl}>{props.children}</div>
}
ArticleBody.defaultProps={
 
}

ArticleBody.propTypes = {
  
};


export default ArticleBody;
