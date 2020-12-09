import http from "./settings/http-common";
import authHeader from "./settings/auth-header";

const getPublicContent = () => {
  return http.get("/test/all");
};

const getUserBoard = () => {
  return http.get("/test/user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return http.get("/test/mod", { headers: authHeader() });
};

const getOwnerBoard = () => {
  return http.get("/test/owner", { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getOwnerBoard,
};