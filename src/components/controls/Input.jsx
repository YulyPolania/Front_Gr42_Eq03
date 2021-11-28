import { TextField } from "@mui/material";

const Input = (props) => {
  const { name, label, value, onChange, onKeyUp, ...other } = props;

  return (
    <TextField
      {...other}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      onKeyUp={onKeyUp}
    />
  );
};

export default Input;
