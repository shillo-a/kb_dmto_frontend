import React, { useState } from 'react'
import { Row, Col, Form, Container, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

import AuthService from "../../services/apis/auth-service";
import './styles/Register.css'

const Login = () => {

    const history = useHistory()
    // R - register
    const [statusR, setStatusR] = useState('')
    const register = (username, email, lastName, firstName, middleName, roleAdmin, roleModerator, password) => {
        setStatusR('loading')
        AuthService.register(username, email, lastName, firstName, middleName, roleAdmin, roleModerator, password)
            .then(response => {
                console.log(response)
                setStatusR('succedded')
            })
            .catch(error => {
                console.log(error)
                setStatusR('failed')
            })
    }

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [lastName, setLastName] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')

    const [password, setPassword] = useState('')
    const [roleAdmin, setRoleAdmin] = useState(false)
    const [roleModerator, setRoleModerator] = useState(false)
    

    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    const onChangeEmail = (e) => {
        const email = e.target.value
        setEmail(email)
    }

    const onChangeLastName = (e) => {
        const lastName = e.target.value
        setLastName(lastName)
    }

    const onChangeFirstName = (e) => {
        const firstName = e.target.value
        setFirstName(firstName)
    }

    const onChangeMiddleName = (e) => {
        const middleName = e.target.value
        setMiddleName(middleName)
    }

    const onChangeRoleAdmin = (e) => {
        const roleAdmin = e.target.checked
        setRoleAdmin(roleAdmin)
    }

    const onChangeRoleModerator = (e) => {
        const roleModerator = e.target.checked
        setRoleModerator(roleModerator)
    }

    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    const handleRegister = (e) => {
        e.preventDefault()
        register(username, email, lastName, firstName, middleName, roleAdmin, roleModerator, password)
    }

    return (
        <Container className="border shadow-sm p-5 mt-5 register-form" >
            <h5>Новый пользователь</h5>
            <hr/>
            <Form onSubmit={handleRegister} >
                <Container className="text-right">

                    <Form.Group as={Row} controlId="username" >
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

                    <Form.Group as={Row} controlId="email" >
                        <Form.Label column sm={2}>Почта:</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                type="email" 
                                placeholder="Введите почту" 
                                value={email}
                                onChange={onChangeEmail}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="lastname">
                        <Form.Label column sm={2}>Фамилия:</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                type="text" 
                                placeholder="Введите фамилию" 
                                value={lastName}
                                onChange={onChangeLastName}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="firstname">
                        <Form.Label column sm={2}>Имя:</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                type="text" 
                                placeholder="Введите имя" 
                                value={firstName}
                                onChange={onChangeFirstName}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="middlename">
                        <Form.Label column sm={2}>Отчество:</Form.Label>
                        <Col sm={10}>
                            <Form.Control 
                                type="text" 
                                placeholder="Введите отчество" 
                                value={middleName}
                                onChange={onChangeMiddleName}
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

                    <Form.Group as={Row} controlId="roleSelect">
                        <Form.Label column sm={2}>Роли:</Form.Label>
                        <Col sm={10} className="text-left">
                            <Form.Check 
                                type="checkbox" 
                                id="1" 
                                label="Администратор"
                                checked={roleAdmin}
                                onChange={onChangeRoleAdmin}
                            />
                            <Form.Check 
                                type="checkbox" 
                                id="2" 
                                label="Модератор" 
                                checked={roleModerator}
                                onChange={onChangeRoleModerator}
                            />
                        </Col>
                    </Form.Group>

                </Container>
                <Container className="text-center">
                    <Button variant="primary" type="submit">Создать</Button>
                </Container>
            </Form>
        </Container>
    )
}

export default Login