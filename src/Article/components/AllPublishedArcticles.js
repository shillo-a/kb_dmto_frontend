import React, { useEffect, useState } from 'react'
import { Container, Jumbotron, Spinner } from 'react-bootstrap'
import ArticleService from '../services/ArticleService'
import PublishedArcticleExcerpt from './PublishedArcticleExcerpt'

const AllPublishedArcticles = ({ match }) => {

    const { categoryId } = match.params
    const [publishedArticles, setPublishedArticles] = useState('')
    const [status, setStatus] = useState('idle')

    const getAllPublishedArtilces = (categoryId) => {
        setStatus('loading')
        ArticleService.getAllPublishedArticles(categoryId)
            .then(response => {
                setPublishedArticles(response.data)
                setStatus('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatus('failed')
            })
    }

    useEffect(()=>{
        getAllPublishedArtilces(categoryId)
    }, [categoryId])

    var content = ''
    if(status === 'loading'){
        content = <Spinner animation="border" variant="primary" />
    } else if(status === 'succedded' && publishedArticles){
        content = publishedArticles.map(publishedArticle => {
            return(
                <PublishedArcticleExcerpt key={publishedArticle.id} publishedArticle={publishedArticle}/>
            )
        })
    } else if(status === 'succedded' && !publishedArticles){
        content = <div>Нет подходящих статей</div>
    }

    return (
        <React.Fragment>
            <Jumbotron>
                <Container>
                    <h3>Категория: {categoryId}</h3>
                </Container>
            </Jumbotron>
            {content}
        </React.Fragment>
    
    )
}

export default AllPublishedArcticles;