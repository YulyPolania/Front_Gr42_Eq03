import MaterialTable from "@material-table/core";
import { useEffect, useState, useContext } from "react";
import { Modal, Box } from "@mui/material";
import suplierService from "../../../services/supplierService";
import SupliersForm from "./SuppliersForm";
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
    title: "NIT",
    field: "nitProveedor",
    type: "numeric",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Nombre",
    field: "nombreProveedor",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Dirección",
    field: "direccionProveedor",
    type: "numeric",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Ciudad",
    field: "ciudadProveedor",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Teléfono",
    field: "telefonoProveedor",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
];

const SupliersTable = (props) => {
  const [data, setData] = useState([]);
  const {
    sede: { baseURL },
    setAlert,
    logout,
    user: { authorities },
  } = useContext(AuthContext);
  const [form, setForm] = useState({
    openForm: false,
    typeForm: "add",
    dataForm: { nitProveedor: "" },
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
    getData();
    handleOpen();
    setAlert((prevState) => ({
      ...prevState,
      openAlert: true,
      severity: "success",
      message: res.data.mensaje,
    }));
  };

  const getData = async () => {
    await suplierService
      .getSuppliers(baseURL)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const postData = async () => {
    await suplierService
      .saveSupplier(baseURL, form.dataForm)
      .then((res) => {
        handleSuccess(res);
      })
      .catch((err) => {
        handleError(err);
      });
    getData();
  };

  const deleteData = async () => {
    await suplierService
      .deleteSupplier(baseURL, form.dataForm.nitProveedor)
      .then((res) => {
        handleSuccess(res);
      })
      .catch((err) => {
        handleError(err);
      });
    getData();
  };

  const putData = async () => {
    await suplierService
      .updateSupplier(baseURL, form.dataForm.nitProveedor, form.dataForm)
      .then((res) => {
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

  const actions = authorities?.some(
    (x) => x === "ROLE_MANAGER" || x === "ROLE_ADMIN" || x === "ROLE_SUPERADMIN"
  )
    ? [
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
      ]
    : [];

  return (
    <>
      <MaterialTable
        title="Proveedores"
        columns={columns}
        data={data}
        localization={Localization}
        options={{
          actionsColumnIndex: -1,
        }}
        actions={actions}
      />
      <Modal open={form.openForm} onClose={() => handleOpen()}>
        <Box sx={style} onSubmit={handleSubmit}>
          <SupliersForm
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

export default SupliersTable;
