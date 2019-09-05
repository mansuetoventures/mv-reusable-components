import { useEffect, useRef } from "react";
import usePrevious from '../usePrevious/usePrevious.js';

export default (editable,element,config,onCreate=()=>{},onCreateError=()=>{},onChange=()=>{},onDestroy=()=>{},onDestroyError=()=>{})=>{
    const prevEditable = usePrevious(editable);
    const editorRef = useRef();

    useEffect(()=>{
        if (prevEditable == true && editable == false){
            editorRef.current.destroy().then(onDestroy).catch(onDestroyError)
        }
        else if (prevEditable == false && editable == true){
            if (typeof IncCKEditorFeatures == 'object') { //is this check needed or no?
                const InlineEditor = IncCKEditorFeatures.InlineEditor;
                
                InlineEditor.create(element,config).then(editor => {
                    onCreate();
                    editorRef.current = editor;
                    
            
                    editor.model.document.on('change:data', () => {
                      let data = editor.getData();
                      onChange(data);
                    });
            
                  }).catch( error => {
                    // eslint-disable-next-line no-console
                    console.error( error );
                  } );
            }
        }
    })
}