import React, { useEffect, useState } from 'react'
import ArticleService from '../services/ArticleService'
import FavoriteSign from './FavoriteSign';
const PublishedArticle = ({ match }) => {

    const { articleId } = match.params
    const [publishedArticle, setPublishedArticle] = useState('')
    const [status, setStatus] = useState('idle')

    const getPublishedArticle = (articleId) => {
        setStatus('loading')
        ArticleService.getPublishedArticle(articleId)
            .then(response => {
                setPublishedArticle(response.data)
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
        <div>
            <FavoriteSign articleId={articleId}/>
            
            {console.log(publishedArticle)}
        </div>
    )
}

export default PublishedArticle;