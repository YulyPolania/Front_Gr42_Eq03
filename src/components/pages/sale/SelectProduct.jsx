import { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Typography,
  Autocomplete,
  ButtonGroup,
  Button,
  IconButton,
  Card,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

const SelectProduct = (props) => {
  const { products = [], formatNumber, setCart, cart } = props;
  const [counter, setCounter] = useState(0);
  const [selected, setSelected] = useState(null);

  const handleAdd = () => {
    const valorVenta =Number(( selected?.precioVenta * counter).toFixed(4));
    const valorIva = Number(((selected?.ivaCompra * valorVenta) / 100).toFixed(4));
    if (cart.some((i) => i?.codigoProducto === selected?.codigoProducto)) {
      const e = cart.find(
        (i) => i?.codigoProducto === selected?.codigoProducto
      );
      e.cantidadProducto += counter;
      e.valorVenta += valorVenta;
      e.valorIva += valorIva;
      e.valorTotal += valorVenta + valorIva;
      setCart((prevState) =>
        prevState.filter((i) => i?.codigoProducto !== selected?.codigoProducto)
      );
      setCart((prevState) => [...prevState, e]);
    } else {
      const detail = {
        cantidadProducto: counter,
        codigoProducto: selected?.codigoProducto,
        valorVenta: valorVenta,
        valorIva: valorIva,
        valorTotal: valorVenta + valorIva,
        nombreProducto: selected?.nombreProducto,
      };
      setCart((prevState) => [...prevState, detail]);
    }
    setSelected(null);
    setCounter(null);
  };

  useEffect(() => {
    if (products.length > 0) {
      setSelected(products[0]);
      setSelected(null);
    }
  }, [products]);

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={8}>
          <Typography variant="h6" component="div" sx={{ mb: 2 }}>
            Seleccionar Producto
          </Typography>
          <Autocomplete
            value={selected}
            onChange={(event, value) => setSelected(value)}
            fullWidth
            selectOnFocus
            options={products}
            getOptionLabel={(option) => `${option?.codigoProducto}`}
            renderInput={(params) => (
              <TextField {...params} size="small" label="Código del Producto" />
            )}
          />
          <Typography
            variant="h6"
            align="center"
            component="div"
            sx={{ mt: 2 }}
          >
            Nombre: {selected?.nombreProducto || ""}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Precio:{" "}
            {formatNumber(selected?.precioVenta, "black") || ""}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4} alignItems="center" align="center">
          <Typography variant="h6" align="center" component="div">
            {"Total"}
          </Typography>
          <Typography variant="h6" align="center" component="div">
            {selected && formatNumber(selected?.precioVenta * counter)}
          </Typography>
          <ButtonsPlusRemove
            counter={counter}
            setCounter={setCounter}
            products={products}
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ mt: 2 }}
        spacing={2}
      >
        <Grid item>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={() => {
              setSelected(null);
              setCounter(null);
            }}
          >
            Limpiar
          </Button>
        </Grid>
        <Grid item>
          <Button
            size="small"
            variant="contained"
            color="primary"
            disabled={!(selected && counter > 0)}
            onClick={handleAdd}
          >
            Confirmar
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default SelectProduct;

const ButtonsPlusRemove = ({ counter, setCounter, products }) => {
  const handleOnClick = (key) => {
    key === "+" ? setCounter(counter + 1) : setCounter(counter - 1);
  };

  return (
    <ButtonGroup size="small">
      {counter > 0 && (
        <>
          <IconButton
            aria-label="Remove"
            color="warning"
            onClick={() => handleOnClick("-")}
          >
            <RemoveIcon fontSize="inherit" />
          </IconButton>
          <IconButton disabled size="small">
            {counter}
          </IconButton>
        </>
      )}
      <IconButton
        aria-label="Add"
        color="success"
        onClick={() => handleOnClick("+")}
      >
        <AddIcon fontSize="inherit" />
      </IconButton>
    </ButtonGroup>
  );
};
