import React from 'react'
import { Container } from 'react-bootstrap'

import AddCommentForm from './AddCommentForm'
import AllArticleComments from './AllArticleComments'

const CommentManager = () => {
    return (
        <Container className="mt-2 pt-3 pb-3 bg-light text-dark shadow-sm">
            <h3 id="comments">Комменатрии</h3>
            <hr/>    
            <AllArticleComments/>
            <AddCommentForm />
       </Container>
    )
}

export default CommentManager
