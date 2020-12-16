import React, { useState } from 'react'
import { Spinner, Table } from 'react-bootstrap'
import ConsiderArticleExcerpt from './ConsiderArticleExcerpt'

const AllConsiderArticles = () => {

    const [considerArticles, setConsiderArticles] = useState(
        [
            {id: 1, title: "Статья для проверки 1", category: 'Материалы'},
            {id: 2, title: "Статья для проверки 2", category: 'Материалы'},
            {id: 3, title: "Статья для проверки 3", category: 'Материалы'}
        ]
    )

    // GACA - get all consider articles
    const [statusGACA, setstatusGACA] = useState('succedded')

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
