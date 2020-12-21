import React from 'react'
import { Button, Card } from 'react-bootstrap'
import DraftEditorCommentPreview from '../DraftEditor/DraftEditorCommentPreview'
import DeleteCommentButton from './DeleteCommentButton'

const Comment = ({ comment, currentUser, setDummyObesrver}) => {

    return (
        <>
        {comment? 
            <Card className="mb-3 border-0 bg-light text-dark">
                <Card.Body className="pt-0 pb-0">
                    <div className="pr-2 font-weight-bold">
                        {comment.user.lastName} {comment.user.firstName} {comment.user.middleName}
                    </div>
                    <span className="pr-2">{comment.timestamp}</span>
                </Card.Body>
                <Card.Body className="pt-0 pb-0">
                    <DraftEditorCommentPreview comment={comment.comment}/>
                </Card.Body>
                <Card.Body className="pt-0 pb-0">
                    {currentUser.id === comment.user.id?
                        <DeleteCommentButton commentId={comment.id} setDummyObesrver={setDummyObesrver}/>
                        : <></>}
                </Card.Body>
            </Card>
        :
            <></>
        }

        </>
    )
}

export default Comment
