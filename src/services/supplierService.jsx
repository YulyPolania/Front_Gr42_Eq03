import genericService from "./genericService";

const GET_ALL_SUPPLIERS = "/proveedores/all";
const SAVE_SUPPLIER = "/proveedores/save";
const DELETE_SUPPLIER = "/proveedores/delete/";
const UPDATE_SUPPLIER = "/proveedores/update/";

const getSuppliers = (baseURL) => {
  return genericService(baseURL).get(GET_ALL_SUPPLIERS);
};

const saveSupplier = (baseURL, data) => {
  return genericService(baseURL).post(SAVE_SUPPLIER, data);
};

const deleteSupplier = (baseURL, id) => {
  return genericService(baseURL).delete(DELETE_SUPPLIER.concat(id));
};

const updateSupplier = (baseURL, id, data) => {
  return genericService(baseURL).put(UPDATE_SUPPLIER.concat(id), data);
};

const supplierService = {
  getSuppliers,
  saveSupplier,
  deleteSupplier,
  updateSupplier,
};
export default supplierService;
