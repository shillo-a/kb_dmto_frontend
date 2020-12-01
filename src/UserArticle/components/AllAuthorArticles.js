import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import UserArticleService from '../services/UserArticleService'
import AuthorArticleExcerpt from './AuthorArticleExcerpt'

const AllAuthorArticles = () => {

    const [authorArticles, setAuthorArticles] = useState('')

    // GAAA - get all author articles
    const [statusGAAA, seStatusGAAA] = useState('idle')
    const getAllAuthotArticles = () => {
        seStatusGAAA('loading')
        UserArticleService.getAllAuthorArticles()
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
        getAllAuthotArticles()
    }, [])

    var content = ''
    if(statusGAAA === 'loading'){
        content = <Spinner animation="border" variant="primary" />
    } else if(statusGAAA === 'succedded' && authorArticles){
        content = authorArticles.map(authorArticle => {
            return(
                <AuthorArticleExcerpt key={authorArticle.id} authorArticle={authorArticle}/>
            )
        })
    } else if(statusGAAA === 'succedded' && !authorArticles){
        content = <div>Созданные статьи отсутствуют</div>
    }

    return (
        <React.Fragment>
            {content}
        </React.Fragment>
    )

}

export default AllAuthorArticles
