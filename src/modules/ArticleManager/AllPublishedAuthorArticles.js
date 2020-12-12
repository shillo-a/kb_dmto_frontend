import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

import userArticleService from '../../services/apis/user-article-service'
import ArticleExcerpt from '../Article/ArticleExcerpt'

const AllPublishedAuthorArticles = () => {
    
    const [authorArticles, setAuthorArticles] = useState('')

    // GAAA - get all author articles
    const [statusGAAA, seStatusGAAA] = useState('idle')
    const getAllAuthorArticles = () => {
        seStatusGAAA('loading')
        userArticleService.getAllAuthorArticles()
            .then(response => {
                setAuthorArticles(response.data)
                seStatusGAAA('succedded')
            })
            .catch(error => {
                console.log(error)
                seStatusGAAA('failed')
            })
    }

    useEffect(()=>{
        getAllAuthorArticles()
    }, [])

    var content = ''
    if(statusGAAA === 'loading'){
        content = <Spinner animation="border" variant="primary" />
    } else if(statusGAAA === 'succedded' && authorArticles){
        content = authorArticles.map(authorArticle => {
            // Оставляем опубликованные статьи
            if(authorArticle.article.statusArticle.id === 'published'){
                return(<ArticleExcerpt key={authorArticle.id} article={authorArticle.article}/>)
            }
        })
    } else if(statusGAAA === 'succedded' && !authorArticles){
        content = <div>Опубликованные статьи отсутствуют</div>
    }

    return (
        <React.Fragment>
            <h5 className="mt-3">Опубликованные статьи</h5>
            {content}
        </React.Fragment>
    )
}

export default AllPublishedAuthorArticles
