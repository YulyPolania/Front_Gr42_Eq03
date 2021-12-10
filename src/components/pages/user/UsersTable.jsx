import MaterialTable from "@material-table/core";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Box } from "@mui/material";
import userService from "../../../services/userService";
import permisoService from "../../../services/permisoService";
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
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const { setAlert, logout } = useContext(AuthContext);
  const [form, setForm] = useState({
    openForm: false,
    typeForm: "add",
    dataForm: { cedulaUsuario: "" },
    dataAllow: [],
  });
  const baseURL = "http://localhost:3001/";

  const handleError = (err) => {
    switch (err.response?.status) {
      case 401:
        setAlert({
          openAlert: true,
          severity: "warning",
          message: "La sesión ha expirado, por favor inicie sesión nuevamente!",
        });
        logout();
        break;
      case 403:
        setAlert({
          openAlert: true,
          severity: "warning",
          message:
            "Acceso denegado, no tiene permisos para realizar esta acción!",
        });
        navigate("/");
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
    await userService
      .getUsers(baseURL)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
    await permisoService
      .getPermisos(baseURL)
      .then((res) => {
        setPermisos(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const postData = async () => {
    await userService
      .saveUser(baseURL, form.dataForm)
      .then((res1) => {
        permisoService
          .savePermisosList(baseURL, form.dataAllow)
          .then((res) => {
            handleSuccess(res1);
          })
          .catch((err) => {
            handleError(err);
          });
      })
      .catch((err) => {
        handleError(err);
      });
    getData();
  };

  const deleteData = async () => {
    await userService
      .deleteUser(baseURL, form.dataForm.cedulaUsuario)
      .then((res1) => {
        permisoService
          .deletePermisosByCedulaUsuario(baseURL, form.dataForm.cedulaUsuario)
          .then((res) => {
            handleSuccess(res1);
          })
          .catch((err) => {
            handleError(err);
          });
      })
      .catch((err) => {
        handleError(err);
      });
    getData();
  };

  const putData = async () => {
    await userService
      .updateUser(baseURL, form.dataForm.cedulaUsuario, form.dataForm)
      .then((res1) => {
        permisoService
          .deletePermisosByCedulaUsuario(baseURL, form.dataForm.cedulaUsuario)
          .then((res) => {
            permisoService
              .savePermisosList(baseURL,form.dataAllow)
              .then((res) => {
                handleSuccess(res1);
              })
              .catch((err) => {
                handleError(err);
              });
          })
          .catch((err) => {
            handleError(err);
          });
      })
      .catch((err) => {
        handleError(err);
      });
    getData();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOpen = (key, rowData) => {
    setForm((prevState) => ({ ...prevState, typeForm: key }));
    if (rowData) {
      const { tableData, ...newRowData } = rowData;
      setForm((prevState) => ({ ...prevState, dataForm: { ...newRowData } }));
      setForm((prevState) => ({
        ...prevState,
        dataAllow: permisos.filter(
          (i) => i.cedulaUsuario === rowData.cedulaUsuario
        ),
      }));
    }
    setForm((prevState) => ({ ...prevState, openForm: !form.openForm }));
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
            tooltip: "Registrar",
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
            permisos={form.dataAllow}
          />
        </Box>
      </Modal>
    </>
  );
};

export default UsersTable;
