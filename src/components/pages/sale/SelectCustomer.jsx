import { useState, useEffect } from "react";
import { TextField, Typography, Autocomplete, Card } from "@mui/material";

const SelectCustomer = (props) => {
  const { customers = [], setCedulaCliente, cliente = null } = props;
  const [selected, setSelected] = useState(null);

  const handleSelected = (value) => {
    setSelected(value);
    setCedulaCliente(value?.cedulaCliente);
  };

  useEffect(() => {
    if (customers.length > 0) {
      setSelected(customers[0]);
      setSelected(null);
    }
  }, [customers]);

  useEffect(() => {
    setSelected(cliente);
  }, [cliente]);

  return (
    <Card variant="outlined" sx={{ borderRadius: 2, p: 2 }}>
      <Typography variant="h6" component="div" sx={{ mb: 2 }}>
        Seleccionar Cliente
      </Typography>
      <Autocomplete
        value={selected}
        onChange={(event, value) => handleSelected(value)}
        disabled={cliente !== null}
        fullWidth
        options={customers}
        getOptionLabel={(option) => `${option?.cedulaCliente}`}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            label="Cédula del Cliente"
            fullWidth
          />
        )}
      />
      <Typography variant="h6" align="center" component="div" sx={{ mt: 2 }}>
        Nombre: {selected?.nombreCliente || ""}
      </Typography>
    </Card>
  );
};
export default SelectCustomer;
