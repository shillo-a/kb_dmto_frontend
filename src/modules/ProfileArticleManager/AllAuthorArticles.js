import React, { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'

import UserArticleService from '../../services/apis/user-article-service'
import AuthorArticleExcerpt from './AuthorArticleExcerpt'

const AllAuthorArticles = () => {

    const [authorArticles, setAuthorArticles] = useState('')

    // GAAA - get all author articles
    const [statusGAAA, seStatusGAAA] = useState('idle')
    const getAllAuthorArticles = () => {
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
        getAllAuthorArticles()
    }, [])

    var content = ''
    var tableContent = ''
    if(statusGAAA === 'loading'){
        tableContent = <Spinner animation="border" variant="primary" />
    } else if(statusGAAA === 'succedded' && authorArticles){
        content = authorArticles.map(authorArticle => {
            // Исключаем опубликованные статьи
            if(authorArticle.article.statusArticle.id !== 'published' && 
            authorArticle.article.statusArticle.id !== 'archive'){
            return(<AuthorArticleExcerpt key={authorArticle.id} authorArticle={authorArticle}/>)
            }
        })
        tableContent = (
            <Table bordered>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Тип статьи</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </Table>
        )
    } else if(statusGAAA === 'succedded' && !authorArticles){
        tableContent = <div>Проекты статей отсутствуют</div>
    }

    return (
        <React.Fragment>
            <h5 className="mt-3">Проекты статей</h5>
            {tableContent}
        </React.Fragment>
    )

}

export default AllAuthorArticles
