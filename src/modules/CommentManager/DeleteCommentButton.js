import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import CommentService from '../../services/apis/comment-service'

const DeleteCommentButton = ({commentId, setDummyObesrver}) => {

    // DC - delete comment
    const [statusDC, setStatusDC] = useState('idle')
    const deleteComment = (commentId) => {
        setStatusDC('loading')
        CommentService.deleteComment(commentId)
            .then(response => {
                setStatusDC('succedded')
                setDummyObesrver(Math.random())
            })
            .catch(error => {
                console.log(error)
                setStatusDC('failed')
            })
    }
    
    const deleteCommentHandler = (e) => {
        deleteComment(commentId)
    }

    return (
        <Button className="p-0 m-0 text-muted" size="sm" variant="link" onClick={deleteCommentHandler}>удалить</Button>
    )
}

export default DeleteCommentButton
