import genericService from "./genericService"

const GET_ALL_SALES = "/ventas/all";
const SAVE_SALE = "/ventas/save";
const DELETE_SALE = "/ventas/delete/";
const UPDATE_SALE = "/ventas/update/";
const GET_SALES_BY_CUSTOMER = "/ventas/byCustomer";
const GET_SALES_BY_SEDE = "/ventas/total";

const getSales = (baseURL) => {
  return genericService(baseURL).get(GET_ALL_SALES);
};

const getSalesByCustomer = (baseURL) => {
  return genericService(baseURL).get(GET_SALES_BY_CUSTOMER);
};

const getTotalSales = (baseURL) => {
  return genericService(baseURL).get(GET_SALES_BY_SEDE);
};

const saveSale = (baseURL,data) => {
  return genericService(baseURL).post(SAVE_SALE, data);
};

const deleteSale = (baseURL,id) => {
  return genericService().delete(DELETE_SALE.concat(id));
};

const updateSale = (baseURL,id, data) => {
  return genericService(baseURL).put(UPDATE_SALE.concat(id), data);
};

const saleService = {
  getSales,
  getSalesByCustomer,
  getTotalSales,
  saveSale,
  deleteSale,
  updateSale,
};
export default saleService;
