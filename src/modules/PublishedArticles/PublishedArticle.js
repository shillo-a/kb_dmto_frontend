import React, { useEffect, useState } from 'react'
import { Col, Jumbotron, Row, Container, OverlayTrigger, Button, Tooltip } from 'react-bootstrap';


import ArticleService from '../../services/apis/article-service'
import TransformService from '../../services/transforms/article-transform'

import FavoriteSign from './FavoriteSign';
import Contents from '../Section/Contents'
import ArticleSections from '../ArticleSections/ArticleSections'
import EditArticleButton from './EditArticleButton';
import { CheckCircleFill } from 'react-bootstrap-icons';

const PublishedArticle = ({ match, location, currentUser }) => {

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
        {publishedArticle && publishedArticle.status.id ==='published' ?
        <>
            <Jumbotron>
            <Row>
                <Col md={10}>
                    <h3>{publishedArticle.title}</h3>
                </Col>
                <Col md={2} className="d-flex">
                    <EditArticleButton articleId={articleId}/>
                    {currentUser.id === publishedArticle.user.id?
                        <>
                        <OverlayTrigger placement="top" delay={{ show: 100, hide: 100 }} overlay={<Tooltip id="button-tooltip">Это ваша статья</Tooltip>}>
                            <Button variant="link">
                                <CheckCircleFill size={30}/>
                            </Button>
                        </OverlayTrigger>
                        </>
                        :
                        <FavoriteSign articleId={articleId}/>
                    }
                    
                </Col>
            </Row>
            </Jumbotron>
            <Container>
                <Contents sections={publishedArticle.sections}/>
                <ArticleSections sections={publishedArticle.sections}/>
            </Container>
        </>
        : 
        <></>}
        </React.Fragment>
        
    )
}

export default PublishedArticle;