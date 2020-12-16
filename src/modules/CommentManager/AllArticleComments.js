import React from 'react'
import { Card, Container } from 'react-bootstrap'

import Comment from './Comment'

const AllArticleComments = () => {
    return (
        <Container>
            <Comment />
            <Comment />
        </Container>
    )
}

export default AllArticleComments
