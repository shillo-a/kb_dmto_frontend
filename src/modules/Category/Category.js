import React from 'react'
import { Button, Card, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

import './styles/Category.css'

const Category = ({ category }) => {

    const history = useHistory()

    const clickTransitionHandler = (event) => {
        history.push(`category/${category.id}/${category.key}`)
    }

    return (
        <Col className="col-xs-1 col-md-4 d-flex align-items-stretch">
            <Card className="text-center category-card shadow rounded">
                <Card.Body className="category-body">
                    <Card.Title>{category.category}</Card.Title>
                    <Card.Text>{category.description}</Card.Text>
                </Card.Body>
                <footer>
                    <Card.Body className="category-img-card">
                        <Card.Img className="category-img" variant="bottom" src={`data:image/png;base64,${category.image}`}/>
                    </Card.Body>
                    <Card.Body className="category-btn-card">
                        <Button className="category-btn" variant="primary" onClick={clickTransitionHandler}>Перейти</Button>
                    </Card.Body> 
                </footer>      
            </Card>
        </Col>
    )
}

export default Category;