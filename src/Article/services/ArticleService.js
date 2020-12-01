import http from "../../http-common";
import authHeader from "../../Authorization/services/auth-header";

const getArticle = (artilceId) => {
    return http.get(`/owner/article/${artilceId}`, { headers: authHeader() })
}

const getAllPublishedArticles = (categoryId) => {
    return http.get(`/publishedarticles/${categoryId}`, { headers: authHeader() })
}

const getPublishedArticle = (articleId) => {
    return http.get(`/article/${articleId}`, { headers: authHeader() })
}

export default {
    getArticle,
    getAllPublishedArticles,
    getPublishedArticle
  };