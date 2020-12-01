import React, { useEffect, useState } from 'react'
import { Container, Jumbotron, Spinner } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import CategoryService from '../../Category/services/CategoryService'
import ArticleService from '../services/ArticleService'
import PublishedArticleExcerpt from './PublishedArticleExcerpt'

const AllPublishedArticles = ({ match }) => {

    const { categoryId } = match.params

    const [category, setCategory] = useState('')
    const [publishedArticles, setPublishedArticles] = useState('')

    // GAPA - get all published articles
    const [statusGAPA, setStatusGAPA] = useState('idle')
    const getAllPublishedArtilces = (categoryId) => {
        setStatusGAPA('loading')
        ArticleService.getAllPublishedArticles(categoryId)
            .then(response => {
                setPublishedArticles(response.data)
                setStatusGAPA('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusGAPA('failed')
            })
    }

    // GC - get category
    const [statusGC, setStatusGC] = useState('idle')
    const getCategory = (categoryId) => {
        setStatusGC('loading')
        CategoryService.getCategory(categoryId)
            .then(response => {
                setCategory(response.data)
                setStatusGC('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusGC('failed')
            })
    }

    useEffect(()=>{
        getAllPublishedArtilces(categoryId)
        getCategory(categoryId)
    }, [categoryId])

    var content = ''
    if(statusGAPA === 'loading'){
        content = <Spinner animation="border" variant="primary" />
    } else if(statusGAPA === 'succedded' && publishedArticles){
        content = publishedArticles.map(publishedArticle => {
            return(
                <PublishedArticleExcerpt key={publishedArticle.id} publishedArticle={publishedArticle}/>
            )
        })
    } else if(statusGAPA === 'succedded' && !publishedArticles){
        content = <div>Нет подходящих статей</div>
    }

    return (
        <React.Fragment>
            <Jumbotron>
                <Container>
                    <h3>{category.category}</h3>
                </Container>
            </Jumbotron>
            {content}
        </React.Fragment>
    
    )
}

export default AllPublishedArticles;