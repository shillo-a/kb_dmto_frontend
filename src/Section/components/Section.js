import React, { useEffect, useState } from 'react'
import DraftEditor from './DraftEditor'
import { Button, Card, Col, Container, Form } from 'react-bootstrap'
import DeleteSectionButton from './DeleteSectionButton'

const Section = ({ section, index, deleteSectionHandler, changeSectionHeadHandler, changeSectionBodyHandler }) => {

    return (
        <Card className="shadow p-3 mb-3 mt-3 rounded">
            <Container>
                <Form>
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
                        <DraftEditor sectionBody={section.body} index={index} changeSectionBodyHandler={changeSectionBodyHandler}/>
                    </Form.Group>  
                    </Form.Row>
                </Form>
                <DeleteSectionButton 
                    deleteSectionHandler={deleteSectionHandler} 
                    index={index}
                />
                
            </Container>
        </Card>
    )
}

export default Section