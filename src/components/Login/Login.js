import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import './Login.css';
import config from '../../utils/config';
import {useForm,Form} from "../home/useForm";
import { Grid,Paper, Avatar ,makeStyles} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Controls from "../controls/Controls";
import { toast } from "react-toastify";
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(3),
    padding: theme.spacing(1),
  },
  paperStyle:{padding :20,height:'50vh',width:350, margin:"80px auto"},
  avatarStyle:{backgroundColor:'#1bbd7e'},
  btnstyle:{margin:'10px 0',width:100,textAlign:"center"},
}));

const initialFValues = {
  
  username: "",
  password:"",
};
export default function Login(props) {
  const classes = useStyles(props);

//  const [username, setUserName] = useState();
//  const [password, setPassword] = useState();


// const validate = (fieldValues=values) => {
//   let temp = { ...errors }
//   if ('username' in fieldValues)
//   temp.username = fieldValues.username? ""
//   : "This field is required."

//   if ('password' in fieldValues)
//   temp.password = fieldValues.password ?
//    "" 
//   : "This field is required."

//   setErrors({
//     ...temp
//   })
//   if (fieldValues == values)
//   return Object.values(temp).every(x => x == "")
// }
  const { values, handleInputChange, errors, setErrors } =useForm(initialFValues);
  
  const handleSubmission = e => {
    e.preventDefault();
  
     let req_value = {
  
         name: values.username,
         password:values.password,
      };

      axios(`${config.APP_CONFIG}login`, {
        // mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache',
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json'
        },
        timeout: 8000,
        body: JSON.stringify(req_value)
    })
    .then(res=>{
   console.log(res);
     if(res.status===200){
       props.setToken(res.msg)

     }
     else if(res.status===400){
       toast.warn(res.msg)
      
   
     }
    })
     .catch(err=>{
       
     })
    
 
  }
  return(
    <Form  onSubmit={handleSubmission}>
    <Grid>
    <Paper elevation={10} className={classes.paperStyle}>
        <Grid align='center'>
             <Avatar   className={classes.avatarStyle}><LockOutlinedIcon/></Avatar>
            <h2>Log In</h2>
        </Grid>
        <Controls.Input
       label='Username' 
       //placeholder='Enter username' 
       variant="outlined" 
       value={values.username}
       onChange={handleInputChange}
       name="username"
     
      />
        <div style={{paddingTop:"20px"}}>
        <Controls.Input
         label='Password' 
         //placeholder='Enter password'
          type='password' 
          name="password"
          value={values.password}
          onChange={handleInputChange}
          variant="outlined" 
      
          
          />
  </div>
  <div style={{paddingTop:"20px"}}>
  <Controls.Button
              type="submit" 
              text="Submit" 
           color='primary'
            variant="contained" 
            className={classes.btnstyle} 
            fullWidth
            />
            </div>
        </Paper>
</Grid>


</Form>


  )
}

