import React, { useState, useEffect } from "react";
import RoleArticleService from "../services/RoleArticleService";
import { Link } from "react-router-dom";
import RoleArticle from "./RoleArticle";

const RoleArticleList = () => {
    const [roleArticles, setRoleArticles] = useState([]);
    const [currentRoleArticle, setCurrentRoleArticle] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
   
    useEffect(() => {
        retrieveRoleArticles();
    }, []);

    const retrieveRoleArticles = () => {
        RoleArticleService.getAllRoleArticle()
            .then(response => {
                setRoleArticles(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveRoleArticles();
        setCurrentRoleArticle(null);
        setCurrentIndex(-1);
    };

    const setActiveRoleArticle = (roleArticle, index) => {
        setCurrentRoleArticle(roleArticle);
        setCurrentIndex(index);
    };

    
    return (
        <div className="list row">
          
            <div className="col-md-6">
                <h4>Список Ролей статей</h4>

                <ul className="list-group">
                    {roleArticles &&
                    roleArticles.map((roleArticle, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveRoleArticle(roleArticle, index)}
                            key={index}
                        >
                            {roleArticle.roleArticle}
                        </li>
                    ))}
                </ul>

               
            </div>
            <div className="col-md-6">
                {currentRoleArticle ? (
                    <div>
                        <h4>Роль статьи</h4>
                        <div>
                            <label>
                                <strong>Роль статьи:</strong>
                            </label>{" "}
                            {currentRoleArticle.roleArticle}
                        </div>
                       
                        <Link
                            to={"/rolearticle/" + currentRoleArticle.id}
                            className="badge badge-warning"
                        >
                            Редактирование
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Выберить Роль статьи...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RoleArticleList;