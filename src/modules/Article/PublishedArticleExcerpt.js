import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const PublishedArticleExcerpt = ({ publishedArticle }) => {

    const history = useHistory()
    
    const clickTransitionHandler = (event) => {
        history.push(`/article/${publishedArticle.id}`)
        
    }

    return (
        <Card >
            <Card.Body>
                <Card.Title>{publishedArticle.title}</Card.Title>
                <Button variant="primary" onClick={clickTransitionHandler}>Перейти</Button>
            </Card.Body>
        </Card>
    )
}

export default PublishedArticleExcerpt;