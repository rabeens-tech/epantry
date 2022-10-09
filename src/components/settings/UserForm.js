
import React,{useState} from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";
import {Switch }from "@material-ui/core";
import { FormControl ,FormGroup,FormControlLabel} from '@mui/material';

const initialFValues = {
  
  userName: "",
  password:"",
  userEmail:"",
  confirmpassword:"",
  userRole:[],
  isActive:"",
};

const UserForm = (props) => {
  const _data = props.data || initialFValues;
  const [userRole, SetuserRole] = useState([]);

 const [isActive, SetisActive] = useState(0);
 const checkBoxInputs = [
  {
    id: 1,
    label: "Admin",
    value: "admin"
  },

  {
    id: 2,
    label: "User",
    value: "user"
  }
];
  const handleCheckboxChange = (e) => {
    if (e.target.checked) {
      if (!userRole.includes(e.target.value)) {
        SetuserRole([...userRole, e.target.value]);
      }
    } else {
      var filteredRoles = userRole.filter(function (value, index, arr) {
        return value !== e.target.value;
      });
      SetuserRole(filteredRoles);
    }
  };
console.log(userRole);
  const validate = (fieldValues=values) => {
    let temp = { ...errors }
    if ('userName' in fieldValues)
    temp.userName = fieldValues.userName
    ?fieldValues.userName.length<51
    ?fieldValues.userName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
      ? ""
        : "Invalid Data" 
       :"maximum 50 Characters"
    : "This field is required."
    if ('userEmail' in fieldValues)
    temp.userEmail = fieldValues.userEmail?
    fieldValues.userEmail.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
      ? ""
        : "Invalid Data" 
     
    : "This field is required."
    if ('password' in fieldValues)
    temp.password = fieldValues.password
    ?fieldValues.password.match(/^[a-zA-Z0-9 !\$%\^\&\)\(+=._]+$/g)
      ? ""
        : "Invalid Data" 
     
    : "This field is required."
    if ('confirmpassword' in fieldValues)
    temp.confirmpassword = fieldValues.confirmpassword
    ?
    fieldValues.confirmpassword.match(fieldValues.password)
    ? ""
        : "Password doesnot match" 
      
    : "This field is required."
    setErrors({
      ...temp
    })
    if (fieldValues == values)
    return Object.values(temp).every(x => x == "")
  }
  const { values, handleInputChange, errors, setErrors } =useForm(_data,true,validate);

  const getSwitch = (key, callback, label) => {
    return (
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              size="small"
              checked={key === 1 ? true : false}
              defaultValue="on"
              onChange={(e) => {
                let changedValue = 0;
                if (key === 0) {
                  changedValue = 1;
                }
                callback(changedValue);
              }}
            />
          }
          // label={label}
        />
      </FormGroup>
    );
  };
  console.log(parseInt(isActive))
  const handleSubmission = e => {
    e.preventDefault()
    if (validate()) {
      let req_value = {
        id:values.id,
        userName: values.userName,
        userEmail:values.userEmail,
        password:values.password,
        userRole:userRole,
        isActive:parseInt(isActive)===1?true:false,
      };

      props.handleSubmit(req_value);
    }
 
  }



  return (
    <Form  onSubmit={handleSubmission}>
        <Grid container>
      <Grid container item xs={6}>
        <Controls.Input
         name="userName"
         label="User Name"
         value={values.userName}
         onChange={handleInputChange} 
         error={errors.userName}
        required={true}
        />
  
      
   
      <Controls.Input
         name="password"
         label="Password"
         value={values.password}
         onChange={handleInputChange} 
         error={errors.password}
         type="password"
        
        />
 <Controls.Input
         name="confirmpassword"
         label="ConfirmPassword"
         value={values.confirmpassword}
         onChange={handleInputChange} 
         error={errors.confirmpassword}
         
         type="password"
        />
    </Grid>
    
      <Grid container item xs={6}> 

      <Controls.Input
         name="userEmail"
         label="Email"
         value={values.userEmail}
         onChange={handleInputChange} 
         error={errors.userEmail}
        required={true}
        />
  
  <div> 
    <div style={{ width: "175px", textAlign: "center", margin: "8px", height: "20px" }}>
              <label>Choose user Roles:</label>
            </div>
  
      <ul>
        {checkBoxInputs.map((role, index) => (
          <li key={index}>
            <input
              type="checkbox"
              id={role.value}
              name="userRole"
              value={role.value}
              // checked={role.value === CheckedValue}
              onChange={handleCheckboxChange}
            />
            <label htmlFor="text">
              {role.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
   <div className="row">
            
            <div
              className="col-sm-6"
              style={{ padding: "8px 16px", marginTop: "8px" }}
            >
              <label htmlFor="text" className="col-sm-5 col-form-label">
                IsActiv
              </label>
              {getSwitch(isActive, SetisActive)}
            </div>
          </div>
            </Grid>
      <div> 
              <Controls.Button
                type="submit"
                text="Add"       
              />
    
      </div>
      </Grid>
    </Form>
   
  );
};
export default UserForm;

