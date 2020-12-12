import React, { useEffect, useState } from 'react'
import { Button, Col, Jumbotron, Row, Container } from 'react-bootstrap';
import { PencilSquare } from 'react-bootstrap-icons';

import ArticleService from '../../services/apis/article-service'
import TransformService from '../../services/transforms/article-transform'

import FavoriteSign from './FavoriteSign';
import Contents from '../Section/Contents'
import ArticleSections from '../ArticleSections/ArticleSections'

const PublishedArticle = ({ match }) => {

    const { articleId } = match.params
    const [publishedArticle, setPublishedArticle] = useState('')
    const [status, setStatus] = useState('idle')

    const getPublishedArticle = (articleId) => {
        setStatus('loading')
        ArticleService.getArticle(articleId)
            .then(response => {
                setPublishedArticle(
                    // НЕОБХОДИМО ТРАНСФОРМИРОВАТЬ ДАННЫЕ !!!
                    TransformService.convertFromRawArticle(response.data)
                )
                setStatus('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatus('failed')
            })
    }

    useEffect(()=>{
        getPublishedArticle(articleId)
    }, [articleId])

    return (
        <React.Fragment>
            <Jumbotron>
            <Row>
                <Col md={10}>
                    <h3>{publishedArticle.title}</h3>
                </Col>
                <Col md={2} className="d-flex">
                    <Button variant="link">
                        <PencilSquare size={30}/>
                    </Button>
                    <FavoriteSign articleId={articleId}/>
                </Col>
            </Row>
            <span>{console.log(publishedArticle)}</span>
            </Jumbotron>
            <Container>
                <Contents sections={publishedArticle.sections}/>
                <ArticleSections sections={publishedArticle.sections}/>
            </Container>
        </React.Fragment>
    )
}

export default PublishedArticle;