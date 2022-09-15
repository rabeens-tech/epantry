import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import './Login.css';
import config from '../../utils/config';
import {useForm,Form} from "../home/useForm";
import { Grid,Paper, Avatar } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Controls from "../controls/Controls";
const useStyles = makeStyles((theme) => ({

  paperStyle:{padding :20,height:'70vh',width:280, margin:"20px auto"},
  avatarStyle:{backgroundColor:'#1bbd7e'},
  btnstyle:{margin:'8px 0'}
}));
const initialFValues = {
  
  username: "",
  password:"",
};
export default function Login(props) {
//  const [username, setUserName] = useState();
//  const [password, setPassword] = useState();
const classes = useStyles(props);

const validate = (fieldValues=values) => {
  let temp = { ...errors }
  if ('username' in fieldValues)
  temp.username = fieldValues.username? ""
  : "This field is required."

  if ('password' in fieldValues)
  temp.password = fieldValues.password ?
   "" 
  : "This field is required."

  setErrors({
    ...temp
  })
  if (fieldValues == values)
  return Object.values(temp).every(x => x == "")
}
  const { values, handleInputChange, errors, setErrors } =useForm(initialFValues,true,validate);
  
  const handleSubmission = e => {
    e.preventDefault();
    if (validate()) {
      let req_value = {
  
        name: values.username,
        password:values.password
      };

      fetch(`${config.APPCONFIG}/Login/api`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
            },
        body: JSON.stringify(req_value)
      })
     .then(data => data.json())
     .then(data=>{
      if(data.status_code===200){
        props.setToken(data.msg)
          }
            else{
              console.log("unable to login")
            }
     })
     .catch(err=>{
       console.log(err)
     })
    }
 
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
       placeholder='Enter username' 
       variant="outlined" 
       value={values.username}
       onChange={handleInputChange}
       fullWidth 
       required/>
        <div style={{paddingTop:"20px"}}>
        <Controls.Input
         label='Password' 
         placeholder='Enter password'
          type='password' 
          value={values.password}
          onChange={handleInputChange}
          variant="outlined" 
          fullWidth
          
          required/>
  </div>
  <div style={{paddingTop:"20px"}}>
   <Button type='submit' color='primary' variant="contained" className={classes.btnstyle} fullWidth>Submit</Button></div>
        </Paper>
</Grid>


</Form>


  )
}

