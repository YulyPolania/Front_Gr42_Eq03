import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";

export const UsersSubmit = (props) => {
  const {
    variant = "add",
    rowData = null,
    setRowData = null,
    data = {},
    handleOpen,
  } = props;

  const [swicth, setSwitch] = useState(true);


  useEffect(() => {
   
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
      <div align="center" style={{ padding: 6 }}>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{ mx: 3 }}
          // onClick={handleSent}
        >
          ACEPTAR
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ mx: 3 }}
          // onClick={handleOpen}
        >
          CANCELAR
        </Button>
      </div>
    </form>
  );
};

export default UsersSubmit;
