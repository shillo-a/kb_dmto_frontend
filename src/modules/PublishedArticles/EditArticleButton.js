import React from 'react'
import { PencilSquare } from 'react-bootstrap-icons';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

const EditArticleButton = ({ articleId }) => {

    const history = useHistory()
    const transitionHandler = () => {
        history.push(`/article-master/base/${articleId}`)
    }
    return (
        <OverlayTrigger placement="top" delay={{ show: 100, hide: 100 }} overlay={<Tooltip id="button-tooltip">Редактировать</Tooltip>}>
            <Button variant="link" onClick={transitionHandler}>
                <PencilSquare size={30}/>
            </Button>
        </OverlayTrigger>
        
    )
}

export default EditArticleButton
