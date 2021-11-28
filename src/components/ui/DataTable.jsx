import MaterialTable from "@material-table/core";
import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";

import UsersService from "../../services/UsersService";
import { FormComponent } from "./FormValidate";

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

export const DataTable = (props) => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState({
    add: false,
    edit: false,
    del: false,
    import: false,
  });
  const [columns /*setColumns*/] = useState([
    {
      title: "Id",
      field: "id",
      type: "numeric",
      width: "auto",
      regularExpression: /^\d{1,20}$/,
      errorMessage: "Solo números máximo 20 caracteres",

    },
    {
      title: "Nombre",
      field: "name",
      width: "auto",
      regularExpression: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
      errorMessage: "Solo Letras, se permiten acentos, máximo 40 caracteres",
    },
    {
      title: "Usuario",
      field: "username",
      width: "auto",
      regularExpression: /^[a-zA-Z0-9_-]{4,20}$/,
      errorMessage: "Solo Letras, numeros, guion y guion_bajo, sin espacios, caracteres mínimo 4 máximo 20",
    },
    {
      title: "Teléfono",
      field: "phone",
      type: "numeric",
      width: "auto",
      regularExpression: /^\d{7,20}$/,
      errorMessage: "Sólo números, máximo 20 digitos",
    },
    {
      title: "Correo",
      field: "email",
      width: "auto",
      regularExpression: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      errorMessage: "Correo electrónico inválido",
    },
    {
      title: "Direccion",
      field: "website",
      width: "auto",
      regularExpression: /^.{1,40}$/,
      errorMessage: "Máximo 40 caracteres",
    },
  ]);

  const [fields, setFields] = useState(
    Object.fromEntries(columns.map(({ field }) => [field, ""]))
  );

  const [input, setInput] = useState(
    columns.map(({ title, field, regularExpression, errorMessage }) => ({
      label: title,
      name: field,
      regularExpression: regularExpression,
      errorMessage:errorMessage,
    }))
  );

  const getData = async () => {
    await UsersService.getUsers().then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOpen = (key, rowData) => {
    rowData ? setFields({ ...rowData }) : console.log("any");
    setOpen((prevState) => ({ ...prevState, [key]: !open[key] }));
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

  return (
    <>
      <MaterialTable
        title="Usuarios"
        columns={columns}
        data={data}
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
        localization={localization}
      />
      <Modal open={open.add} onClose={() => handleOpen("add", null)}>
        <>
          <FormComponent
            fields={fields}
            setFields={setFields}
            title={"Agregar"}
            inputs={input}
            handleOpen={() => handleOpen("add", null)}
            data={data}
            setData={setData}
          />
        </>
      </Modal>
      <Modal open={open.edit} onClose={() => handleOpen("edit", null)}>
        <>
          <FormComponent
            fields={fields}
            setFields={setFields}
            disable={"id"}
            title={"Editar"}
            inputs={input}
            handleOpen={() => handleOpen("edit", null)}
            data={data}
            setData={setData}
          />
        </>
      </Modal>
      <Modal open={open.del} onClose={() => handleOpen("del", null)}>
        <>
          <FormComponent
            fields={fields}
            setFields={setFields}
            disable={"all"}
            title={"Eliminar"}
            inputs={input}
            handleOpen={() => handleOpen("del", null)}
            data={data}
            setData={setData}
          />
        </>
      </Modal>
    </>
  );
};
