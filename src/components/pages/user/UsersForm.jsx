import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  TextField,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import useForm from "../../generic/useForm";

const initialValues = {
  cedulaUsuario: {
    name: "cedulaUsuario",
    value: "",
    label: "Cédula",
    regularExpression: /^(?=.*[1-9])\d{1,20}$/,
    errorMessage: "Solo números, máximo 20 caracteres sin espacios",
    error: false,
    message: "",
    unique: true,
    id: true,
    type: "number",
  },
  nombreUsuario: {
    name: "nombreUsuario",
    value: "",
    label: "Nombre Completo",
    regularExpression: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    errorMessage: "Entre 3 y 40 caracteres",
    error: false,
    message: "",
    unique: false,
    type: "text",
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
    type: "email",
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
    type: "username",
  },
  password: {
    name: "password",
    value: "",
    label: "Contraseña",
    regularExpression: /^[a-zA-Z0-9!@#$%^&.*]{4,100}$/,
    errorMessage:
      "Entre 8 y 100 caracteres sin espacios o caracteres especiales",
    error: false,
    message: "",
    unique: false,
    type: "password",
  },
};

const auth = {
  Roles: [
    { name: "superadmin", value: 1, label: "Super Admin", selected: true },
    { name: "admin", value: 2, label: "Admin", selected: false },
    { name: "manager", value: 3, label: "Manager", selected: false },
    { name: "user", value: 4, label: "Usuario", selected: false },
  ],
  Sedes: [
    { name: "bogota", value: 1, label: "Bogotá", selected: true },
    { name: "medellin", value: 2, label: "Medellín", selected: false },
    { name: "cali", value: 3, label: "Cali", selected: false },
  ],
};

export const UsersForm = (props) => {
  const {
    variant = "add",
    rowData = null,
    setDataForm = null,
    data = {},
    handleOpen,
    permisos = [],
  } = props;

  const {
    fields,
    setFields,
    handleChange,
    submitBtn,
    setSubmitBtn,
    handleSubmit,
    validate,
  } = useForm(initialValues, data, variant);

  const [swicth, setSwitch] = useState(true);
  const [checkAuth] = useState(auth);
  const [authData, setAuthData] = useState({
    Sedes: [],
    Roles: [],
    validate: { error: false, message: "" },
  });

  const getValue = (e) => {
    setSwitch(!swicth);
  };

  const handleDataChange = (e) => {
    handleChange(e);
    setDataRow(e);
  };

  const handleSent = () => {
    setPermisos();
    handleSubmit();
    handleValidate();
  };

  const handleClean = () => {
    setFields(initialValues);
    setAuthData({
      Sedes: [],
      Roles: [],
      validate: { error: false, message: "" },
    });
  };

  const handleSelected = (value, key) => {
    setAuthData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleValidate = () => {
    if (authData.Roles.length === 0 || authData.Sedes.length === 0) {
      setAuthData((prevState) => ({
        ...prevState,
        validate: { error: true, message: "Debe seleccionar al menos uno" },
      }));
      setSubmitBtn(true);
    } else {
      setAuthData((prevState) => ({
        ...prevState,
        validate: { error: false, message: "" },
      }));
      setSubmitBtn(false);
    }
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
      setPermisos();
    }
  };

  const setPermisos = ()=>{
    if (setDataForm) {
      let rolesXsedes = [];
      authData.Roles.forEach((i) => {
        authData.Sedes.forEach((j) => {
          const valor = {
            idRol: i.value,
            idSede: j.value,
            cedulaUsuario: fields.cedulaUsuario.value,
          };
          rolesXsedes.push(valor);
        });
      });
      setDataForm((prevState) => ({
        ...prevState,
        dataAllow: rolesXsedes,
      }));
  }
}

  const getPermios = (e) => {
    if (permisos.length > 0) {
      const newArrayRoles = auth.Roles.filter(
        (i) => i.value === permisos.find((q) => q.idRol === i.value)?.idRol
      );
      const newArraySedes = auth.Sedes.filter(
        (i) => i.value === permisos.find((q) => q.idSede === i.value)?.idSede
      );
      setAuthData((prevState) => ({
        ...prevState,
        Roles: newArrayRoles,
        Sedes: newArraySedes,
      }));
    }
  };

  const generic = [];
  const authFields = [];
  for (const i in fields) {
    if (i !== "cedulaUsuario" && i !== "password") {
      const { error, message, label, name, value, type } = fields[i];
      generic.push(
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

  for (const i in auth) {
    authFields.push(
      <Grid item md={6} xs={12} align="center" key={i}>
        <Autocomplete
          onChange={(event, value) => handleSelected(value, i)}
          value={authData[i]}
          onClick={handleValidate}
          onBlur={handleValidate}
          onInputChange={handleValidate}
          sx={{ m: 1, width: "90%" }}
          disabled={
            variant === "del" ? true : variant === "add" ? false : swicth
          }
          multiple
          id={i}
          options={checkAuth[i]}
          disableCloseOnSelect
          getOptionLabel={(option) => option.label}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              error={authData.validate.error}
              helperText={authData.validate.message}
              label={i}
              placeholder="Seleccione una o varias opcionnes"
              onClick={handleValidate}
            />
          )}
        />
      </Grid>
    );
  }

  useEffect(() => {
    getDataRow();
    getPermios();
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
            required
            type={fields.cedulaUsuario.type}
          />
        </Grid>
        {generic}
        {variant === "edit" && (
          <Grid item md={6} xs={12} align="center">
            <FormControlLabel
              control={<Switch onChange={getValue} />}
              label="Cambiar permisos y contraseña"
            />
          </Grid>
        )}
        {authFields}
        <Grid item md={6} xs={12} align="center">
          <TextField
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
            required
            type={fields.password.type}
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
        {variant === "add" && (
          <Button
            variant="contained"
            color="secondary"
            sx={{ mx: 3 }}
            onClick={handleClean}
          >
            LIMPIAR
          </Button>
        )}
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
