import http from "./settings/http-common";
import authHeader from "./settings/auth-header";

const getAllPublishedArticles = (categoryId) => {
    return http.get(`/publishedarticles/${categoryId}`, { headers: authHeader() })
}

const getArticle = (articleId) => {
    return http.get(`/article/${articleId}`, { headers: authHeader() })
}

const createArticle = (article) => {
    return http.post(`/article/createcurruser/category/${article.categoryId}`, article, { headers: authHeader() })
}



// Для админа (owner-а):
const getArticleAsOwner = (artilceId) => {
    return http.get(`/owner/article/${artilceId}`, { headers: authHeader() })
}

export default {
    getArticle,
    getAllPublishedArticles,
    createArticle
};