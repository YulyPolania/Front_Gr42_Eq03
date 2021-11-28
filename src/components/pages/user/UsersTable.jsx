import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import { Modal, Box, Stack, Alert as MuiAlert, Snackbar } from "@mui/material";
import UsersService from "../../../services/UsersService";
import UsersForm from "./UsersForm";
import Localization from "../../generic/Localization";

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
  const [form, setForm] = useState({
    openForm: false,
    typeForm: "a",
    dataForm: {},
  });
  const [alert, setAlert] = useState({
    openAlert: false,
    severity: "success",
    message: "",
  });

  const getData = async () => {
    await UsersService.getUsers().then((res) => {
      setData(res.data);
    });
  };

  const postData = async () => {
    await UsersService.saveUser(form.dataForm)
      .then((res) => {
        getData();
        handleOpen();
        setAlert((prevState) => ({
          ...prevState,
          open: true,
        }));
      })
      .catch((res) => {
        setAlert((prevState) => ({
          ...prevState,
          open: true,
        }));
      });
  };

  // const deleteData = async () => {
  //   // await UsersService.saveUser(form.dataForm.cedulaUsuario).then((res) => {
  //   //   setData(data.concat(res.data));
  //   //   handleOpen();
  //   // });
  // };

  useEffect(() => {
    getData();
  }, []);

  const handleOpen = (key, rowData) => {
    setForm((prevState) => ({ ...prevState, typeForm: key }));
    if (rowData) {
      const { tableData, ...newRowData } = rowData;
      setForm((prevState) => ({ ...prevState, dataForm: { ...newRowData } }));
    }
    setForm((prevState) => ({ ...prevState, openForm: !form.openForm }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.typeForm === "add" || form.typeForm === "edit") {
      postData();
    } else if (form.typeForm === "del") {
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
          onClose={handleOpen}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleOpen}
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
