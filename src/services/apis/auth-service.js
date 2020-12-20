import http from "./settings/http-common";
import authHeader from "./settings/auth-header";

const register = (username, email, lastName, firstName, middleName, roleAdmin, roleModerator, password) => {
    return http.post("/auth/signup", 
    {
        username: username,
        password: password,
        email: email,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName
      }
    , { headers: authHeader() })
}

const login = (username, password) => {
    return http.post("/auth/signin", {username, password})
        .then(response => {
            if(response.data.accessToken){
                localStorage.setItem("user", JSON.stringify(response.data))
            }
    return response.data
    })
}

const logout = () => { 
    localStorage.removeItem("user") 
}

const getCurrentUser = () => {

    //добавить проверку на активность текущего токена!!!
    //если токен не активен возвращать - ''
    return JSON.parse(localStorage.getItem("user"))
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};