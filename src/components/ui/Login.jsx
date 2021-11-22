import * as React from "react";
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
import bg from "../assets/img/bgLogin.jpg";
import { ThemeProvider } from "@mui/material/styles";

import { theme } from "../assets/Theme";

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

export default function SignInSide() {
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
        if (data.username.length == "") {
            seterrorUsername(true);
            setleyendaUsername("El usuario es obligatorio");
            return false;
        } else {
            const max = 15;
            if (data.username.length >= max) {
                seterrorUsername(true);
                setleyendaUsername(`El usuario no puede tener mas de ${max} caracteres`);
                return false;
            } else {
                seterrorUsername(false);
                setleyendaUsername("");
                return true;
            }
        }
    };

    const handlePassword = () => {
        if (data.password == "") {
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
        // const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        // console.log({
        //     username: data.get("username"),
        //     password: data.get("password"),
        // });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={6.5}
                    sx={{
                        backgroundImage: `url(${bg})`,
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "dark"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={12}
                    square
                >
                    <Box
                        sx={{
                            my: 12,
                            mx: 6,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar
                            sx={{ width: 60, height: 60, m: 1, bgcolor: "secondary.main" }}
                        >
                            <LockOutlinedIcon sx={{ fontSize: 40 }} />
                        </Avatar>
                        <Typography
                            component="h1"
                            variant="h5"
                            sx={{ m: 5, mt: 2, color: "secondary.main" }}
                        >
                            {"Iniciar sesión"}
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ m: 5, mt: 1, color: "primary.main" }}
                        >
                            {"Cadena de tiendas >> La Genérica"}
                        </Typography>
                        <Box
                            component="form"
                            noValidate
                            onSubmit={handleSubmit}
                            sx={{ mt: 1 }}
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
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Ingresar al sistema
                            </Button>
                            {/* <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} /> */}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
