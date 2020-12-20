import React from 'react'
import { Button, Card } from 'react-bootstrap'
import DraftEditorCommentPreview from '../DraftEditor/DraftEditorCommentPreview'

const Comment = ({ comment }) => {
    
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
                    <DraftEditorCommentPreview commentBody={comment.comment}/>
                </Card.Body>
                <Card.Body className="pt-0 pb-0">
                    <Button className="p-0 m-0 text-muted" size="sm" variant="link">удалить</Button>
                </Card.Body>
            </Card>
        :
            <></>
        }

        </>
    )
}

export default Comment
