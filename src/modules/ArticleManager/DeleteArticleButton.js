import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import MessageConfirm from '../Messages/MessageConfirm'
import MessageSuccess from '../Messages/MessageSuccess'

const DeleteArticleButton = () => {

    const handleDeleteClick = (e) => {
        setShowMC(true)
    }

    const deleteArticle = () => {
        console.log('статья удалена')
    }

    //УПРАВЛЕНИЕ СООБЩЕНИЯМИ
    //message confirm
    const [showMC, setShowMC] = useState(false)
    const messageConfirm = 'Вы точно хотите удалить статью?'
    const actionConfirmDescription = 'Удалить'
    const actionConfirm = () => {
        // выполняем действие
        deleteArticle()
        // закрываем Message Confirm
        setShowMC(false)
        // запускае Message Success
        setShowMS(true)
    }
    
    //message success
    const [showMS, setShowMS] = useState(false)
    const messageSuccess = 'Статья успешно удалена!'

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
            />

        </>
    )

}

export default DeleteArticleButton
