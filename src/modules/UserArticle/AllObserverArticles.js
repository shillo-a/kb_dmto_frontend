import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'

import UserArticleService from '../../services/apis/user-article-service'
import ObserverArticleExcerpt from './ObserverArticleExcerpt'

const AllObserverArticles = () => {

    const [observerArticles, setObserverArticles] = useState('')

    // GAOA - get all observer articles
    const [statusGAOA, setStatusGAOA] = useState('idle')
    const getAllObserverArticles = () => {
        setStatusGAOA('loading')
        UserArticleService.getAllObserverArticles()
            .then(response => {
                setObserverArticles(response.data)
                setStatusGAOA('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusGAOA('failed')
            })
    }

    useEffect(()=>{
        getAllObserverArticles()
    }, [])

    var content = ''
    if(statusGAOA === 'loading'){
        content = <Spinner animation="border" variant="primary" />
    } else if(statusGAOA === 'succedded' && observerArticles){
        content = observerArticles.map(observerArticle => {
            return(
                <ObserverArticleExcerpt key={observerArticle.id} observerArticle={observerArticle}/>
            )
        })
    } else if(statusGAOA === 'succedded' && !observerArticles){
        content = <div>Избранные статьи отсутствуют</div>
    }

    return (
        <React.Fragment>
            <h5 className="mt-3">Избранные статьи</h5>
            {content}
        </React.Fragment>
    )
}

export default AllObserverArticles;