import { useState, useContext } from "react";
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
import { AuthContext } from "../../auth/AuthContext";

function Navbar({ onDrawerToggle, handleLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user: { name }, title} = useContext(AuthContext);

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
                <Tab label={title} />
              </Tabs>
            </Grid>
            <Grid item xs />
            <Grid item></Grid>
            <div>
              <IconButton
                size="large"
                aria-label="Usuario actual"
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
