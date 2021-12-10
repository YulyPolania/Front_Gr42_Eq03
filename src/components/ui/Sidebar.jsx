import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Drawer,
  List,
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  PeopleAltRounded as UsersIcon,
  PersonRounded as CostumerIcon,
  ViewModuleRounded as ProductsIcon,
  EvStationRounded as SuppliersIcon,
  ShoppingCartRounded as SalesIcon,
  TimelineRounded as ConsolidatedIcon,
  LogoutRounded as LogoutIcon,
} from "@mui/icons-material";
import { TiendaGIcon as TGIcon } from "../../assets/img/TiendaGIcon";
import { AuthContext } from "../../auth/AuthContext";

const categories = [
  {
    name: "Pages",
    children: [
      { path: "/Usuarios", name: "Usuarios", icon: <UsersIcon /> },
      { path: "/Clientes", name: "Clientes", icon: <CostumerIcon /> },
      { path: "/Productos", name: "Productos", icon: <ProductsIcon /> },
      { path: "/Proveedores", name: "Proveedores", icon: <SuppliersIcon /> },
      { path: "/Ventas", name: "Ventas", icon: <SalesIcon /> },
    ],
  },
  {
    name: "Consolidado Ventas",
    children: [
      {
        path: "/Ventas/Cliente",
        name: "Por cliente",
        icon: <ConsolidatedIcon />,
      },
      {
        path: "/Ventas/Sucursal",
        name: "Por sucursal",
        icon: <ConsolidatedIcon />,
      },
    ],
  },
];

export default function Sidebar(props) {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState("/");
  const { logout, user, setTitle } = useContext(AuthContext);

  const handleListItemClick = (path, name) => {
    setSelectedIndex(name);
    setTitle(name);
    navigate(path);
  };

  return (
    <Drawer variant="permanent" {...props}>
      <List disablePadding>
        <ListItemButton onClick={()=> navigate("/")}>
          <ListItemIcon>
            <TGIcon width={60} height={60} />
            <ListItemText
              sx={{ mt: 2.5 }}
              primaryTypographyProps={{
                fontSize: 20,
                fontWeight: "medium",
                letterSpacing: 0,
              }}
            >
              TiendaG 2.0
            </ListItemText>
          </ListItemIcon>
        </ListItemButton>
        <Divider />
        {categories.map(({ name, children }) => (
          <Box key={name}>
            <ListItem>
              <ListItemText>{name}</ListItemText>
            </ListItem>
            {children.map(({ path, name, icon }) =>
              user.authorities?.some(
                (x) =>
                  x === "ROLE_MANAGER" ||
                  x === "ROLE_ADMIN" ||
                  x === "ROLE_SUPERADMIN"
              ) ? (
                <ListItem disablePadding key={name}>
                  <ListItemButton
                    selected={selectedIndex === name}
                    onClick={() => handleListItemClick(path, name)}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{name}</ListItemText>
                  </ListItemButton>
                </ListItem>
              ) : (
                name !== "Usuarios" && (
                  <ListItem disablePadding key={name}>
                    <ListItemButton
                      selected={selectedIndex === name}
                      onClick={() => handleListItemClick(path, name)}
                    >
                      <ListItemIcon>{icon}</ListItemIcon>
                      <ListItemText>{name}</ListItemText>
                    </ListItemButton>
                  </ListItem>
                )
              )
            )}
            <Divider />
          </Box>
        ))}
        <Box
          sx={{
            bottom: 0,
            paddingBottom: 0,
          }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={() => logout()}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
        </Box>
      </List>
    </Drawer>
  );
}
