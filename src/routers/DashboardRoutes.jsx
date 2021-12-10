import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "../components/ui/Dashboard";
import SalesForm from "../components/pages/sale/SalesForm";
import UsersTable from "../components/pages/user/UsersTable";
import CustomersTable from "../components/pages/customer/CustomersTable";
import SuppliersTable from "../components/pages/supplier/SuppliersTable";
import ProductsTable from "../components/pages/product/ProductsTable";
import SalesTable from "../components/pages/sale/SalesTable";
import SalesByCustomer from "../components/pages/consolidado/SalesByCustomer"
import TotalSales from "../components/pages/consolidado/TotalSales"
import AboutUs from "../components/ui/AboutUs"

export const DashboardRoutes = () => {
  const { search } = useLocation();
  const searshParams = new URLSearchParams(search);
  const pages = [
    { path: "usuarios", element: <UsersTable /> },
    { path: "clientes", element: <CustomersTable /> },
    { path: "proveedores", element: <SuppliersTable /> },
    { path: "productos", element: <ProductsTable /> },
    { path: "ventas", element: <SalesTable /> },
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/" element={<AboutUs />} />
          {pages.map(({ path, element }) => (
            <Route path={"/" + path} element={element} key={path} />
          ))}
          <Route path="/ventas/registrar" element={<SalesForm />} />
          <Route path="/ventas/editar" element={<SalesForm codigoVenta={searshParams.get("codigoVenta")}/>} />
          <Route path="/ventas/cliente" element={<SalesByCustomer />} />
          <Route path="/ventas/sucursal" element={<TotalSales />} />
        </Route>
      </Routes>
    </>
  );
};
