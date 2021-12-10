import { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Sidebar from "../ui/Sidebar";
import Navbar from "./Navbar";
import { AuthContext } from "../../auth/AuthContext";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        TiendaG 2.0
      </Link>{" "}
      2021.
    </Typography>
  );
}

const drawerWidth = 256;

export default function Dashboard(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mediaQuery = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { alert, setAlert } = useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { lg: 0 } }}
      >
        {mediaQuery ? null : (
          <Sidebar
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        )}
        <Sidebar
          PaperProps={{ style: { width: drawerWidth } }}
          sx={{ display: { lg: "block", xs: "none" } }}
        />
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar onDrawerToggle={handleDrawerToggle} />
        <Box component="main" sx={{ flex: 1, p: 2, bgcolor: "#eaeff1" }}>
          <Outlet />
        </Box>
        <Box component="footer" sx={{ p: 2, bgcolor: "#eaeff1" }}>
          <Copyright />
        </Box>
        <Stack spacing={2} sx={{ width: "100%" }}>
          <Snackbar
            open={alert.openAlert}
            autoHideDuration={6000}
            onClose={() =>
              setAlert((prevState) => ({
                ...prevState,
                openAlert: false,
              }))
            }
          >
            <Alert
              elevation={6}
              variant="filled"
              onClose={() =>
                setAlert((prevState) => ({
                  ...prevState,
                  openAlert: false,
                }))
              }
              severity={alert.severity}
              sx={{ width: "100%" }}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        </Stack>
      </Box>
    </Box>
  );
}
