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

const updateCurrentUser = (updateCurrentUserInput) => {
  return axios.put("/user", { user: updateCurrentUserInput });
};

export default {
  register,
  login,
  getCurrentUser,
  updateCurrentUser,
};
