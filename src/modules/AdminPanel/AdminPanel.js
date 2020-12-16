import React from 'react'
import { Button, Jumbotron } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const AdminPanel = () => {

    const history = useHistory()
    const transitionHandler = (pathname) => {
        history.push(pathname)
    }

    return (
        <>
        <Jumbotron>
            <h3>Панель администратора</h3>
        </Jumbotron>
        <Button onClick={() => {transitionHandler('/admin/register')}}>Создать учетную запись</Button>
        </>
    )
}

export default AdminPanel
