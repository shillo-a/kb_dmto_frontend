import http from "../../http-common";
import authHeader from "../../Authorization/services/auth-header";

const getAllObserverArticles = () => {
    return http.get('/userarticle/observer', { headers: authHeader() })
}

const getAllAuthorArticles = () => {
    return http.get('/userarticle/author', { headers: authHeader() })
}

const addArticleToFavorite = (articleId) => {
    return http.post(`/userarticle/addcurruser/${articleId}`, '', { headers: authHeader() })
}

const removeArticleFromFavorite = (articleId) => {
    return http.delete(`/userarticle/${articleId}`, { headers: authHeader() })
}

const checkArticleIsFavorite = (articleId) => {
    return http.get(`/userarticle/checkarticle/${articleId}`, { headers: authHeader() })
}

export default {
    getAllObserverArticles,
    addArticleToFavorite,
    getAllAuthorArticles,
    removeArticleFromFavorite,
    checkArticleIsFavorite
  };