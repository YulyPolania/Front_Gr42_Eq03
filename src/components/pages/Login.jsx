import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import bg from "../../assets/img/bgLogin.jpg";
import { ThemeProvider } from "@mui/material/styles";

import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

import { theme } from "../../assets/Theme";

export const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    const lastPath = localStorage.getItem("lastPath") || "/";

    dispatch({
      type: types.login,
      payload: {
        name: "Equipo3",
      },
    });

    navigate(lastPath);
  };
  const [data, setData] = React.useState({
    username: "",
    password: "",
  });
  const [leyendaUsername, setleyendaUsername] = React.useState("");
  const [leyendaPassword, setLeyendaPassword] = React.useState("");
  const [errorPassword, seterrorPassword] = React.useState(false);
  const [errorUsername, seterrorUsername] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleUsername = () => {
    if (data.username.length === "") {
      seterrorUsername(true);
      setleyendaUsername("El usuario es obligatorio");
      return false;
    } else {
      const max = 15;
      if (data.username.length >= max) {
        seterrorUsername(true);
        setleyendaUsername(
          `El usuario no puede tener mas de ${max} caracteres`
        );
        return false;
      } else {
        seterrorUsername(false);
        setleyendaUsername("");
        return true;
      }
    }
  };

  const handlePassword = () => {
    if (data.password === "") {
      seterrorPassword(true);
      setLeyendaPassword(`La contraseña es obligatoria`);
      return false;
    } else {
      seterrorPassword(false);
      setLeyendaPassword("");
      return true;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleUsername() & handlePassword()) {
      const { username, password } = data;
      console.log({
        username: username,
        password: password,
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh", }}
      >
        <Grid
          container
          component="main"
          sx={{ height: "95%", width:"90%" }}
        >
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
              borderBottomLeftRadius: 16
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
              borderBottomRightRadius: 16
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
                onSubmit={handleSubmit}
                sx={{ my: "1%" }}
              >
                <TextField
                  onChange={handleChange}
                  error={errorUsername}
                  helperText={leyendaUsername}
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Usuario"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  onChange={handleChange}
                  error={errorPassword}
                  helperText={leyendaPassword}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="success" />}
                  label="Recordarme"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ my: "3%" }}
                  onClick={handleLogin}
                >
                  Ingresar al sistema
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

// <div className="container mt-5">
//   <h1>Login</h1>
//   <hr />

//   <button className="btn btn-primary" onClick={handleLogin}>
//     Login
//   </button>
// </div>
