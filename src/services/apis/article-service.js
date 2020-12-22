import http from "./settings/http-common";
import authHeader from "./settings/auth-header";

//array of articles

const getAllPublishedArticles = (categoryId) => {
    return http.get(`/publishedarticles/${categoryId}`, { headers: authHeader() })
}

const getAllConsiderArticles = () => {
    return http.get(`/articles/consider`, { headers: authHeader() })
}

//one article
const getArticle = (articleId) => {
    return http.get(`/article/${articleId}`, { headers: authHeader() })
}

const createArticle = (article) => {
    return http.post(`/article/createcurruser/category/${article.categoryId}`, article, { headers: authHeader() })
}

const changeArticle = (articleId, article) => {
    return http.put(`/article/${articleId}/draft`, article, { headers: authHeader() })
}

// РАБОТА СО СТАТУСАМИ СТАТЬИ
//// для всех пользователей по своим статьям:
const changeFromDraftToConsider = (articleId) => {
    return http.put(`/article/${articleId}/change_from_draft_to_consider`,  {}, { headers: authHeader() })
}

const changeFromConsiderToDraft = (articleId) => {
    return http.put(`/article/${articleId}/change_from_consider_to_draft`,  {}, { headers: authHeader() })
}

const changeFromDeclineToDraft = (articleId) => {
    return http.put(`/article/${articleId}/change_from_decline_to_draft`,  {}, { headers: authHeader() })
}

const changeToArchive = (articleId) => {
    return http.put(`/article/${articleId}/change_to_archive`,  {}, { headers: authHeader() })
}

//// для модератора по любым статьям:
const changeFromConsiderToDecline = (articleId) => {
    return http.put(`/article/${articleId}/change_from_consider_to_decline`,  {}, { headers: authHeader() })
}

const changeFromConsiderToPublished = (articleId) => {
    return http.put(`/article/${articleId}/change_from_consider_to_published`,  {}, { headers: authHeader() })
}


// API ДЛЯ АДМИНА (owner-а):
const getArticleAsOwner = (artilceId) => {
    return http.get(`/owner/article/${artilceId}`, { headers: authHeader() })
}

export default {
    getAllPublishedArticles,
    getAllConsiderArticles,
    
    getArticle,
    createArticle,
    changeArticle,

    changeFromDraftToConsider,
    changeFromConsiderToDraft,
    changeFromDeclineToDraft,
    changeToArchive,
    changeFromConsiderToDecline,
    changeFromConsiderToPublished
};