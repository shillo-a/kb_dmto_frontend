import React from 'react'
import { Button, Container, Nav, Tab } from 'react-bootstrap'

import AllAuthorArticles from '../UserArticle/AllAuthorArticles'
import AllObserverArticles from '../UserArticle/AllObserverArticles'

const ProfileArcticleManager = () => {

    return (
        <Container className="pt-3">

            <Tab.Container defaultActiveKey='draft'>
                <Nav variant="pills">
                    <Nav.Item>
                        <Nav.Link eventKey="draft">
                            В работе
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="favorite">
                            Избранные
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="published">
                            Опубликованные
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                
                <Tab.Content>
                    <Tab.Pane eventKey="draft">
                        <AllAuthorArticles/>
                    </Tab.Pane>
                    <Tab.Pane eventKey="favorite">
                        <AllObserverArticles />
                    </Tab.Pane>
                    <Tab.Pane eventKey="published">
                    {/* СДЕЛАТЬ ОТЕДЛЬНУЮ ВКЛАДКУ! */}
                        <AllObserverArticles />
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    )
}

export default ProfileArcticleManager;