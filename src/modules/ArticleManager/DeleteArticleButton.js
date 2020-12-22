import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import ArticleService from '../../services/apis/article-service'
import MessageConfirm from '../Messages/MessageConfirm'
import MessageSuccess from '../Messages/MessageSuccess'

const DeleteArticleButton = ({ articleId }) => {

    const history = useHistory()

    // CTA - change to archive
    const [statusCTA, setStatusCTA] = useState('idle')
    const changeToArchive = (articleId) => {
        setStatusCTA('loading')
        ArticleService.changeToArchive(articleId)
            .then(response => {
                setShowMS(true)
                setStatusCTA('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusCTA('failed')
            })
    }

    const handleDeleteClick = (e) => {
        setShowMC(true)
    }

    //УПРАВЛЕНИЕ СООБЩЕНИЯМИ
    //message confirm
    const [showMC, setShowMC] = useState(false)
    const messageConfirm = 'Вы точно хотите удалить статью?'
    const actionConfirmDescription = 'Удалить'
    const actionConfirm = () => {
        // выполняем действие
        changeToArchive(articleId)
        // закрываем Message Confirm
        setShowMC(false)
        // запускае Message Success
        setShowMS(true)
    }
    
    //message success
    const [showMS, setShowMS] = useState(false)
    const messageSuccess = 'Статья успешно удалена!'
    const actionSuccess = () => {
        history.push(`/profile/articles`)
        window.location.reload()
    }

    return (
        <>
            <Button 
                className="mr-2" 
                size="sm" 
                variant="danger"
                onClick={handleDeleteClick}
            >
                Удалить
            </Button>

            <MessageConfirm 
                messageConfirm={messageConfirm} 
                showMC={showMC} 
                setShowMC={setShowMC} 
                actionConfirmDescription={actionConfirmDescription}
                actionConfirm={actionConfirm}
            />

            <MessageSuccess 
                messageSuccess={messageSuccess}
                showMS={showMS} 
                setShowMS={setShowMS}
                actionSuccess={actionSuccess}
            />

        </>
    )

}

export default DeleteArticleButton
