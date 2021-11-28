import {
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup as MuiRadioGroup,
  Radio,
} from "@mui/material";

const RadioGroup = (props) => {
  const { name, label, value, onChange, items, ...other } = props;
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <MuiRadioGroup row name={name} value={value} onChange={onChange}>
        {items.map((item) => (
          <FormControlLabel
            {...other}
            value={item.id}
            control={<Radio />}
            label={item.title}
            key={item.id}
          />
        ))}
      </MuiRadioGroup>
    </FormControl>
  );
};
export default RadioGroup;
