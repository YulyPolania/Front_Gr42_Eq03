import { Grid, Typography, Button } from "@mui/material";

const TotalComponent = (props) => {
  const { cart, cedulaCliente, formatNumber, setVenta, cedulaUsuario } =
    props;

  const handleSent = () => {
    setVenta({
      cedulaUsuario: cedulaUsuario,
      cedulaCliente: cedulaCliente,
      ivaVenta: Number(cart.reduce((a, b) => a + b?.valorIva, 0).toFixed(4)),
      totalIva: Number(cart.reduce((a, b) => a + b?.valorTotal, 0).toFixed(4)),
      totalVenta: Number(
        cart.reduce((a, b) => a + b?.valorVenta, 0).toFixed(4)
      ),
      detallesVenta: cart,
    });
  };

  return (
    <form>
      <Grid container align="center" sx={{ mb: 1 }}>
        <Grid item container xs={6} align="center" sx={{ mb: 1 }}></Grid>
        <Grid item container xs={6} align="center" sx={{ mb: 1 }}>
          <Grid container sx={{ mb: 1 }}>
            <Grid item xs={6}>
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
              >
                Subtotal Venta:
              </Typography>
              <br />
              {formatNumber(
                cart.reduce((a, b) => a + b?.valorVenta, 0),
                "black"
              )}
            </Grid>
            <Grid item xs={6}>
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
              >
                Total IVA:
              </Typography>
              <br />
              {formatNumber(
                cart.reduce((a, b) => a + b?.valorIva, 0),
                "black"
              )}
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6}>
              <Button variant="contained" disabled>
                Total venta:{" "}
                {formatNumber(
                  cart.reduce((a, b) => a + b?.valorTotal, 0),
                  "black"
                )}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSent}
                disabled={!(cart.length > 0 && cedulaCliente)}
              >
                Confirmar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default TotalComponent;
