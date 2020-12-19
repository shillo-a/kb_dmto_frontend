import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import MessageConfirm from '../Messages/MessageConfirm'
import MessageSuccess from '../Messages/MessageSuccess'

const CancelButton = () => {

    const history = useHistory()

    //УПРАВЛЕНИЕ СООБЩЕНИЯМИ
    //message confirm
    const [showMC, setShowMC] = useState(false)
    const messageConfirm = 'Вы точно хотите отменить изменения?'
    const actionConfirmDescription = 'Продолжить'
    const actionConfirm = () => {
        // // выполняем действие
        // deleteArticle()
        // закрываем Message Confirm
        setShowMC(false)
        // запускае Message Success
        setShowMS(true)
    }

    //УПРАВЛЕНИЕ СООБЩЕНИЯМИ
    //message success
    const [showMS, setShowMS] = useState(false)
    const messageSuccess = 'Изменения не сохранены'
    const actionSuccess = () => {
        history.goBack()
    }

    const handleCancelClick = () => {
        setShowMC(true)
    }

    return (
        <>
        <Button onClick={handleCancelClick}>Отменить</Button>

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

export default CancelButton
