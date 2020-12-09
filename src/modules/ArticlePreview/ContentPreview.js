import React from 'react'

const ContentPreview = ({ sections }) => {

    var content = ''
    if(sections){
        content = sections.map((section, index) => {
            return (
                <li key={index}> {section.head}</li>
            )
        })
    }
    return (
        <React.Fragment>
            <h5>Оглавление</h5>
            <ol>
                {content}
            </ol>
        </React.Fragment>
        
    )
}
export default ContentPreview
