import genericService from "./genericService";

const GET_ALL_USERS = "/usuarios/all";
const SAVE_USER = "/usuarios/save";
const DELETE_USER = "/usuarios/delete/";
const UPDATE_USER = "/usuarios/update/";

const getUsers = (baseURL) => {
  return genericService(baseURL).get(GET_ALL_USERS);
};

const saveUser = (baseURL, data) => {
  return genericService(baseURL).post(SAVE_USER, data);
};

const deleteUser = (baseURL, id) => {
  return genericService(baseURL).delete(DELETE_USER.concat(id));
};

const updateUser = (baseURL, id, data) => {
  return genericService(baseURL).put(UPDATE_USER.concat(id), data);
};

const userService = {
  getUsers,
  saveUser,
  deleteUser,
  updateUser,
};
export default userService;
