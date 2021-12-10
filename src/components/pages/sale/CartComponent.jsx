import {
  Grid,
  Typography,
  Box,
  List,
  Divider,
  IconButton,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";

const CartComponent = (props) => {
  const {
    codigoProducto,
    cantidadProducto,
    valorTotal,
    nombreProducto,
    formatNumber,
    setCart,
  } = props;
  const mediaQuery = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const handleDelete = (codigoProducto) => {
    setCart((prevState) =>
      prevState.filter((i) => i?.codigoProducto !== codigoProducto)
    );
  };

  return (
    <Box align="center">
      <Grid container align="center" sx={{ mb: 1 }}>
        <Grid
          item
          container
          xs={2}
          sm={2.5}
          md={3}
          sx={{ justifyContent: "flex-end" }}
        >
          <List sx={{ py: 0, alignContent: "center" }}>
            <List sx={{ py: 0 }}>
              <IconButton aria-label="product" unabled="true">
                <ImageIcon fontSize="large" />
              </IconButton>
            </List>
          </List>
        </Grid>
        <Grid item container xs={8} sm={7} md={6}>
          <Grid item xs={12} sm={6}>
            <List sx={{ width: "100%", py: 0 }}>
              &nbsp;&nbsp;&nbsp;&nbsp;{nombreProducto}&nbsp;&nbsp;&nbsp;&nbsp;
              {mediaQuery && <br />}
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.secondary"
              >
                Cantidad: {cantidadProducto}
              </Typography>
              {mediaQuery && <Divider component="li" />}
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <List sx={{ py: 0 }}>
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                xs={6}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;Valor Total: &nbsp;&nbsp;&nbsp;&nbsp;
                {mediaQuery && <br />}
              </Typography>
              <Typography xs={6} component="span" color="text.primary">
                {formatNumber(valorTotal, "black") || ""}
              </Typography>
              <Divider component="li" />
            </List>
          </Grid>
        </Grid>
        <Grid item container xs={2} sm={2.5} md={3}>
          <List sx={{ py: 0 }}>
            <IconButton
              aria-label="delete"
              color="error"
              onClick={() => handleDelete(codigoProducto)}
            >
              <DeleteIcon fontSize="large" />
            </IconButton>
          </List>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CartComponent;
