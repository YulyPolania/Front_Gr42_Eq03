import { useEffect, useState, useContext } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  Autocomplete,
} from "@mui/material";
import useForm from "../../generic/useForm";
import supplierService from "../../../services/supplierService";
import { AuthContext } from "../../../auth/AuthContext";

const initialValues = {
  codigoProducto: {
    name: "codigoProducto",
    value: "",
    label: "Código",
    regularExpression: /^(?=.*[1-9])\d{1,20}$/,
    errorMessage: "Solo números, máximo 20 caracteres sin espacios",
    error: false,
    message: "",
    unique: true,
    id: true,
    type: "number",
  },
  nombreProducto: {
    name: "nombreProducto",
    value: "",
    label: "Nombre Completo",
    regularExpression: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    errorMessage: "Entre 3 y 40 caracteres",
    error: false,
    message: "",
    type: "text",
  },
  nitProveedor: {
    name: "nitProveedor",
    value: "",
    label: "Nit Proveedor",
    regularExpression: /^(?=.*[1-9])\d{1,20}$/,
    errorMessage: "Solo números, máximo 20 caracteres sin espacios",
    error: false,
    message: "",
    type: "number",
  },
  precioCompra: {
    name: "precioCompra",
    value: "",
    label: "Precio de Compra",
    regularExpression: /^(?=.*[1-9])\d{1,12}(\.\d{0,4}){0,1}$/,
    errorMessage:
      " Sólo puede ser un decimal (.) o entero de máximo 12 caracteres y 4 decimales",
    error: false,
    message: "",
    type: "number",
  },
  precioVenta: {
    name: "precioVenta",
    value: "",
    label: "Precio de Venta",
    regularExpression: /^(?=.*[1-9])\d{1,12}(\.\d{0,4}){0,1}$/,
    errorMessage:
      " Sólo puede ser un decimal (.) o entero de máximo 12 caracteres y 4 decimales",
    error: false,
    message: "",
    type: "number",
  },
  ivaCompra: {
    name: "ivaCompra",
    value: "",
    label: "Iva Compra",
    regularExpression: /^(?=.*[1-9])\d{1,12}(\.\d{0,4}){0,1}$/,
    errorMessage:
      " Sólo puede ser un decimal (.) o entero de máximo 12 caracteres y 4 decimales",
    error: false,
    message: "",
    type: "number",
  },
};

export const ProductsForm = (props) => {
  const {
    variant = "add",
    rowData = null,
    setDataForm = null,
    data = {},
    handleOpen,
  } = props;

  const { fields, setFields, handleChange, submitBtn, handleSubmit, validate } =
    useForm(initialValues, data, variant);

  const {
    setAlert,
    logout,
    sede: { baseURL },
  } = useContext(AuthContext);

  const [suppliers, setSuppliers] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleDataChange = (e) => {
    handleChange(e);
    setDataRow(e);
  };

  const handleSelected = (value) => {
    setSelected(value);
    setFields((prevState) => ({
      ...prevState,
      nitProveedor: { ...prevState.nitProveedor, value: value.nitProveedor },
    }));
  };

  const items = [];

  for (const i in fields) {
    if (i !== "nitProveedor" && i !== "codigoProducto") {
      const { error, message, label, name, value, type } = fields[i];
      items.push(
        <Grid item md={6} xs={12} align="center" key={i}>
          <TextField
            disabled={variant === "del" ? true : false}
            error={error}
            helperText={message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            required
            type={type}
          />
        </Grid>
      );
    }
  }

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

  const getData = async () => {
    await supplierService
      .getSuppliers(baseURL)
      .then((res) => {
        setSuppliers(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  useEffect(()=>{
    setSelected(suppliers[0])
    setSelected(null)
  },[suppliers])

  useEffect(() => {
    getData();
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
        Producto
      </Typography>
      <Grid container>
        <Grid item md={6} xs={12} align="center">
          <TextField
            disabled={variant === "add" ? false : true}
            error={fields.codigoProducto.error}
            helperText={fields.codigoProducto.message}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={fields.codigoProducto.label}
            name={fields.codigoProducto.name}
            value={fields.codigoProducto.value}
            onChange={handleDataChange}
            onKeyUp={validate}
            onBlur={validate}
            key={fields.codigoProducto.name}
            required
            type={fields.codigoProducto.type}
          />
        </Grid>
        {items}
        <Grid item md={6} xs={12} align="center">
          <Autocomplete
            sx={{ width: "90%", m: 1 }}
            value={selected}
            onChange={(event, value) => handleSelected(value)}
            disabled={variant === "del" ? true : false}
            fullWidth
            options={suppliers}
            getOptionLabel={(option) => `${option?.nitProveedor}`}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Nit del proveedor"
                fullWidth
              />
            )}
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

export default ProductsForm;
