import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import PropTypes from "prop-types";
import {
  AppBar,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";

function Navbar({ onDrawerToggle }) {
  const {
    user: { name },
    dispatch,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAnchorEl(null);
    navigate("/login");
    dispatch({
      type: types.logout,
    });
  };

  const [auth /*setAuth*/] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { lg: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Tabs value={0} textColor="inherit">
                <Tab label="Users" />
              </Tabs>
            </Grid>
            <Grid item xs />
            <Grid item></Grid>
            {auth && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>{name}</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

Navbar.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Navbar;
