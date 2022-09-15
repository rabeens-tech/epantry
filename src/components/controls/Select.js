import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText
} from "@mui/material";

export default function Select(props) {
  const { name, label, value, variant, onChange, options, required , error=null, disabled } = props;

  return (
    <FormControl variant={variant || "outlined"}
      {...(error && {error:true})}>
      <InputLabel>{label}</InputLabel>
      <MuiSelect label={label} name={name} value={value} onChange={onChange} disabled={disabled} required = {required} >
        {options&&options.map((item, index) => (
          <MenuItem key={item.id} value={item.id}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
