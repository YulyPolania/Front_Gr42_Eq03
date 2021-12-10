import { useState } from "react";
import { CSVReader } from "react-papaparse";
import {
  Grid,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const ImportCSV = (props) => {
  const { handleOpen, data, setData } = props;
  const [checked, setChecked] = useState(true);
  const [submit, setSubmit] = useState(true);

  const formatData = (data) => {
    let newCsvData = [];
    data.forEach((i) => {
      if (i.errors.length === 0) {
        const [
          codigoProducto,
          nombreProducto,
          nitProveedor,
          precioCompra,
          precioVenta,
          ivaCompra,
        ] = i.data;
        const obj = {
          codigoProducto,
          nombreProducto,
          nitProveedor,
          precioCompra,
          precioVenta,
          ivaCompra,
        };
        if (
          obj.codigoProducto !== "" &&
          obj.nombreProducto &&
          obj.nitProveedor &&
          obj.precioCompra &&
          obj.precioVenta &&
          obj.ivaCompra
        ) {
          newCsvData.push(obj);
        }
      }
    });
    return newCsvData;
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleSent = () => {
    checked && data.shift();
    setData((prevState) => ({
      ...prevState,
      data: data,
    }));
  };

  const handleOnDrop = (data) => {
    setSubmit(false);
    setData((prevState) => ({
      ...prevState,
      data: formatData(data),
    }));
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = (data) => {
    setSubmit(true);
    setData((prevState) => ({
      ...prevState,
      data: [],
    }));
  };

  return (
    <form>
      <Typography variant="h5" align="center" component="div" sx={{ p: 2 }}>
        Importar productos desde CSV
      </Typography>
      <Grid
        item
        sx={{ my: 1, px: 3 }}
        align="center"
        alignItems="center"
        alignContent="center"
      >
        <CSVReader
          onDrop={handleOnDrop}
          onError={handleOnError}
          addRemoveButton
          removeButtonColor="#659cef"
          onRemoveFile={handleOnRemoveFile}
        >
          <span>Suelta el archivo CSV aquí o haz clic para subir.</span>
        </CSVReader>
      </Grid>
      <Grid
        item
        sx={{ my: 1 }}
        align="center"
        alignItems="center"
        alignContent="center"
      >
        <FormControlLabel
          control={
            <Checkbox
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
          }
          label="Tiene encabezados?"
        />
      </Grid>
      <div align="center" style={{ padding: 6 }}>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          sx={{ mx: 3 }}
          disabled={submit}
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

export default ImportCSV;
