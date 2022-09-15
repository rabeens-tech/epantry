import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core';

export function useForm(initialFValues,validateOnChange = false, validate) {
const [values, setValues] = useState(initialFValues);
const [errors, setErrors] = useState({});

const handleInputChange = e => {
    const { name, value } = e.target
    setValues({
        ...values,
        [name]: value,
      
    })
    if (validateOnChange)
        validate({ [name]: value })
}

const ResetForm = () => {
    setValues(initialFValues);
    setErrors({})
}
    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        ResetForm
    }
}


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1)
        }
    }
    
}))

export function Form(props) {

    const classes = useStyles();
    const { children, ...other } = props;
    return (
        <form className={classes.root} noValidate autoComplete="off" {...other}>
            {props.children}
        </form>
    )
}
