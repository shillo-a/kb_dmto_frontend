import React, { useEffect, useState } from 'react'
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './styles/DraftEditorComment.css'

const DraftEditorComment = ({ dummyObesrver, commentBody,  changeCommentBodyHandler}) => {

    const [editorState, setEditorState] = useState(() => {
        if(commentBody){
            return EditorState.createWithContent(convertFromRaw(JSON.parse(commentBody)))
        } else {
            return EditorState.createEmpty()
        } 
        })
    
    //Каждый раз при перемещении секции, ререндерим ее
    useEffect(()=>{
        if(commentBody){
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(commentBody))))
        } else {
            setEditorState(EditorState.createEmpty())
        } 
    }, [
        // dummyObesrver
    ])
        
    const editorStateChangeHandler = (editorState) => {
        setEditorState(editorState)
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
            // readOnly
            // toolbarHidden
            editorState={editorState}
            onEditorStateChange={editorStateChangeHandler}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"

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

export default DraftEditorComment