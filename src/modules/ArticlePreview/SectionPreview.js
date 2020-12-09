import React from 'react'

import DraftEditorView from '../Section/DraftEditorView'
const SectionPreview = ({ section }) => {
    return (
        <React.Fragment>
            <h5 className="mt-5">{section.head}</h5>
            <hr></hr>
            
            <DraftEditorView sectionBody={section.body}/>
        </React.Fragment>
        
    )
}

export default SectionPreview
