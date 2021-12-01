import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import bg from "../../assets/img/bgLogin.jpg";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import loginService from "../../services/loginService";

const lastPath = localStorage.getItem("lastPath") || "/";

const initialLogin = {
  username: {
    name: "username",
    value: "",
    label: "Usuario",
    error: false,
    regularExpression: /^[a-zA-Z0-9_-]{1,20}$/,
    message: "",
    errorMessage: "Hasta 20 caracteres sin espacios.",
  },
  password: {
    name: "password",
    value: "",
    label: "Contraseña",
    regularExpression: /^[a-zA-Z0-9!@#$%^&.*]{1,20}$/,
    message: "",
    errorMessage: "Hasta 20 caracteres sin espacios o caracteres especiales",
    error: false,
  },
};

export const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState(initialLogin);
  const [submitBtn, setSubmitBtn] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginService
      .login(login.username.value, login.password.value)
      .then((res) => {
        let accesToken = res.data.access_token;
        let refreshToken = res.data.refresh_token;
        let { nombreCompleto, sedes, permisos, authorities, exp } = JSON.parse(
          atob(res.data.access_token.split(".")[1])
        );
        dispatch({
          type: types.login,
          payload: {
            name: nombreCompleto,
            permisos: permisos,
            sedes: sedes,
            accessToken: accesToken,
            refreshToken: refreshToken,
            authorities: authorities,
            exp: exp,
          },
        });
        navigate(lastPath);
      })
      .catch((err) => {
        alert("Usuario no existe");
        console.log(JSON.stringify(err.response.status));
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], value: value },
    }));
    setSubmitBtn(false);
  };

  const handleSubmit = () => {
    if (login.username.error || login.password.error) {
      setSubmitBtn(true);
    }
  };

  const validate = (e) => {
    const { name, value } = e.target;
    let re = login[name].regularExpression;
    let em = login[name].errorMessage;
    if (!re.test(String(value))) {
      setLogin((prevState) => ({
        ...prevState,
        [name]: { ...prevState[name], error: true, message: em },
      }));
      setSubmitBtn(true);
    } else {
      setLogin((prevState) => ({
        ...prevState,
        [name]: { ...prevState[name], error: false, message: "" },
      }));
      setSubmitBtn(false);
    }
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid container component="main" sx={{ height: "95%", width: "90%" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6.5}
          component={Paper}
          elevation={12}
          sx={{
            backgroundImage: `url(${bg})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "dark"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderTopLeftRadius: 16,
            borderBottomLeftRadius: 16,
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5.5}
          component={Paper}
          elevation={12}
          square
          sx={{
            borderTopRightRadius: 16,
            borderBottomRightRadius: 16,
          }}
        >
          <Box
            sx={{
              my: "10%",
              mx: "10%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              sx={{
                width: 60,
                height: 60,
                m: "1%",
                bgcolor: "secondary.main",
              }}
            >
              <LockOutlinedIcon sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography
              component="h6"
              variant="h6"
              sx={{ m: "1%", my: "1%", color: "secondary.main" }}
            >
              {"Iniciar sesión"}
            </Typography>
            <Typography
              component="h5"
              variant="h5"
              sx={{ m: "2%", my: "1%", color: "primary.main" }}
            >
              {"Cadena de tiendas >> La Genérica"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleLogin}
              sx={{ my: "1%" }}
            >
              <TextField
                onChange={handleChange}
                onKeyUp={validate}
                onBlur={validate}
                error={login.username.error}
                helperText={login.username.message}
                name={login.username.name}
                label={login.username.label}
                value={login.username.value}
                id={login.username.name}
                margin="normal"
                required
                fullWidth
                type="username"
                autoComplete="current-username"
              />
              <TextField
                onChange={handleChange}
                onKeyUp={validate}
                onBlur={validate}
                error={login.password.error}
                helperText={login.password.message}
                name={login.password.name}
                label={login.password.label}
                value={login.password.value}
                id={login.password.name}
                margin="normal"
                required
                fullWidth
                type="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="success" />}
                label="Recordarme"
              />
              <Button
                type="submit"
                disabled={submitBtn}
                fullWidth
                variant="contained"
                sx={{ my: "3%" }}
                onClick={handleSubmit}
              >
                Ingresar al sistema
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
