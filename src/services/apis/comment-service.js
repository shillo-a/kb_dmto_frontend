import http from "./settings/http-common";
import authHeader from "./settings/auth-header";

const getAllComments = (articleId) => {
    return http.get(`/comment/article/${articleId}`, { headers: authHeader() })
}

const postComment = (articleId, comment) => {
    return http.post(`/comment/article/${articleId}`, {comment:comment}, { headers: authHeader() })
}

const deleteComment = (commentId) => {
    return http.delete(`/comment/${commentId}`, { headers: authHeader() })
}

export default {
    getAllComments,
    postComment,
    deleteComment
}