import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import AllAuthorArticles from './AllAuthorArticles'
import AllObserverArticles from './AllObserverArticles'

const ProfileArcticleManager = () => {

    const history = useHistory()
    
    const clickTransitionHandler = (event) => {
        history.push('/articlemaster')
        
    }

    return (
        <Container>
            <h5>Избранные статьи</h5>
            <AllObserverArticles />
            <h5>Созданные статьи</h5>
            <AllAuthorArticles />
            <Button onClick={clickTransitionHandler}>Создать статью</Button>
        </Container>
    )
}

export default ProfileArcticleManager;