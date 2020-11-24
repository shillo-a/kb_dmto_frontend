import React from 'react'
import { Link } from 'react-router-dom'

export const AdminPage = () => {
    return(
        <div className="container">
            <h1>Admin Page</h1>
            <table className="table table-sm table-bordered">
                <thead>
                    <tr><th scope="col">Модели</th></tr>
                </thead>
                <tbody>
                    <tr><td><Link to={`/admin/roleprojects/`}>rolePojects</Link></td></tr>
                    <tr><td>другие...</td></tr>
                </tbody>
            </table>
        </div>
    )
}