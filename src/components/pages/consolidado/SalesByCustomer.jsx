import MaterialTable from "@material-table/core";
import React, { useEffect, useState, useContext } from "react";
import Localization from "../../generic/Localization";
import saleService from "../../../services/saleService";
import { AuthContext } from "../../../auth/AuthContext";

const columns = [
  {
    title: "Nombre cliente",
    field: "nombreCliente",
    type: "string",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "left", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Total Venta",
    field: "totalVenta",
    type: "currency",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
];

const SalesByCustomer = (props) => {
  const [data, setData] = useState([]);
  const {
    sede: { baseURL },
    setAlert,
    logout,
  } = useContext(AuthContext);

  const handleError = (err) => {
    switch (err.response?.status) {
      case 401:
        logout();
        break;
      case 403:
        setAlert({
          openAlert: true,
          severity: "warning",
          message:
            "Acceso denegado, no tiene permisos para realizar esta acción!",
        });
        break;
      case 400 || 404:
        setAlert({
          openAlert: true,
          severity: "error",
          message: err.response.data.error,
        });
        break;
      default:
        console.log(err);
        break;
    }
  };

  const getData = async () => {
    await saleService
      .getSalesByCustomer(baseURL)
      .then((res) => {
        let info = [];
        res.data.forEach((d) => {
          info.push({ nombreCliente: d[0], totalVenta: d[1] });
        });
        setData(info);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseURL]);

  return (
    <>
      <MaterialTable
        title="Ventas por Cliente"
        columns={columns}
        data={data}
        localization={Localization}
      />
    </>
  );
};

export default SalesByCustomer;
