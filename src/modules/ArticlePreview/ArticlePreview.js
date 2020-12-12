import React, { useEffect, useState } from 'react'
import { Container, Jumbotron } from 'react-bootstrap'

import categoryService from '../../services/apis/category-service'

import Contents from '../Article/Contents'
import ArticleSections from '../ArticleSections/ArticleSections'



const ArticlePreview = ({ categoryId, article }) => {

    const [category, setCategory] = useState('')

    // GC - get category
    const [statusGC, setStatusGC] = useState('idle')
    const getCategory = (categoryId) => {
        setStatusGC('loading')
        categoryService.getCategory(categoryId)
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
        getCategory(categoryId)
    }, [categoryId])

    return (
        <Container className="mt-3">
            <Jumbotron>
                <h3>{article.title}</h3>
                <span>{category.category}</span>
            </Jumbotron>
            <Container>
                <Contents sections={article.sections}/>
                <ArticleSections sections={article.sections}/>
            </Container>
        </Container>
    )
}

export default ArticlePreview
