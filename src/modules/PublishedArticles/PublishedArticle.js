import React, { useEffect, useState } from 'react'
import { Col, Jumbotron, Row, Container } from 'react-bootstrap';


import ArticleService from '../../services/apis/article-service'
import TransformService from '../../services/transforms/article-transform'

import FavoriteSign from './FavoriteSign';
import Contents from '../Section/Contents'
import ArticleSections from '../ArticleSections/ArticleSections'
import EditArticleButton from './EditArticleButton';

const PublishedArticle = ({ match, location }) => {

    const { articleId } = match.params
    const [publishedArticle, setPublishedArticle] = useState('')
    const [status, setStatus] = useState('idle')

    const getPublishedArticle = (articleId) => {
        setStatus('loading')
        ArticleService.getArticle(articleId)
            .then(response => {
                console.log(response.data)
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
                    <EditArticleButton articleId={articleId}/>
                    <FavoriteSign articleId={articleId}/>
                </Col>
            </Row>
            </Jumbotron>
            <Container>
                <Contents sections={publishedArticle.sections}/>
                <ArticleSections sections={publishedArticle.sections}/>
            </Container>
        </React.Fragment>
    )
}

export default PublishedArticle;