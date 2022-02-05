import axios from "@/api/axios.js";
// alexalexalex  balakirevdr@mail.ru

const register = (user) => {
  return axios.post("/users", { user: user });
};

const login = (user) => {
  return axios.post("/users/login", { user: user });
};

const getCurrentUser = () => {
  return axios.get("/user");
};

export default {
  register,
  login,
  getCurrentUser,
};
