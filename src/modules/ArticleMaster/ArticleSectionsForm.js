import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Button, Container } from 'react-bootstrap'
import Section from '../Section/Section'

const ArticleSectionsForm = ({ dummyObesrver, sections, deleteSectionHandler, changeSectionHeadHandler, changeSectionBodyHandler}) => {

    var content = ''
    if(sections){
        content = sections.map((section, index) =>{
            return(
                <Section 
                    dummyObesrver={dummyObesrver}
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
        <Droppable
            droppableId={'1'} 
        >
            {(provided, snapshot) => (
                <Container
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {content}
                    {provided.placeholder}
                </Container>
            )}
        </Droppable>
        
        
    )
}

export default ArticleSectionsForm
