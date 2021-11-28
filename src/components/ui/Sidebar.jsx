import * as React from "react";

import { /*Outlet, NavLink,*/ useNavigate } from "react-router-dom";

import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import HomeIcon from "@mui/icons-material/Home";

import {TiendaGIcon as TGIcon} from "../../assets/img/TiendaGIcon"

import {
  PeopleAltRounded as UsersIcon,
  PersonRounded as CostumerIcon,
  ViewModuleRounded as ProductsIcon,
  EvStationRounded as SuppliersIcon,
  ShoppingCartRounded as SalesIcon,
  TimelineRounded as ConsolidatedIcon,
  LogoutRounded as LogoutIcon,
} from "@mui/icons-material";

const categories = [
  {
    id: "Pages",
    children: [
      { id: "Usuarios", icon: <UsersIcon /> },
      { id: "Clientes", icon: <CostumerIcon /> },
      { id: "Productos", icon: <ProductsIcon /> },
      { id: "Proveedores", icon: <SuppliersIcon /> },
      { id: "Ventas", icon: <SalesIcon /> },
    ],
  },
  {
    id: "Consolidado Ventas",
    children: [
      { id: "Por cliente", icon: <ConsolidatedIcon /> },
      { id: "Por sucursal", icon: <ConsolidatedIcon /> },
    ],
  },
];

export default function Sidebar(props) {
  const { ...other } = props;
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    navigate(index);
  };

  return (
    <>
      <Drawer variant="permanent" {...other}>
        <List disablePadding>
          <ListItemButton >
            <ListItemIcon >
              <TGIcon width={60} height={60} />
              <ListItemText 
              sx={{mt:2.5}}
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: 'medium',
                letterSpacing: 0,
              }}
              >TiendaG 2.0</ListItemText>
            </ListItemIcon>
          </ListItemButton>
          <Divider />
          {categories.map(({ id, children }) => (
            <Box key={id}>
              <ListItem>
                <ListItemText>{id}</ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon }) => (
                // <NavLink
                //   to={"/" + childId}
                //   key={childId}
                //   style={{ textDecoration: "none" }}
                // >
                  <ListItem disablePadding key={childId}>
                    <ListItemButton
                      selected={selectedIndex === childId}
                      onClick={(event) => handleListItemClick(event, "/" + childId)}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{childId}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                // </NavLink>
              ))}
              <Divider />
            </Box>
          ))}
          <Box
            sx={{
              // position: "fixed",
              bottom: 0,
              paddingBottom: 0,
            }}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={(event) => handleListItemClick(event, "/login")}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText>Others</ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider />
          </Box>
        </List>
      </Drawer>
      {/* <Outlet /> */}
    </>
  );
}
