import React, { useState } from 'react'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import '../styles/DraftEditor.css'

const DraftEditor = ({ sectionBody, index, changeSectionBodyHandler }) => {

    const [editorState, setEditorState] = useState(() => {
        if(sectionBody){
            return EditorState.createWithContent(convertFromRaw(JSON.parse(sectionBody)))
        } else {
            return EditorState.createEmpty()
        } 
        })
        
    const editorStateChangeHandler = (editorState) => {
        setEditorState(editorState)
        changeSectionBodyHandler(
            JSON.stringify(convertToRaw(editorState.getCurrentContent())), index
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
            // readOnly
            // toolbarHidden
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