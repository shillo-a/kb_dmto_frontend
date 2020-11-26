import React, { useState } from "react";
import RoleArticleService from "../services/RoleArticleService";

const AddRoleArticle = () => {
    const initialRoleArticleState = {
        id: null,
        roleArticle: ""
    };
    const [roleArticle, setRoleArticle] = useState(initialRoleArticleState);
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setRoleArticle({ ...roleArticle, [name]: value });
    };

    const saveRoleArticle = () => {
        var data = {
            id: roleArticle.id,
            roleArticle: roleArticle.roleArticle
        };

        RoleArticleService.createRoleArticle(data)
            .then(response => {
                setRoleArticle({
                    id: response.data.id,
                    roleArticle: response.data.roleArticle
                });
                setSubmitted(true);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newRoleArticle = () => {
        setRoleArticle(initialRoleArticleState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>Роль статьи успешно добавлена!</h4>
                    <button className="btn btn-success" onClick={newRoleArticle}>
                        Добавить
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                    <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={roleArticle.id}
                            onChange={handleInputChange}
                            name="id"
                        />

                        <label htmlFor="title">Роль статьи</label>
                        <input
                            type="text"
                            className="form-control"
                            id="roleArticle"
                            required
                            value={roleArticle.roleArticle}
                            onChange={handleInputChange}
                            name="roleArticle"
                        />
                    </div>

                    
                    <button onClick={saveRoleArticle} className="btn btn-success">
                        Сохранить
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddRoleArticle;