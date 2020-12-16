import React from 'react'

import DraftEditorPreview from '../DraftEditor/DraftEditorPreview'
const SectionPreview = ({ section }) => {
    return (
        <React.Fragment>
            <h5 id={section.head} className="mt-5">
                {section.head}
            </h5>
            <hr></hr>
            
            <DraftEditorPreview sectionBody={section.body}/>
        </React.Fragment>
        
    )
}

export default SectionPreview
