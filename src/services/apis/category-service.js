import http from "./settings/http-common";
import authHeader from "./settings/auth-header";

const getAllCategories = () => {
    return http.get('/category/all', { headers: authHeader() })
}

const getCategory = (categoryId) => {
    return http.get(`/category/${categoryId}`, { headers: authHeader() })   
}

export default {
    getAllCategories,
    getCategory
}