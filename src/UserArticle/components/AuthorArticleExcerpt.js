import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const AuthorArticleExcerpt = ({ authorArticle }) => {

    const history = useHistory()
    
    const clickTransitionHandler = (event) => {
        history.push(`/article/${authorArticle.article.id}`)
        
    }

    return (
        <Card >
            <Card.Body>
                <Card.Title>{authorArticle.article.title}</Card.Title>
                <Button variant="primary" onClick={clickTransitionHandler}>Перейти</Button>
            </Card.Body>
        </Card>
    )
}

export default AuthorArticleExcerpt
