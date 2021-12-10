import MaterialTable from "@material-table/core";
import React, { useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Modal, Box } from "@mui/material";
import saleService from "../../../services/saleService";
import SalesDelForm from "./SalesDelForm";
import Localization from "../../generic/Localization";
import { AuthContext } from "../../../auth/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 1,
};

const columns = [
  {
    title: "Código",
    field: "codigoVenta",
    type: "numeric",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Cédula Usuario",
    field: "cedulaUsuario",
    type: "numeric",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Cédula Cliente",
    field: "cedulaCliente",
    type: "numeric",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Fecha",
    field: "fechaVenta",
    type: "time",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "IVA",
    field: "ivaVenta",
    type: "currency",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Total",
    field: "totalVenta",
    type: "currency",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Total con IVA",
    field: "totalIva",
    type: "currency",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
];

const columnsDetalles = [
  {
    title: "Código Detalle",
    field: "codigoDetalleVenta",
    type: "numeric",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Código Producto",
    field: "codigoProducto",
    type: "numeric",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Cantidad Producto",
    field: "cantidadProducto",
    type: "numeric",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Iva",
    field: "valorIva",
    type: "currency",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Valor sin Iva",
    field: "valorVenta",
    type: "currency",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Total con Iva",
    field: "valorTotal",
    type: "currency",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
];

const SalesTable = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [del, setDel] = useState({ open: false, data: {} });
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

  const handleSuccess = (res) => {
    handleOpen();
    getData();
    setAlert({
      openAlert: true,
      severity: "success",
      message: res.data.mensaje,
    });
  };

  const getData = async () => {
    await saleService
      .getSales(baseURL)
      .then((res) => {
        res.data.forEach((i) => {
          i.fechaVenta = dayjs(i?.fechaVenta).format("DD/MM/YYYY");
        });
        setData(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const deleteData = async () => {
    await saleService
      .deleteSale(baseURL, del.data?.codigoVenta)
      .then((res) => {
        handleOpen();
        handleSuccess(res);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseURL]);

  const handleOpen = (rowData) => {
    // delete rowData.tableData;
    setDel((prevState) => ({
      ...prevState,
      open: !prevState.open,
      data: rowData,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    deleteData();
  };

  return (
    <>
      <MaterialTable
        title="Ventas"
        columns={columns}
        data={data}
        localization={Localization}
        options={{
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: "edit",
            iconProps: { color: "primary" },
            tooltip: "Editar registro",
            onClick: (e, rowData) =>
              navigate(`/ventas/editar?codigoVenta=${rowData.codigoVenta}`),
          },
          {
            icon: "delete",
            iconProps: { color: "error" },
            tooltip: "Eliminar registro",
            onClick: (e, rowData) => handleOpen(rowData),
          },
          {
            icon: "add_box",
            iconProps: { color: "secondary" },
            tooltip: "Registrar",
            position: "toolbar",
            onClick: () => navigate("/ventas/registrar"),
          },
        ]}
        detailPanel={(rowData) => {
          return (
            <Box
              key={rowData.rowData.codigoVenta}
              sx={{
                display: "flex",
                justifyContent: "center",
                bgcolor: "background.paper",
              }}
            >
              <MaterialTable
                style={{ width: "95%" }}
                data={rowData.rowData.detallesVenta}
                localization={Localization}
                columns={columnsDetalles}
                options={{
                  search: false,
                  showTitle: false,
                  toolbar: false,
                  paging: false,
                }}
              />
            </Box>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
      <Modal open={del.open} onClose={() => handleOpen()}>
        <Box sx={style} onSubmit={handleSubmit}>
          <SalesDelForm venta={del.data} handleOpen={handleOpen} />
        </Box>
      </Modal>
    </>
  );
};

export default SalesTable;
