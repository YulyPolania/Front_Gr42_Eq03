import { useEffect } from "react";
import { Grid, Button, Typography, TextField } from "@mui/material";
import useForm from "../../generic/useForm";

const initialValues = {
  nitProveedor: {
    name: "nitProveedor",
    value: "",
    label: "NIT",
    regularExpression: /^(?=.*[1-9])\d{1,20}$/,
    errorMessage: "Solo números, máximo 20 caracteres sin espacios",
    error: false,
    message: "",
    unique: true,
    id: true,
    type: "number",
  },
  nombreProveedor: {
    name: "nombreProveedor",
    value: "",
    label: "Nombre Completo",
    regularExpression: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    errorMessage: "Entre 3 y 40 caracteres",
    error: false,
    message: "",
    unique: false,
    type: "text",
  },
  direccionProveedor: {
    name: "direccionProveedor",
    value: "",
    label: "Dirección",
    regularExpression: /^[a-zA-ZÀ-ÿ0-9!@#$%^&.*\s]{8,100}$/,
    errorMessage: "Dirección inválida",
    error: false,
    message: "",
    unique: false,
    type: "text",
  },
  telefonoProveedor: {
    name: "telefonoProveedor",
    value: "",
    label: "Teléfono",
    regularExpression: /^[0-9!@#$%^&.*\s]{8,40}$/,
    errorMessage:
      "Entre 8 y 40 caracteres sin espacios o caracteres especiales",
    error: false,
    message: "",
    unique: false,
    type: "phone",
  },
  ciudadProveedor: {
    name: "ciudadProveedor",
    value: "",
    label: "Ciudad",
    regularExpression: /^[a-zA-Za-zÀ-ÿ_-\s]{4,40}$/,
    errorMessage: "Entre 4 y 40.",
    error: false,
    message: "",
    unique: true,
    type: "text",
  },
};

export const SuppliersForm = (props) => {
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
        Proveedor
      </Typography>
      <Grid container>
        <Grid item md={6} xs={12} align="center">
          <TextField
            disabled={variant === "add" ? false : true}
            error={fields.nitProveedor.error}
            helperText={fields.nitProveedor.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.nitProveedor.label}
            name={fields.nitProveedor.name}
            value={fields.nitProveedor.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.nitProveedor.name}
            required
            type={fields.nitProveedor.type}
          />
          <TextField
            disabled={variant === "del" ? true : false}
            error={fields.nombreProveedor.error}
            helperText={fields.nombreProveedor.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.nombreProveedor.label}
            name={fields.nombreProveedor.name}
            value={fields.nombreProveedor.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.nombreProveedor.name}
            required
            type={fields.nombreProveedor.type}
          />
          <TextField
            disabled={variant === "del" ? true : false}
            error={fields.direccionProveedor.error}
            helperText={fields.direccionProveedor.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.direccionProveedor.label}
            name={fields.direccionProveedor.name}
            value={fields.direccionProveedor.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.direccionProveedor.name}
            required
            type={fields.direccionProveedor.type}
          />
        </Grid>
        <Grid item md={6} xs={12} align="center">
          <TextField
            disabled={variant === "del" ? true : false}
            error={fields.ciudadProveedor.error}
            helperText={fields.ciudadProveedor.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.ciudadProveedor.label}
            name={fields.ciudadProveedor.name}
            value={fields.ciudadProveedor.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.ciudadProveedor.name}
            required
            type={fields.ciudadProveedor.type}
          />
          <TextField
            disabled={variant === "del" ? true : false}
            error={fields.telefonoProveedor.error}
            helperText={fields.telefonoProveedor.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.telefonoProveedor.label}
            name={fields.telefonoProveedor.name}
            value={fields.telefonoProveedor.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.telefonoProveedor.name}
            required
            type={fields.telefonoProveedor.type}
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

export default SuppliersForm;
