import React from 'react'
import TextField from '@mui/material/TextField';
export default function Input(props) {

    const {id, name, label, onKeyDown,type, value,error=null, onChange,required,onClick,step, inputProps,fullWidth, ...other } = props;
    return (
     
        <TextField
           // id="outlined-basic"
            id={id||"outlined-basic"}
            variant="outlined"
            size="small"
            label={label} 
            name={name}
            onKeyDown={onKeyDown}
            onClick={onClick}
            value={value}
            onChange={onChange}
            required={required}
            inputProps={ inputProps}
            fullWidth={fullWidth}
            step={step}
            {...other}
            {...(error && {error:true,helperText:error})}
            // error
            // helperText="some validation error"
            type = {type}
        />
         
    )
}
