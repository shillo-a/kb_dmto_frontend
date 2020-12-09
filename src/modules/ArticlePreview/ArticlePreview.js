import React from 'react'
import { Button, Col, Container, Jumbotron, Row } from 'react-bootstrap'

import ArticleSectionsPreview from './ArticleSectionsPreview'
import ContentPreview from './ContentPreview'


const ArticlePreview = ({ article }) => {
    return (
        <Container className="mt-3">
            <Jumbotron>
                <h3>{article.title}</h3>
                <span>{article.categoryId}</span>
            </Jumbotron>
            <Container>
                <ContentPreview sections={article.sections}/>
                <ArticleSectionsPreview sections={article.sections}/>
            </Container>
        </Container>
    )
}

export default ArticlePreview
