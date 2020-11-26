import http from "../../http-common";
import authHeader from "../../services/auth-header";

const getAllRoleArticle = () => {
    return http.get("/owner/rolearticle", { headers: authHeader() });
};


const getRoleArticle = id => {
    return http.get('/owner/rolearticle/'+ id , {headers: authHeader() });
};

const createRoleArticle = data => {
    return http.post("/owner/rolearticle", data, { headers: authHeader() });
};

const updateRoleArticle = (id, data) => {
    return http.put("/owner/rolearticle/" + id, data, { headers: authHeader() });
};

const deleteRoleArticle = id => {
    return http.delete("/owner/rolearticle/" + id, { headers: authHeader() });
};


export default {
    getAllRoleArticle,
    getRoleArticle,
    createRoleArticle,
    updateRoleArticle,
    deleteRoleArticle
};