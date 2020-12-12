import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const ArticleExcerpt = ({ article }) => {

    const history = useHistory()
    
    const clickTransitionHandler = (event) => {
        history.push(`/article/${article.id}`)
        
    }

    return (
        <Card className="mb-2">
            <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Button variant="primary" onClick={clickTransitionHandler}>Перейти</Button>
            </Card.Body>
        </Card>
    )
}

export default ArticleExcerpt;