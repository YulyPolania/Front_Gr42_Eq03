import MaterialTable from "@material-table/core";
import React, { useEffect, useState, useContext } from "react";
import { Modal, Box, Stack, Alert as MuiAlert, Snackbar } from "@mui/material";
import userService from "../../../services/userService";
import UsersForm from "./UsersForm";
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
    field: "cedulaUsuario",
    type: "numeric",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Nombre",
    field: "nombreUsuario",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Usuario",
    field: "username",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Corréo",
    field: "emailUsuario",
    type: "numeric",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Contraseña",
    field: "password",
    width: "auto",
    hidden: true,
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Usuario",
    field: "username",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
];

const UsersTable = (props) => {
  const [data, setData] = useState([]);
  const { logout } = useContext(AuthContext);
  const [form, setForm] = useState({
    openForm: false,
    typeForm: "add",
    dataForm: { cedulaUsuario: "" },
  });
  const [alert, setAlert] = useState({
    openAlert: false,
    severity: "success",
    message: "",
  });

  const handleError = (err) => {
    switch (err.response?.status) {
      case 401:
        logout();
        break;
      case 403:
        setAlert((prevState) => ({
          ...prevState,
          openAlert: true,
          severity: "warning",
          message:
            "Acceso denegado, no tiene permisos para realizar esta acción!",
        }));
        break;
      case 400 || 404:
        setAlert((prevState) => ({
          ...prevState,
          openAlert: true,
          severity: "error",
          message: err.response.data.mensaje,
        }));
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
    await userService
      .getUsers()
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const postData = async () => {
    await userService
      .saveUser(form.dataForm)
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
    await userService
      .deleteUser(form.dataForm.cedulaUsuario)
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
    await userService
      .updateUser(form.dataForm.cedulaUsuario, form.dataForm)
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
  }, []);

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
        title="Usuarios"
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
            tooltip: "my tooltip",
            position: "toolbar",
            onClick: () => handleOpen("add", null),
          },
        ]}
      />
      <Modal open={form.openForm} onClose={() => handleOpen()}>
        <Box sx={style} onSubmit={handleSubmit}>
          <UsersForm
            rowData={form.dataForm}
            variant={form.typeForm}
            data={data}
            setDataForm={setForm}
            handleOpen={handleOpen}
          />
        </Box>
      </Modal>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={alert.openAlert}
          autoHideDuration={6000}
          onClose={() => handleOpen("alert", null)}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => handleOpen("alert", null)}
            severity={alert.severity}
            sx={{ width: "100%" }}
          >
            {alert.message}
          </MuiAlert>
        </Snackbar>
      </Stack>
    </>
  );
};

export default UsersTable;
