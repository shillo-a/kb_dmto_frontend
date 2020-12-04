import React from 'react'
import { Button } from 'react-bootstrap'
import Section from '../../Section/components/Section'

const ArticleSectionsForm = ({ sections, addSectionHandler, deleteSectionHandler, changeSectionHeadHandler, changeSectionBodyHandler}) => {

    var content = ''
    if(sections){
        content = sections.map((section, index) =>{
            return(
                <Section 
                    key={index} 
                    index={index} 
                    section={section} 
                    deleteSectionHandler={deleteSectionHandler}
                    changeSectionHeadHandler={changeSectionHeadHandler}
                    changeSectionBodyHandler={changeSectionBodyHandler}
                ></Section>
            )
        })
    } else {return null}

    return (
        <React.Fragment>
            {content}
            <Button onClick={addSectionHandler}>Добавить раздел</Button>
        </React.Fragment>
        
    )
}

export default ArticleSectionsForm
