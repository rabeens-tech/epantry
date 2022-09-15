import React from 'react'
import { Button, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        // backgroundColor: theme.palette.secondary.light,
       backgroundColor: '#ff8A8A',
      // backgroundColor: '#c6cef9',
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
        }
    },
    primary: {
        //backgroundColor: theme.palette.primary.light,
        backgroundColor: '#c6cef9',
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        }
    },
}))

export default function ActionButton(props) {

    const { text, color, children, onClick } = props;
    const classes = useStyles();

    return (
        <Button

            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}>
            {children}
            {text}
        </Button>
    )
}