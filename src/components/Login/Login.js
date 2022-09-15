import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import './Login.css';
import config from '../../utils/config';

export default function Login(props) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = e => {
    fetch(`${config.APPCONFIG}/Login/api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
          },
      body: JSON.stringify({
        username, password
      })
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

  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
        <label>
          <p>Username</p>
          <input type="text" onChange={e => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button onClick={handleSubmit}>Login</button>
        </div>
      
    </div>
  )
}

// Login.propTypes = {
//   setToken: PropTypes.func.isRequired
// }
