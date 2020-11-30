import http from "../../http-common";
import authHeader from "../../Authorization/services/auth-header";

const getArticle = (artilceId) => {
    return http.get(`/owner/article/${artilceId}`, { headers: authHeader() })
}

const getAllPublishedArticles = (categoryId) => {
    return http.get(`/publishedarticles/${categoryId}`, { headers: authHeader() })
}

const getPublishedArcticle = (articleId) => {
    return http.get(`arcticle/${articleId}`, { headers: authHeader() })
}

export default {
    getArticle,
    getAllPublishedArticles,
    getPublishedArcticle
  };