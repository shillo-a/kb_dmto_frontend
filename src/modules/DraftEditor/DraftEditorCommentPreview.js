import React, { useEffect, useState } from 'react'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './styles/DraftEditorPreview.css'

const DraftEditorCommentPreview = ({ comment }) => {

    const [editorState, setEditorState] = useState(() => {
        if(comment){
            return EditorState.createWithContent(convertFromRaw(JSON.parse(comment)))
        } else {
            return EditorState.createEmpty()
        } 
        })
    
    const editorStateChangeHandler = (editorState) => {
        // setEditorState(editorState)
        // changeSectionBodyHandler(
        //     JSON.stringify(convertToRaw(editorState.getCurrentContent())), index
        // )
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
            readOnly
            toolbarHidden
            editorState={editorState}
            onEditorStateChange={editorStateChangeHandler}
                wrapperClassName="wrapper-view-class"
                editorClassName="editor-view-class"
                toolbarClassName="toolbar-view-class"

                toolbar={{
                    options: ['inline', 'colorPicker', 'link', 'emoji'],
                    image: {
                        
                        uploadCallback: imageUploadCallback,
                        previewImage: true,
                        defaultSize: {
                            height: 'auto',
                            width: 150,
                        },
                    },
            }}
        />
  )
}

export default DraftEditorCommentPreview