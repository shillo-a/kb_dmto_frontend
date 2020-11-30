import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import React, { useEffect, useState } from 'react'
import SectionService from '../services/SectionService'

const Section = (props) => {

    const [section, setSection] = useState('')

    const getSection = (sectionId) => {
        SectionService.getSection(sectionId)
            .then(response => {
                setSection(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }


    // const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(section.body)))
    // const markupBody = draftToHtml(convertToRaw(JSON.parse(section.body)))
    // // console.log(editorState)
    // const createMarkup = (markup) => {
    //     return {
    //         __html: markup
    //     }
    // }


    useEffect(()=>{
        getSection(props.sectionId)
    }, [])



    var contnent = {__html: 'empty'}
    if(section.body){
        const editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(section.body)))
        const markupBody = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        const createMarkup = (markup) => {
                return {
                    __html: markup
                }
            }
        contnent = createMarkup(markupBody)
    }
    

    return (
        <div 
        dangerouslySetInnerHTML={contnent}
        >
        </div>
    )
}

export default Section