import React from 'react'

const Contents = ({ sections }) => {

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

export default Contents
