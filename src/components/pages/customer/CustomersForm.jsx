import { useEffect } from "react";
import { Grid, Button, Typography, TextField } from "@mui/material";
import useForm from "../../generic/useForm";

const initialValues = {
  cedulaCliente: {
    name: "cedulaCliente",
    value: "",
    label: "Cédula",
    regularExpression: /^(?=.*[1-9])\d{1,15}$/,
    errorMessage: "Solo números, máximo 15 caracteres sin espacios",
    error: false,
    message: "",
    unique: true,
    id: true,
    type: "number",
  },
  nombreCliente: {
    name: "nombreCliente",
    value: "",
    label: "Nombre Completo",
    regularExpression: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    errorMessage: "Entre 3 y 40 caracteres",
    error: false,
    message: "",
    unique: false,
    type: "text",
  },
  emailCliente: {
    name: "emailCliente",
    value: "",
    label: "Correo electrónico",
    regularExpression: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,6}$/,
    errorMessage: "Correo electrónico inválido",
    error: false,
    message: "",
    unique: false,
    type: "email",
  },
  telefonoCliente: {
    name: "telefonoCliente",
    value: "",
    label: "Téléfono",
    regularExpression: /^[a-zA-Z0-9\s_-]{8,40}$/,
    errorMessage:
      "Entre 8 y 40 caracteres sin espacios o caracteres especiales",
    error: false,
    message: "",
    unique: false,
    type: "phone",
  },
  direccionCliente: {
    name: "direccionCliente",
    value: "",
    label: "Dirección",
    regularExpression: /^[a-zA-ZÀ-ÿ0-9!@#$%^&.*\s]{8,100}$/,
    errorMessage:
      "Entre 8 y 100 caracteres sin espacios o caracteres especiales",
    error: false,
    message: "",
    unique: false,
    type: "text",
  },
};

export const CustomesForm = (props) => {
  const {
    variant = "add",
    rowData = null,
    setDataForm = null,
    data = {},
    handleOpen,
  } = props;

  const { fields, setFields, handleChange, submitBtn, handleSubmit, validate } =
    useForm(initialValues, data, variant);

  const handleDataChange = (e) => {
    handleChange(e);
    setDataRow(e);
  };

  const handleSent = () => {
    handleSubmit();
  };

  const getDataRow = () => {
    if (rowData) {
      for (let element in rowData) {
        setFields((prevState) => ({
          ...prevState,
          [element]: { ...prevState[element], value: rowData[element] },
        }));
      }
    }
  };

  const setDataRow = (e) => {
    if (setDataForm) {
      setDataForm((prevState) => ({
        ...prevState,
        dataForm: { ...prevState.dataForm, [e.target.name]: e.target.value },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <TextField
            disabled={variant === "add" ? false : true}
            error={fields.cedulaCliente.error}
            helperText={fields.cedulaCliente.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.cedulaCliente.label}
            name={fields.cedulaCliente.name}
            value={fields.cedulaCliente.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.cedulaCliente.name}
            required
            type={fields.cedulaCliente.type}
          />
          <TextField
            disabled={variant === "del" ? true : false}
            error={fields.nombreCliente.error}
            helperText={fields.nombreCliente.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.nombreCliente.label}
            name={fields.nombreCliente.name}
            value={fields.nombreCliente.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.nombreCliente.name}
            required
            type={fields.nombreCliente.type}
          />
          <TextField
            disabled={variant === "del" ? true : false}
            error={fields.emailCliente.error}
            helperText={fields.emailCliente.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.emailCliente.label}
            name={fields.emailCliente.name}
            value={fields.emailCliente.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.emailCliente.name}
            required
            type={fields.emailCliente.type}
          />
        </Grid>
        <Grid item md={6} xs={12} align="center">
          <TextField
            disabled={variant === "del" ? true : false}
            error={fields.direccionCliente.error}
            helperText={fields.direccionCliente.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.direccionCliente.label}
            name={fields.direccionCliente.name}
            value={fields.direccionCliente.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.direccionCliente.name}
            required
            type={fields.direccionCliente.type}
          />
          <TextField
            disabled={variant === "del" ? true : false}
            error={fields.telefonoCliente.error}
            helperText={fields.telefonoCliente.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.telefonoCliente.label}
            name={fields.telefonoCliente.name}
            value={fields.telefonoCliente.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.telefonoCliente.name}
            required
            type={fields.telefonoCliente.type}
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

export default CustomesForm;
