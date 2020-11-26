import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const BoardOwner = () => {
  
  return (
       
    
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/tutorials"} className="nav-link">
                Tutorials
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add Tutorial
              </Link>
             </li>
             <li> 
              <Link to={"/rolearticle/all"} className="nav-link">
                  Роли Статей
                </Link>
             </li>
             <li className="nav-item">
               <Link to={"/rolearticle/add"} className="nav-link">
                Добавить Роль Статьи
                </Link>
            </li>
          </div>
    
    
  );
};

export default BoardOwner;