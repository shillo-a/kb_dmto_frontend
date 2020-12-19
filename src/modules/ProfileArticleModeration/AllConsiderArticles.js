import React, { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import ArticleService from '../../services/apis/article-service'
import ConsiderArticleExcerpt from './ConsiderArticleExcerpt'

const AllConsiderArticles = () => {

    const [considerArticles, setConsiderArticles] = useState('')

    // GACA - get all consider articles
    const [statusGACA, setstatusGACA] = useState('idle')
    const getAllConsiderArticles = () => {
        setstatusGACA('loading')
        ArticleService.getAllConsiderArticles()
            .then(response => {
                setConsiderArticles(response.data)
                setstatusGACA('succedded')
            })
            .catch(error => {
                console.log(error)
                setstatusGACA('failed')
            })
    }

    useEffect(()=>{
        getAllConsiderArticles()
    }, [])

    var content = ''
    var tableContent = ''
    if(statusGACA === 'loading'){
        tableContent = <Spinner animation="border" variant="primary" />
    } else if(statusGACA === 'succedded' && considerArticles){
        content = considerArticles.map(considerArticle => {
            return(<ConsiderArticleExcerpt key={considerArticle.id} considerArticle={considerArticle}/>)
        })
        tableContent = (
            <Table bordered>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Тип статьи</th>
                    </tr>
                </thead>
                <tbody>
                    {content}
                </tbody>
            </Table>
        )
    } else if(statusGACA === 'succedded' && !considerArticles){
        tableContent = <div>Статьи на рассмотрении отсутствуют</div>
    }
    return (
        <>
            <h5 className="mt-3">Статьи на рассмотрении</h5>
            {tableContent}
        </>
    )
}

export default AllConsiderArticles
