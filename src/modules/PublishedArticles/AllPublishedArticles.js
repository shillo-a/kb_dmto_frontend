import React, { useEffect, useState } from 'react'
import { Container, Jumbotron, Spinner } from 'react-bootstrap'

import CategoryService from '../../services/apis/category-service'
import ArticleService from '../../services/apis/article-service'
import ArticleExcerpt from '../Article/ArticleExcerpt'

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
                <ArticleExcerpt key={publishedArticle.id} article={publishedArticle}/>
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