import {
  Grid,
  Button,
  Typography,
  TextField,
} from "@mui/material";

const SalesDelForm = (props) => {
  const { handleOpen, venta } = props;

  const handleSent = () => {};

  const dataVenta = [];

  for (const i in venta) {
    if (i !== "idSede" && i !== "tableData" && i !== "detallesVenta") {

      dataVenta.push(
        <Grid item md={6} xs={12} align="center">
          <TextField
            disabled={true}
            sx={{ m: 1, width: "90%" }}
            variant="outlined"
            label={i}
            value={venta[i]}
            key={i}
            type="text"
          />
        </Grid>
      );
    }
  }

  return (
    <form>
      <Typography variant="h5" align="center" component="div" sx={{ p: 2 }}>
        Eliminar Venta
      </Typography>
      <Grid container>{dataVenta}</Grid>
      <div align="center" style={{ padding: 6 }}>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{ mx: 3 }}
          onClick={handleSent}
        >
          ACEPTAR
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ mx: 3 }}
          onClick={handleOpen}
        >
          CANCELAR
        </Button>
      </div>
    </form>
  );
};

export default SalesDelForm;
