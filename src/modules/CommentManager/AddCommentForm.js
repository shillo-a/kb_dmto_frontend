import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'

import DraftEditorComment from '../DraftEditor/DraftEditorComment'

const AddCommentForm = () => {
    return (
        <div>
            <h3>Написать комментарий</h3>
            <DraftEditorComment />
            <Button className="mt-2" >Отправить</Button>
        </div>
    )
}

export default AddCommentForm
