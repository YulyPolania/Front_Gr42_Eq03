import MaterialTable from "@material-table/core";
import { useEffect, useState, useContext } from "react";
import { Modal, Box } from "@mui/material";
import productService from "../../../services/productService";
import ProductsForm from "./ProductsForm";
import ImportCSV from "./ImportCSV";
import Localization from "../../generic/Localization";
import { AuthContext } from "../../../auth/AuthContext";

const style = {
  form: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 1,
  },
  csv: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30%",
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 1,
  },
};

const columns = [
  {
    title: "Código",
    field: "codigoProducto",
    type: "numeric",
    width: "auto",
    draggable: false,
    cellStyle: { textAlign: "right", borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Nombre",
    field: "nombreProducto",
    type: "string",
    width: "auto",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Nit Proveedor",
    field: "nitProveedor",
    width: "auto",
    type: "numeric",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Precio de compra",
    field: "precioCompra",
    width: "auto",
    type: "currency",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Iva compra",
    field: "ivaCompra",
    width: "auto",
    type: "numeric",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
  {
    title: "Precio de venta",
    field: "precioVenta",
    width: "auto",
    type: "currency",
    draggable: false,
    cellStyle: { borderRight: "1px solid #e5e5e5" },
  },
];

const ProductsTable = (props) => {
  const [data, setData] = useState([]);
  const {
    sede: { baseURL },
    setAlert,
    logout,
    user: { authorities },
  } = useContext(AuthContext);
  const [form, setForm] = useState({
    openForm: false,
    typeForm: "add",
    dataForm: { codigoProducto: "" },
  });
  const [csv, setCsv] = useState({ open: false, data: [] });

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
    getData();
    handleOpen();
    setAlert((prevState) => ({
      ...prevState,
      openAlert: true,
      severity: "success",
      message: res.data.mensaje,
    }));
  };

  const handleOpen = (key, rowData) => {
    setForm((prevState) => ({ ...prevState, typeForm: key }));
    if (rowData) {
      const { tableData, ...newRowData } = rowData;
      setForm((prevState) => ({ ...prevState, dataForm: { ...newRowData } }));
    }
    setForm((prevState) => ({ ...prevState, openForm: !form.openForm }));
  };

  const handleImport = () => {
    setCsv((prevState) => ({ ...prevState, open: !csv.open }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOpen();
    if (form.typeForm === "add") {
      postData();
    } else if (form.typeForm === "del") {
      deleteData();
    } else if (form.typeForm === "edit") {
      putData();
    }
  };

  const handleImportSubmit = (e) => {
    e.preventDefault();
    handleImport();
    postCsvData();
  };

  const getData = async () => {
    await productService
      .getProducts(baseURL)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        handleError(err);
      });
  };

  const postCsvData = async () => {
    await productService
      .importFromCsv(baseURL, csv.data)
      .then((res) => {
        getData();
        let p = [];
        res.data.mensaje.forEach((i) => {
          let result = i.slice(1, -1);
          if (result.substring(0, 5) === "error") {
            setAlert({
              open: true,
              severity: "error",
              message: result.slice(6),
            });
            p.push(result.slice(6));
          } else {
            setAlert({
              open: true,
              severity: "success",
              message: result.slice(8),
            });
            p.push(result.slice(8));
          }
        });
        console.log(p);
      })
      .catch((err) => {
        handleError(err);
      });
    getData();
  };
  const postData = async () => {
    await productService
      .saveProduct(baseURL, form.dataForm)
      .then((res) => {
        handleSuccess(res);
      })
      .catch((err) => {
        handleError(err);
      });
    getData();
  };

  const deleteData = async () => {
    await productService
      .deleteProduct(baseURL, form.dataForm.codigoProducto)
      .then((res) => {
        handleSuccess(res);
      })
      .catch((err) => {
        handleError(err);
      });
    getData();
  };

  const putData = async () => {
    await productService
      .updateProduct(baseURL, form.dataForm.codigoProducto, form.dataForm)
      .then((res) => {
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

  const actions = authorities?.some(
    (x) => x === "ROLE_MANAGER" || x === "ROLE_ADMIN" || x === "ROLE_SUPERADMIN"
  )
    ? [
        {
          icon: "edit",
          iconProps: { color: "primary" },
          tooltip: "Editar registro",
          onClick: (e, rowData) => handleOpen("edit", rowData),
        },
        {
          icon: "delete",
          iconProps: { color: "error" },
          tooltip: "Eliminar registro",
          onClick: (e, rowData) => handleOpen("del", rowData),
        },
        {
          icon: "add_box",
          iconProps: { color: "secondary" },
          tooltip: "Registrar",
          position: "toolbar",
          onClick: () => handleOpen("add", null),
        },
        {
          icon: "upload_file",
          iconProps: { color: "secondary" },
          tooltip: "Importar de CSV",
          position: "toolbar",
          onClick: () => handleImport(),
        },
      ]
    : [];

  return (
    <>
      <MaterialTable
        title="Productos"
        columns={columns}
        data={data}
        localization={Localization}
        options={{
          actionsColumnIndex: -1,
        }}
        actions={actions}
      />
      <Modal open={form.openForm} onClose={() => handleOpen()}>
        <Box sx={style.form} onSubmit={handleSubmit}>
          <ProductsForm
            rowData={form.dataForm}
            variant={form.typeForm}
            data={data}
            setDataForm={setForm}
            handleOpen={handleOpen}
          />
        </Box>
      </Modal>
      <Modal open={csv.open} onClose={() => handleImport()}>
        <Box sx={style.csv} onSubmit={handleImportSubmit}>
          <ImportCSV
            data={csv.data}
            setData={setCsv}
            handleOpen={handleImport}
          />
        </Box>
      </Modal>
    </>
  );
};

export default ProductsTable;
