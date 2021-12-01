import genericService from "./genericService"

const GET_ALL_USERS = "/usuarios/all";
const SAVE_USER = "/usuarios/save";
const DELETE_USER = "/usuarios/delete/";
const UPDATE_USER = "/usuarios/update/";

const getUsers = () => {
  return genericService().get(GET_ALL_USERS);
};

const saveUser = (data) => {
  return genericService().post(SAVE_USER, data);
};

const deleteUser = (id) => {
  return genericService().delete(DELETE_USER.concat(id));
};

const updateUser = (id, data) => {
  return genericService().put(UPDATE_USER.concat(id), data);
};

const UsersService = {
  getUsers,
  saveUser,
  deleteUser,
  updateUser,
};
export default UsersService;
