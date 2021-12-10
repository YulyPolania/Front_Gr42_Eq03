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
  Button,
} from "@mui/material";
import { Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { AuthContext } from "../../auth/AuthContext";

function Navbar({ onDrawerToggle }) {
  const [anchorEl, setAnchorEl] = useState({
    anchorUser: null,
    anchorSedes: null,
  });
  const {
    logout,
    user: { name },
    title,
    setSede,
    listSedes,
    sede,
  } = useContext(AuthContext);

  const handleMenu = (event, key) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [key]: event.currentTarget,
    }));
  };

  const handleClose = (key) => {
    setAnchorEl((prevState) => ({
      ...prevState,
      [key]: null,
    }));
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
            <Grid item>
              <Button
                id="basic-button"
                variant="contained"
                disableElevation
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={
                  Boolean(anchorEl.anchorSedes) ? "true" : undefined
                }
                onClick={(e) => handleMenu(e, "anchorSedes")}
              >
                {sede?.label}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl.anchorSedes}
                open={Boolean(anchorEl.anchorSedes)}
                onClose={() => handleClose("anchorSedes")}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                {listSedes.map((i) => (
                  <MenuItem
                  key={i.name}
                    onClick={() => {
                      handleClose("anchorSedes");
                      setSede(i);
                    }}
                  >
                    {i.label}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
            <Grid item xs />
            <Grid item>{name}</Grid>
            <div>
              <IconButton
                size="large"
                aria-label="Usuario actual"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e) => handleMenu(e, "anchorUser")}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="user"
                anchorEl={anchorEl.anchorUser}
                open={Boolean(anchorEl.anchorUser)}
                onClose={() => handleClose("anchorUser")}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={() => logout()}>Logout</MenuItem>
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
