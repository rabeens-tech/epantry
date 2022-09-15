import React from 'react'
import { Paper, Typography, makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fdfdff'
    },
    pageHeader:{
        padding:theme.spacing(5),
        display:'flex',
        marginBottom:theme.spacing(1)
    },
    pageIcon:{
        display:'inline-block',
        padding:theme.spacing(1),
        color:'#3c44b1'
    },
    pageTitle:{
        paddingLeft:theme.spacing(4),
        '& .MuiTypography-subtitle2':{
            opacity:'0.6'
        }
    }
}))

export default function PageHeader(props) {

    const classes = useStyles();
    const { title,} = props;
    return (
        <Paper elevation={0} square className={classes.root}>
            <div>
                {/* <Card className={classes.pageIcon}>
                    {icon}
                </Card> */}
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h6"
                        component="div"
                      
                      >
                        {title}</Typography>
                    
                </div>
            </div>
        </Paper>
    )
}