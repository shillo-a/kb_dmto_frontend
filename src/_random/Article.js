import React, { useEffect, useState } from 'react'
import Section from '../Section/components/Section';
import ArticleService from '../../apis/ArticleService';

const Article = ({ match }) => {

    const { articleId } = match.params

    const [article, setArticle] = useState('')

    const getArticle = (articleId) => {
        ArticleService.getArticle(articleId)
            .then(response => {
                setArticle(response.data)
                
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(()=>{
        getArticle(articleId)
    }, [articleId])

    return (
        <div>
            <h1>{console.log(article)}</h1>
            <Section sectionId='4'></Section>

        </div>
    )
}

export default Article