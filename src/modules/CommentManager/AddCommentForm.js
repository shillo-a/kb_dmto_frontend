import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'

import CommentService from '../../services/apis/comment-service'
import DraftEditorComment from '../DraftEditor/DraftEditorComment'

const AddCommentForm = ({ articleId, setDummyObesrver, dummyObesrver }) => {
    
    

    const [comment, setComment] = useState('')

    const changeComment = (newComment) => {
        setComment(newComment)
    }
    
    // PC - post comment
    const [statusPC, setStatusPC] = useState('idle')
    const postComment = (articleId, comment) => {
        setStatusPC('loading')
        CommentService.postComment(articleId, comment)
            .then(response => {
                setStatusPC('succedded')
                setComment('')
                setDummyObesrver(Math.random())
            })
            .catch(error => {
                console.log(error)
                setStatusPC('failed')
            })
    }

    const saveCommentHandler = (e) => {
        postComment(articleId, comment)
    }

    return (
        <div>
            <h3>Написать комментарий</h3>
            <DraftEditorComment comment={comment} changeComment={changeComment} dummyObesrver={dummyObesrver}/>
            <Button className="mt-2" onClick={saveCommentHandler}>Отправить</Button>
        </div>
    )
}

export default AddCommentForm
