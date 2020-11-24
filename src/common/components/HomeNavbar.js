import React from 'react'
import { Link } from 'react-router-dom'

export const HomeNavbar = () => {
    return(
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">TaskManage</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to="/signin" className="nav-item nav-link">Войти</Link>
                    <Link to="/signup" className="nav-item nav-link">Зарегистрироваться</Link>
                </div>
            </div>
        </nav>
    )
}