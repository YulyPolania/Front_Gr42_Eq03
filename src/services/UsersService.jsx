import axios from "axios";

// const GET_ALL_USERS = "http://localhost:8081/api/usuarios/v1/all";
// const GET_ALL_USERS = "http://192.168.0.6:8081/usuarios/all";
const GET_ALL_USERS = "http://localhost:8081/usuarios/all";
// const SAVE_USER = "http://192.168.0.6:8081/usuarios/save";
const SAVE_USER = "http://localhost:8081/usuarios/save";
// const GET_ALL_USERS = "https://jsonplaceholder.typicode.com/users";


class UsersService {
  getUsers() {
    return axios.get(GET_ALL_USERS);
  }
  saveUser(data) {
    return axios.post(SAVE_USER, data);
  }
  deleteUser(id) {
    return axios.delete()
  }
}

export default new UsersService();