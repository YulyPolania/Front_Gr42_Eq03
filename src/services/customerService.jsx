import genericService from "./genericService";

const GET_ALL_CUSTOMERS = "/clientes/all";
const SAVE_CUSTOMER = "/clientes/save";
const DELETE_CUSTOMER = "/clientes/delete/";
const UPDATE_CUSTOMER = "/clientes/update/";

const getCustomers = (baseURL) => {
  return genericService(baseURL).get(GET_ALL_CUSTOMERS);
};

const saveCustomer = (baseURL, data) => {
  return genericService(baseURL).post(SAVE_CUSTOMER, data);
};

const deleteCustomer = (baseURL, id) => {
  return genericService(baseURL).delete(DELETE_CUSTOMER.concat(id));
};

const updateCustomer = (baseURL, id, data) => {
  return genericService(baseURL).put(UPDATE_CUSTOMER.concat(id), data);
};

const customerService = {
  getCustomers,
  saveCustomer,
  deleteCustomer,
  updateCustomer,
};
export default customerService;
