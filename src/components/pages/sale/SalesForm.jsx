import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { TextField, Paper, Card } from "@mui/material";

import SelectCustomer from "./SelectCustomer";
import SelectProduct from "./SelectProduct";
import CartComponent from "./CartComponent";
import TotalComponent from "./TotalComponent";
import productService from "../../../services/productService";
import customerService from "../../../services/customerService";
import saleService from "../../../services/saleService";
import { AuthContext } from "../../../auth/AuthContext";

const SalesForm = (props) => {
  const { codigoVenta: cv = null } = props;
  const {
    user: { idUsuario },
    setAlert,
    logout,
    sede: { baseURL },
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [sales, setSales] = useState([]);
  const [cart, setCart] = useState([]);
  const [codigoVenta, setCodigoVenta] = useState("");
  const [cedulaCliente, setCedulaCliente] = useState("");
  const [cliente, setCliente] = useState(null);
  const [venta, setVenta] = useState({
    cedulaUsuario: "",
    cedulaCliente: "",
    ivaVenta: "",
    totalIva: "",
    totalVenta: "",
    idSede: "",
    detallesVenta: [],
  });

  const formatNumber = (number = 0, color = "red") => {
    return (
      <span style={{ color: color }}>
        {new Intl.NumberFormat("ES-MX", {
          style: "currency",
          currency: "MXN",
        }).format(number)}
      </span>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    cv ? putData() : postData();
    navigate("/ventas");
  };

  const getData = async () => {
    await productService
      .getProducts(baseURL)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        handleError(err);
      });

    await customerService
      .getCustomers(baseURL)
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        handleError(err);
      });

    await saleService
      .getSales(baseURL)
      .then((res) => {
        setSales(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const postData = async () => {
    await saleService
      .saveSale(baseURL, venta)
      .then((res) => {
        getData();
        handleSuccess(res);
      })
      .catch((err) => {
        handleError(err);
      });
    getData();
  };

  const putData = async () => {
    await saleService
      .updateSale(baseURL, cv, venta)
      .then((res) => {
        getData();
        handleSuccess(res);
      })
      .catch((err) => {
        handleError(err);
      });
    getData();
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseURL]);

  useEffect(() => {
    if (cv) {
      const venta = sales.find((i) => String(i.codigoVenta) === String(cv));
      setCedulaCliente(venta?.cedulaCliente);
      setCliente(
        customers.find((i) => i.cedulaCliente === venta?.cedulaCliente)
      );
      venta?.detallesVenta.forEach((i) => {
        i["nombreProducto"] = products.find(
          (j) => j.codigoProducto === i.codigoProducto
        ).nombreProducto;
      });
      setCart(venta?.detallesVenta || []);
    }
  }, [customers, cv, products, sales]);

  const handleError = (err) => {
    switch (err.response?.status) {
      case 401:
        logout();
        break;
      case 403:
        setAlert({
          openAlert: true,
          severity: "warning",
          message:
            "Acceso denegado, no tiene permisos para realizar esta acción!",
        });
        break;
      case 400 || 404:
        setAlert({
          openAlert: true,
          severity: "error",
          message: err.response.data.error,
        });
        break;
      default:
        console.log(err);
        break;
    }
  };

  const handleSuccess = (res) => {
    setAlert({
      openAlert: true,
      severity: "success",
      message: res.data.mensaje,
    });
  };

  return (
    <Paper sx={{ flexGrow: 1, mt: 0, p: 2 }}>
      <Grid container alignItems="center" sx={{ mb: "1.5%" }}>
        <Grid item xs={12} sm={4}>
          <Typography display="inline" variant="h5" align="center">
            Registar Venta
          </Typography>
        </Grid>
        {cv && (
          <>
            <Grid item xs={0} sm={4} md={6} />
            <Grid item xs={12} sm={4} md={2}>
              <TextField
                size="small"
                label="Código de venta"
                value={codigoVenta}
                onChange={(e) => setCodigoVenta(e.target.value)}
              />
            </Grid>
          </>
        )}
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SelectCustomer
            customers={customers}
            cedulaCliente={cedulaCliente}
            setCedulaCliente={setCedulaCliente}
            cliente={cliente}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <SelectProduct
            products={products}
            formatNumber={formatNumber}
            setCart={setCart}
            cart={cart}
            codigoVenta={codigoVenta}
          />
        </Grid>
        <Grid item xs={12}>
          <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
            <Typography variant="h6" component="div" sx={{ mb: 2 }}>
              Carro
            </Typography>
            {cart?.map(
              ({
                cantidadProducto,
                codigoProducto,
                nombreProducto,
                valorTotal,
              }) => (
                <CartComponent
                  key={codigoProducto}
                  codigoProducto={codigoProducto}
                  cantidadProducto={cantidadProducto}
                  nombreProducto={nombreProducto}
                  valorTotal={valorTotal}
                  formatNumber={formatNumber}
                  cart={cart}
                  setCart={setCart}
                />
              )
            )}
          </Card>
          <Card
            variant="outlined"
            sx={{ borderRadius: 2, p: 2, mt: 2 }}
            onSubmit={handleSubmit}
          >
            <TotalComponent
              cart={cart}
              formatNumber={formatNumber}
              cedulaCliente={cedulaCliente}
              setVenta={setVenta}
              cedulaUsuario={idUsuario}
            />
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SalesForm;
