import genericService from "./genericService";

const GET_ALL_PERMISOS = "/permisos/all";
const SAVE_PERMISO = "/permisos/save";
const SAVE_PERMISOS_LIST = "/permisos/saveList";
const DELETE_PERMISO = "/permisos/delete/";
const UPDATE_PERMISO = "/permisos/update/";
const DELETE_PERMISOS_BY_CEDULAUSUARIO = "/permisos/deleteByCedulaUsuario/";

const getPermisos = (baseURL) => {
  return genericService(baseURL).get(GET_ALL_PERMISOS);
};

const savePermiso = (baseURL, data) => {
  return genericService(baseURL).post(SAVE_PERMISO, data);
};

const savePermisosList = (baseURL, data) => {
  return genericService(baseURL).post(SAVE_PERMISOS_LIST, data);
};

const deletePermiso = (baseURL, id) => {
  return genericService(baseURL).delete(DELETE_PERMISO.concat(id));
};

const deletePermisosByCedulaUsuario = (baseURL, id) => {
  return genericService(baseURL).delete(
    DELETE_PERMISOS_BY_CEDULAUSUARIO.concat(id)
  );
};

const updatePermiso = (baseURL, id, data) => {
  return genericService(baseURL).put(UPDATE_PERMISO.concat(id), data);
};

const permisoService = {
  getPermisos,
  savePermiso,
  savePermisosList,
  deletePermiso,
  deletePermisosByCedulaUsuario,
  updatePermiso,
};
export default permisoService;
