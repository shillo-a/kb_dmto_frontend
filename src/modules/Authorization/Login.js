import React, { useState } from 'react'
import { Row, Col, Form, Container, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import './styles/Login.css'
import AuthService from '../../services/apis/auth-service'


const Login = () => {

    const history = useHistory()
    // LI - login
    const [statusLI, setStatusLI] = useState('')
    const login = (username, password) => {
        setStatusLI('loading')
        AuthService.login(username, password)
            .then(response => {
                // Не надо, так как работают редиректы
                // history.push('/home')
                window.location.reload()
                setStatusLI('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusLI('failed')
            })
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        login(username, password)
    }

    return (
        <Container className="text-center border shadow p-5 mt-5 login-form" >
            <h5>База знаний категорийных стратегий Топливной компании</h5>
            <hr/>
            <Form onSubmit={handleLogin}>
                <Form.Group as={Row} controlId="username">
                    <Form.Label column sm={2}>Логин:</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="text" 
                            placeholder="Введите логин" 
                            value={username}
                            onChange={onChangeUsername}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="password">
                    <Form.Label column sm={2}>Пароль:</Form.Label>
                    <Col sm={10}>
                        <Form.Control 
                            type="password" 
                            placeholder="Введите пароль" 
                            value={password}
                            onChange={onChangePassword}
                            autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Button variant="primary" type="submit">Войти</Button>
            </Form>
        </Container>
    )
}

export default Login