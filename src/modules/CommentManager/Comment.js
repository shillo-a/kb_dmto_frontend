import React from 'react'
import { Button, Card } from 'react-bootstrap'
import DraftEditorCommentPreview from '../DraftEditor/DraftEditorCommentPreview'

const Comment = () => {
    const testCommentRaw = "{\"blocks\":[{\"key\":\"d5gjv\",\"text\":\"Тестовый комментарий 1\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}"
    
    return (
        <Card className="mb-3 border-0 bg-light text-dark">
            <Card.Body className="pt-0 pb-0">
                <span className="pr-2 font-weight-bold">Алексей Олегович Шилло</span>
                <span className="pr-2">01.10.2020 в 17:35</span>
            </Card.Body>
            <Card.Body className="pt-0 pb-0">
                <DraftEditorCommentPreview commentBody={testCommentRaw}/>
            </Card.Body>
            <Card.Body className="pt-0 pb-0">
                <Button className="p-0 m-0 text-muted" size="sm" variant="link">удалить</Button>
            </Card.Body>
        </Card>
    )
}

export default Comment
