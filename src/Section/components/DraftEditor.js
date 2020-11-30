import React, { useState } from 'react'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '../styles/DraftEditor.css'

const DraftEditor = (props) => {

    const [editorState, setEditorState] = useState(() => {
            return EditorState.createEmpty()
        })
        
    const editorStateChangeHandler = (editorState) => {
        setEditorState(editorState)
        props.onCreateBody(

            JSON.stringify(convertToRaw(editorState.getCurrentContent()))
            
        )
    }
    
    const getFileBase64 = (file, callback) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = error => {};
    };

    const imageUploadCallback = file => new Promise(
        (resolve, reject) => getFileBase64(
            file,
            data => resolve({ data: { link: data } })
            ));

    return (
        <Editor 
            editorState={editorState}
            onEditorStateChange={editorStateChangeHandler}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"

                toolbar={{
                    image: {
                        uploadCallback: imageUploadCallback,
                        previewImage: true,
                    },
            }}
        />
  )
}

export default DraftEditor