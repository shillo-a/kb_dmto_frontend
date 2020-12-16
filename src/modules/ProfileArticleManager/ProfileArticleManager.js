import React, { useEffect } from 'react'
import { Button, Container, Nav, Tab } from 'react-bootstrap'

import AllAuthorArticles from './AllAuthorArticles'
import AllObserverArticles from './AllObserverArticles'
import AllPublishedAuthorArticles from './AllPublishedAuthorArticles'

const ProfileArticleManager = () => {

    return (
        <Container className="pt-3">
            <Tab.Container defaultActiveKey='inwork'>
                <Nav variant="pills">
                    <Nav.Item><Nav.Link eventKey="inwork">В работе</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="favorite">Избранные</Nav.Link></Nav.Item>
                    <Nav.Item><Nav.Link eventKey="published">Опубликованные</Nav.Link></Nav.Item>
                </Nav>
                
                <Tab.Content>
                    <Tab.Pane eventKey="inwork">
                        <AllAuthorArticles/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="favorite">
                        <AllObserverArticles />
                    </Tab.Pane>
                    <Tab.Pane eventKey="published">
                        <AllPublishedAuthorArticles/>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    )
}

export default ProfileArticleManager;