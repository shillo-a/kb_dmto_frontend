import React, { useState, useEffect } from "react";
import RoleArticleService from "../services/RoleArticleService";

const RoleArticle = props => {
    const initialRoleArticleState = {
        id: "",
        rolearticle: ""
    };
    const [currentRoleArticle, setCurrentRoleArticle] = useState(initialRoleArticleState);
    const [message, setMessage] = useState("");

    const getRoleArticle = id => {
        RoleArticleService.getRoleArticle(id)
            .then(response => {
                setCurrentRoleArticle(response.data);
                console.log(response.data);
                
            })
            .catch(e => {
                console.log(e);
                console.log(id);
            });
    };

    useEffect(() => {
        getRoleArticle(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentRoleArticle({ ...currentRoleArticle, [name]: value });
    };

     const updateRoleArticle = () => {
        RoleArticleService.updateRoleArticle(currentRoleArticle.id, currentRoleArticle)
            .then(response => {
                console.log(response.data);
                setMessage("Роль Статьи была успешно изменена!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteRoleArticle = () => {
        RoleArticleService.deleteRoleArticle(currentRoleArticle.id)
            .then(response => {
                console.log(response.data);
                props.history.push("/rolearticle/all");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentRoleArticle ? (
                <div className="edit-form">
                    <h4>Роль Статьи</h4>
                    <form>
                    <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="id"
                                name="id"
                                value={currentRoleArticle.id}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="roleArticle">Роль</label>
                            <input
                                type="text"
                                className="form-control"
                                id="roleArticle"
                                name="roleArticle"
                                value={currentRoleArticle.roleArticle}
                                onChange={handleInputChange}
                            />
                        </div>
                     
                    </form>
                    
                    <button className="badge badge-danger mr-2" onClick={deleteRoleArticle}>
                        Удалить
                    </button>

                    <button
                        type="submit"
                        className="badge badge-success"
                        onClick={updateRoleArticle}
                    >
                        Изменить
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Выберите Роль Статьи ...</p>
                </div>
            )}
        </div>
    );
};

export default RoleArticle;