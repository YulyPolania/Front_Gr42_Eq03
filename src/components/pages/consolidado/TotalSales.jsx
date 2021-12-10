import MaterialTable from "@material-table/core";
import React, { useEffect, useState, useContext } from "react";
import Localization from "../../generic/Localization";
import saleService from "../../../services/saleService";
import { AuthContext } from "../../../auth/AuthContext";

const columns = [
  {
    title: "Total sin iva",
    field: "total",
    type: "currency",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Iva",
    field: "iva",
    type: "currency",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Total con Iva",
    field: "totalTotal",
    type: "currency",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
];

const TotalSales = (props) => {
  const [data, setData] = useState([]);
  const {
    sede: { baseURL, label: labelSede },
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
      .getTotalSales(baseURL)
      .then((res) => {
        const [total, iva, totalTotal] = res.data;
        const obj = { total, iva, totalTotal };
        setData([obj]);
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
        title={"Total ventas " + labelSede}
        columns={columns}
        data={data}
        localization={Localization}
        options={{
          search: false,
        }}
      />
    </>
  );
};

export default TotalSales;
