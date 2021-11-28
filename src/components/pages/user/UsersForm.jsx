import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import Controls from "../../controls/Controls";
import useForm from "../../generic/useForm";

const initialValues = {
  cedulaUsuario: {
    name: "cedulaUsuario",
    value: "",
    label: "Cédula",
    regularExpression: /^\d{1,20}$/,
    errorMessage: "Solo números, máximo 20 caracteres sin espacios",
    error: false,
    message: "",
    unique: true,
    id: true,
  },
  nombreUsuario: {
    name: "nombreUsuario",
    value: "",
    label: "Nombre Completo",
    regularExpression: /^[a-zA-ZÀ-ÿ\s]{8,40}$/,
    errorMessage: "Entre 8 y 40 caracteres",
    error: false,
    message: "",
    unique: false,
  },
  emailUsuario: {
    name: "emailUsuario",
    value: "",
    label: "Correo electrónico",
    regularExpression: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    errorMessage: "Correo electrónico inválido",
    error: false,
    message: "",
    unique: false,
  },
  password: {
    name: "password",
    value: "",
    label: "Contraseña",
    regularExpression: /^[a-zA-Z0-9!@#$%^&.*]{8,100}$/,
    errorMessage:
      "Entre 8 y 100 caracteres sin espacios o caracteres especiales",
    error: false,
    message: "",
    unique: false,
  },
  username: {
    name: "username",
    value: "",
    label: "Nombre de Usuario",
    regularExpression: /^[a-zA-Z0-9_-]{4,20}$/,
    errorMessage: "Entre 4 y 20 caracteres sin espacios.",
    error: false,
    message: "",
    unique: true,
  },
};

export const UsersForm = (props) => {
  const {
    variant = "add",
    rowData = null,
    setRowData = null,
    data = {},
    handleOpen,
  } = props;
  const { fields, setFields, handleChange, submitBtn, handleSubmit, validate } =
    useForm(initialValues, data, variant);

  const [swicth, setSwitch] = useState(true);

  const getValue = (e) => {
    setSwitch(!swicth);
  };

  const handleDataChange = (e) => {
    handleChange(e);
    setDataRow(e);
  };

  const handleSent = () => {
    variant === "add" ? handleSubmit() : console.log("noAdd");
  };

  const getDataRow = () => {
    if (rowData) {
      for (let element in rowData) {
        if (element !== "tableData") {
          setFields((prevState) => ({
            ...prevState,
            [element]: { ...prevState[element], value: rowData[element] },
          }));
        }
      }
    }
  };

  const setDataRow = (e) => {
    if (setRowData) {
      for (let element in fields) {
        setRowData((prevState) => ({
          ...prevState,
          data: { ...prevState.data, [element]: fields[element].value },
        }));
      }
      setRowData((prevState) => ({
        ...prevState,
        data: { ...prevState.data, [e.target.name]: e.target.value },
      }));
    }
  };

  useEffect(() => {
    getDataRow();
    for (let element in fields) {
      if (fields[element].unique && variant === "add" && rowData) {
        if (
          data.some(
            ({ [element]: a }) => String(a) === String(rowData[element])
          )
        ) {
          console.log(fields[element].id);
          setFields((prevState) => ({
            ...prevState,
            [element]: {
              ...prevState[element],
              error: true,
              message: "Valor ya existe en la base de datos",
            },
          }));
        }
      }
    }
  }, []);

  return (
    <form>
      <Typography variant="h5" align="center" component="div" sx={{ p: 2 }}>
        {variant === "edit"
          ? "Editar "
          : variant === "del"
          ? "Eliminar "
          : "Agregar "}
        Usuario
      </Typography>
      <Grid container>
        <Grid item md={6} xs={12} align="center">
          <Controls.Input
            disabled={variant === "add" ? false : true}
            error={fields.cedulaUsuario.error}
            helperText={fields.cedulaUsuario.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.cedulaUsuario.label}
            name={fields.cedulaUsuario.name}
            value={fields.cedulaUsuario.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.cedulaUsuario.name}
          />
          <Controls.Input
            disabled={variant === "del" ? true : false}
            error={fields.nombreUsuario.error}
            helperText={fields.nombreUsuario.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.nombreUsuario.label}
            name={fields.nombreUsuario.name}
            value={fields.nombreUsuario.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.nombreUsuario.name}
          />
          <Controls.Input
            disabled={variant === "del" ? true : false}
            error={fields.emailUsuario.error}
            helperText={fields.emailUsuario.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.emailUsuario.label}
            name={fields.emailUsuario.name}
            value={fields.emailUsuario.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.emailUsuario.name}
          />
        </Grid>
        <Grid item md={6} xs={12} align="center">
          <Controls.Input
            disabled={variant === "del" ? true : false}
            error={fields.username.error}
            helperText={fields.username.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.username.label}
            name={fields.username.name}
            value={fields.username.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.username.name}
          />
          <FormControlLabel
            style={{ display: variant === "edit" ? "block" : "none" }}
            control={<Switch onChange={getValue} />}
            label="Cambiar contraseña"
          />
          <Controls.Input
            disabled={
              variant === "del" ? true : variant === "add" ? false : swicth
            }
            error={fields.password.error}
            helperText={fields.password.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.password.label}
            name={fields.password.name}
            value={fields.password.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.password.name}
          />
        </Grid>
      </Grid>
      <div align="center" style={{ padding: 6 }}>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{ mx: 3 }}
          disabled={variant === "del" ? false : submitBtn}
          onClick={handleSent}
        >
          ACEPTAR
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ mx: 3 }}
          onClick={handleOpen}
        >
          CANCELAR
        </Button>
      </div>
    </form>
  );
};

export default UsersForm;
