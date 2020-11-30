import http from "../../http-common";
import authHeader from "../../Authorization/services/auth-header";

const createSection = (data) => {
    return http.post('/owner/section', data, { headers: authHeader() })
}

const getSection = (sectionId) => {
    return http.get(`/owner/section/${sectionId}`, { headers: authHeader() })
}

export default {
    createSection,
    getSection
};
