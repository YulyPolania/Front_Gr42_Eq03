import genericService from "./genericService";

const GET_ALL_PRODUCTS = "/productos/all";
const SAVE_PRODUCT = "/productos/save";
const DELETE_PRODUCT = "/productos/delete/";
const UPDATE_PRODUCT = "/productos/update/";
const IMPORT_PRODUCTS = "/productos/import/";

const getProducts = (baseURL) => {
  return genericService(baseURL).get(GET_ALL_PRODUCTS);
};

const saveProduct = (baseURL, data) => {
  return genericService(baseURL).post(SAVE_PRODUCT, data);
};

const importFromCsv = (baseURL, data) => {
  return genericService(baseURL).post(IMPORT_PRODUCTS, data);
};

const deleteProduct = (baseURL, id) => {
  return genericService(baseURL).delete(DELETE_PRODUCT.concat(id));
};

const updateProduct = (baseURL, id, data) => {
  return genericService(baseURL).put(UPDATE_PRODUCT.concat(id), data);
};

const productService = {
  getProducts,
  saveProduct,
  importFromCsv,
  deleteProduct,
  updateProduct,
};
export default productService;
