import MaterialTable from "@material-table/core";
import { useEffect, useState, useContext } from "react";
import { Modal, Box } from "@mui/material";
import customerService from "../../../services/customerService";
import CustomersForm from "./CustomersForm";
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
    title: "Cédula",
    field: "cedulaCliente",
    type: "numeric",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Nombre",
    field: "nombreCliente",
    type: "string",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Corréo",
    field: "emailCliente",
    type: "numeric",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Teléfono",
    field: "telefonoCliente",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Dirección",
    field: "direccionCliente",
    type: "string",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
];

const CustomersTable = (props) => {
  const [data, setData] = useState([]);
  const {
    sede: { baseURL },
    setAlert,
    logout,
  } = useContext(AuthContext);
  const [form, setForm] = useState({
    openForm: false,
    typeForm: "add",
    dataForm: { cedulaCliente: "" },
  });

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
    setAlert((prevState) => ({
      ...prevState,
      openAlert: true,
      severity: "success",
      message: res.data.mensaje,
    }));
  };

  const getData = async () => {
    await customerService
      .getCustomers(baseURL)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const postData = async () => {
    await customerService
      .saveCustomer(baseURL, form.dataForm)
      .then((res) => {
        getData();
        handleOpen();
        handleSuccess(res);
      })
      .catch((err) => {
        handleError(err);
      });
    getData();
  };

  const deleteData = async () => {
    await customerService
      .deleteCustomer(baseURL, form.dataForm.cedulaCliente)
      .then((res) => {
        setData(data.concat(res.data));
        handleOpen();
        handleSuccess(res);
      })
      .catch((err) => {
        handleError(err);
      });
    getData();
  };

  const putData = async () => {
    await customerService
      .updateCustomer(baseURL, form.dataForm.cedulaCliente, form.dataForm)
      .then((res) => {
        getData();
        handleOpen();
        handleSuccess(res);
      })
      .catch((err) => {
        handleError(err);
      });
    getData();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseURL]);

  const handleOpen = (key, rowData) => {
    if (key !== "alert") {
      setForm((prevState) => ({ ...prevState, typeForm: key }));
      if (rowData) {
        const { tableData, ...newRowData } = rowData;
        setForm((prevState) => ({ ...prevState, dataForm: { ...newRowData } }));
      }
      setForm((prevState) => ({ ...prevState, openForm: !form.openForm }));
    } else {
      setAlert((prevState) => ({
        ...prevState,
        openAlert: !alert.openAlert,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOpen();
    if (form.typeForm === "add") {
      postData();
    } else if (form.typeForm === "del") {
      deleteData();
    } else if (form.typeForm === "edit") {
      putData();
    }
  };

  return (
    <>
      <MaterialTable
        title="Clientes"
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
            onClick: (e, rowData) => handleOpen("edit", rowData),
          },
          {
            icon: "delete",
            iconProps: { color: "error" },
            tooltip: "Eliminar registro",
            onClick: (e, rowData) => handleOpen("del", rowData),
          },
          {
            icon: "add_box",
            iconProps: { color: "secondary" },
            tooltip: "Registrar",
            position: "toolbar",
            onClick: () => handleOpen("add", null),
          },
        ]}
      />
      <Modal open={form.openForm} onClose={() => handleOpen()}>
        <Box sx={style} onSubmit={handleSubmit}>
          <CustomersForm
            rowData={form.dataForm}
            variant={form.typeForm}
            data={data}
            setDataForm={setForm}
            handleOpen={handleOpen}
          />
        </Box>
      </Modal>
    </>
  );
};

export default CustomersTable;
