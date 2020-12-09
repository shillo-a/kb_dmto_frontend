import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const ObserverArticleExcerpt = ({ observerArticle }) => {

    const history = useHistory()
    
    const clickTransitionHandler = (event) => {
        history.push(`/article/${observerArticle.article.id}`)
        
    }


    return (
        <Card >
            <Card.Body>
                <Card.Title>{observerArticle.article.title}</Card.Title>
                <Button variant="primary" onClick={clickTransitionHandler}>Перейти</Button>
            </Card.Body>
        </Card>
    )
}

export default ObserverArticleExcerpt;