import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/ui/Dashboard";
import UsersForm from "../components/pages/user/UsersForm"
import UsersTable from "../components/pages/user/UsersTable"

export const DashboardRoutes = () => {
  const pages = [
    { path: "usuarios", element: <UsersTable/> },
    { path: "clientes", element: <UsersForm/> },
    { path: "proveedores", element: <UsersTable/> },
    { path: "productos", element: <h1>Componente productos</h1> },
    { path: "ventas", element: <h1>Componente ventas</h1> },
    { path: "consolidado", element: <h1>Componente consolidado</h1> },
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {pages.map(({ path, element }) => (
            <Route path={"/" + path} element={element} key={path} />
          ))}
          <Route path="/aaaa" element={ <h1>AAAAA</h1> } />
        </Route>
      </Routes>
    </>
  );
};
