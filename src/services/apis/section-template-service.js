import http from "./settings/http-common";
import authHeader from "./settings/auth-header";

// Получение шаблонов для разделов для конкретной категории
const getTemplateSections = (categoryId) => {
    return http.get(`/sectiontemplate/category/${categoryId}`, { headers: authHeader() })
}


export default {
    getTemplateSections
};
