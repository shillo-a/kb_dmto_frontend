import React, { useState } from 'react'
import { Container } from 'react-bootstrap'

import AddCommentForm from './AddCommentForm'
import AllArticleComments from './AllArticleComments'

const CommentManager = ({ articleId, currentUser }) => {

    const [dummyObesrver, setDummyObesrver] = useState('')

    return (
        <Container className="mt-2 pt-3 pb-3 bg-light text-dark shadow-sm">
            <h3 id="comments">Комменатрии</h3>
            <hr/>    
            <AllArticleComments articleId={articleId} currentUser={currentUser} dummyObesrver={dummyObesrver} setDummyObesrver={setDummyObesrver}/>
            <AddCommentForm articleId={articleId} dummyObesrver={dummyObesrver} setDummyObesrver={setDummyObesrver}/>
       </Container>
    )
}

export default CommentManager
