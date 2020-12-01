import React from 'react'
import AllAuthorArticles from './AllAuthorArticles'
import AllObserverArticles from './AllObserverArticles'

const ArcticleManager = () => {
    return (
        <React.Fragment>
        <br/>
            <h5>Избранные статьи</h5>
            <AllObserverArticles />
            <h5>Созданные статьи</h5>
            <AllAuthorArticles />
        </React.Fragment>
    )
}

export default ArcticleManager;