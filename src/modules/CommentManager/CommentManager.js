import React from 'react'
import { Container } from 'react-bootstrap'

import AddCommentForm from './AddCommentForm'
import AllArticleComments from './AllArticleComments'

const CommentManager = ({ articleId }) => {
    console.log(articleId, 'com')
    return (
        <Container className="mt-2 pt-3 pb-3 bg-light text-dark shadow-sm">
            <h3 id="comments">Комменатрии</h3>
            <hr/>    
            <AllArticleComments articleId={articleId}/>
            <AddCommentForm />
       </Container>
    )
}

export default CommentManager
