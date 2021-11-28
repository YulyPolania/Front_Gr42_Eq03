import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Stack,
  Alert as MuiAlert,
  Snackbar,
} from "@mui/material";
// import useForm from "../../generic/useForm";
import UsersService from "../../../services/UsersService";
// import { FormComponent } from "./FormValidate";

import UsersForm from "./UsersForm";
import UsersSubmit from "./UsersSubmit";

// import AddBox from "@mui/icons-material/AddBox";
// import ArrowDownward from "@mui/icons-material/ArrowDownward";
// import Check from "@mui/icons-material/Check";
// import ChevronLeft from "@mui/icons-material/ChevronLeft";
// import ChevronRight from "@mui/icons-material/ChevronRight";
// import Clear from "@mui/icons-material/Clear";
// import DeleteOutline from "@mui/icons-material/DeleteOutline";
// import Edit from "@mui/icons-material/Edit";
// import FilterList from "@mui/icons-material/FilterList";
// import FirstPage from "@mui/icons-material/FirstPage";
// import LastPage from "@mui/icons-material/LastPage";
// import Remove from "@mui/icons-material/Remove";
// import SaveAlt from "@mui/icons-material/SaveAlt";
// import Search from "@mui/icons-material/Search";
// import ViewColumn from "@mui/icons-material/ViewColumn";

// const tableIcons = {
//   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
//   Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
//   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
//   DetailPanel: forwardRef((props, ref) => (
//     <ChevronRight {...props} ref={ref} />
//   )),
//   Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
//   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
//   Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
//   FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
//   LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
//   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
//   PreviousPage: forwardRef((props, ref) => (
//     <ChevronLeft {...props} ref={ref} />
//   )),
//   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
//   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
//   SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
//   ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
//   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
// };

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

const UsersTable = (props) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [alert, setAlert] = useState({
    open: false,
    severity: "success",
    message: "Ok!",
  });

  const [columns /*setColumns*/] = useState([
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
  ]);

  const [dataModal, setDataModal] = useState({ data: {}, variant: "" });

  const getData = async () => {
    await UsersService.getUsers().then((res) => {
      setData(res.data);
    });
  };

  const postData = async () => {
    await UsersService.saveUser(dataModal.data).then((res) => {
      getData();
      handleOpen();
      setAlert((prevState) => ({
        ...prevState,
        open: true,
      }));
    }).catch((res)=>{
      setAlert((prevState) => ({
        ...prevState,
        open: true,
      }));
    });
  };

  const deleteData = async () => {
    await UsersService.saveUser(dataModal.data.cedulaUsuario).then((res) => {
      setData(data.concat(res.data));
      handleOpen();
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOpen = (key, rowData) => {
    setType(key);
    rowData
      ? setDataModal({ data: { ...rowData }, variant: key })
      : setDataModal({ data: { ...dataModal.data }, variant: "add" });
    setOpen(!open);
  };

  const localization = {
    body: {
      emptyDataSourceMessage: "No hay registros para mostrar",
      addTooltip: "Agregar",
      deleteTooltip: "Eliminar",
      editTooltip: "Editar",
      filterRow: {
        filterTooltip: "Filtro",
      },
      editRow: {
        deleteText: "¿Desea eliminar esta línea?",
        cancelTooltip: "Cancelar",
        saveTooltip: "Guardar",
      },
    },
    grouping: {
      placeholder: "Extraer encabezado ...",
      groupedBy: "Agrupar por:",
    },
    header: {
      actions: "Acciones",
    },
    pagination: {
      labelDisplayedRows: "{from}-{to} de {count}",
      labelRowsSelect: "",
      labelRowsPerPage: "Filas por página:",
      firstAriaLabel: "Primera página",
      firstTooltip: "Primera página",
      previousAriaLabel: "Página anterior",
      previousTooltip: "Página anterior",
      nextAriaLabel: "Página siguiente",
      nextTooltip: "Página siguiente",
      lastAriaLabel: "Última página",
      lastTooltip: "Última página",
    },
    toolbar: {
      addRemoveColumns: "Agregar o quitar columnas",
      nRowsSelected: "{0} filas seleccionadas",
      showColumnsTitle: "Mostrar columnas",
      showColumnsAriaLabel: "Mostrar columnas",
      exportTitle: "Exportar",
      exportAriaLabel: "Exportar",
      exportName: "Exportar a CSV",
      searchTooltip: "Buscar",
      searchPlaceholder: "Buscar",
    },
  };

  const handleSubmit = (e) => {
    console.log(e.target.name);
    e.preventDefault();
    if (type === "add" || type === "edit") {
      postData();
    } else if (type === "del") {
      console.log("del");
    }
  };

  return (
    <>
      <MaterialTable
        title="Usuarios"
        columns={columns}
        data={data}
        localization={localization}
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
      <Modal open={open} onClose={() => handleOpen()}>
        <Box sx={style} onSubmit={handleSubmit}>
          <UsersForm
            rowData={dataModal.data}
            variant={dataModal.variant}
            data={data}
            setRowData={setDataModal}
            handleOpen={handleOpen}
          />
        </Box>
      </Modal>
      {/* <Modal open={open} onClose={() => handleOpen()}>
        <Box sx={style} onSubmit={() => handleSubmit()}>
          <UsersSubmit
            rowData={dataModal.data}
            variant={dataModal.variant}
            data={data}
            setRowData={setDataModal}
            handleOpen={handleOpen}
          />
        </Box>
      </Modal> */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={alert.open}
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
