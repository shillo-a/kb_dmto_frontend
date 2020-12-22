import http from "./settings/http-common";
import authHeader from "./settings/auth-header";

const addSectionsToArticle = (articleId, sections) => {
    return http.post(`/section/article/${articleId}`, sections, { headers: authHeader() })
}

const deleteSectionsArticle = (articleId) => {
    return http.delete(`/section/article/${articleId}`, { headers: authHeader() })
}

// Для админа (owner-а):
const getSection = (sectionId) => {
    return http.get(`/owner/section/${sectionId}`, { headers: authHeader() })
}

const createSection = (data) => {
    return http.post('/owner/section', data, { headers: authHeader() })
}

export default {
    addSectionsToArticle,
    deleteSectionsArticle  
};
