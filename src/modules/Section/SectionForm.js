import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Draggable } from 'react-beautiful-dnd'

import DraftEditor from '../DraftEditor/DraftEditor'
import DeleteSectionButton from './DeleteSectionButton'
import { ArrowsMove } from 'react-bootstrap-icons';

const SectionForm = ({ dummyObesrver, section, index, deleteSectionHandler, changeSectionHeadHandler, changeSectionBodyHandler }) => {

    return (
        
        <Draggable
           draggableId={String(index)}
           index={index} 
        >
            {(provided, snapshot)=>(
                <Card 
                    className="shadow p-3 mb-3 mt-3 rounded"
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Container>
                        <Form>
                            <Row>
                                <Col xs={11}>
                                    <Form.Row>
                                        <Col xs={11}>
                                            <Form.Group controlId="setionHead">
                                                <Form.Label>Название раздела:</Form.Label>
                                                <Form.Control type="text" placeholder="Укажите название раздела" value={section.head} onChange={(event) => {changeSectionHeadHandler(event, index)}}/>
                                            </Form.Group>
                                        </Col>
                                        <Col xs={1}>
                                            <Form.Group className='text-center' controlId="setionHead">
                                                <Form.Label>№ п.п.:</Form.Label>
                                                <Form.Control type="text" placeholder="Укажите название раздела" value={index} className='text-center' disabled/>
                                            </Form.Group>
                                        </Col>
                                    </Form.Row>
                                    <Form.Row>
                                        <Form.Group controlId="setionBody">
                                            <Form.Label>Содержание раздела:</Form.Label>
                                            <DraftEditor dummyObesrver={dummyObesrver} sectionBody={section.body} index={index} changeSectionBodyHandler={changeSectionBodyHandler}/>
                                        </Form.Group>  
                                    </Form.Row>
                                </Col>
                                <Col xs={1}>
                                    <Row {...provided.dragHandleProps} className="justify-content-md-center">
                                        <ArrowsMove size={25} color='grey' />
                                    </Row>
                                    <div style={{position: "absolute", bottom: "0"}}>
                                        <DeleteSectionButton 
                                            deleteSectionHandler={deleteSectionHandler} 
                                            index={index}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </Container>
                </Card>
            )}
        </Draggable>

    )
}

export default SectionForm