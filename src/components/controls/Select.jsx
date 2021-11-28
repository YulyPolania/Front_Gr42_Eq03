import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material";

const Select = (props) => {
  const { name, label, value, onChange, options, ...other } = props;
  return (
    <FormControl variant="outlined">
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange} />
      {options.map((item) => (
        <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
      ))}
    </FormControl>
  );
};

export default Select;
