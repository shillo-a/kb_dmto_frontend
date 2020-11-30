import React from 'react'
import { Button, Card, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

const Category = ({ category }) => {

    const history = useHistory()

    const clickTransitionHandler = (event) => {
        history.push(`category/${category.id}`)
    }

    return (
        <Col>
            <Card className="text-center" style={{ width: '20rem', height: '18rem' }}>
                <Card.Body>
                    <Card.Title>{category.category}</Card.Title>
                    <Card.Text>{category.description}</Card.Text>
                    <Card.Img variant="top" style={{height: 'auto', width:'5rem'}} src={`data:image/png;base64,${category.image}`}/>
                    <Button variant="primary" onClick={clickTransitionHandler}>Перейти</Button>
                </Card.Body>
                
            </Card>
        </Col>
    )
}

export default Category;