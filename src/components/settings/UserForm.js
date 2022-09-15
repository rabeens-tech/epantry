
import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";

const initialFValues = {
  
  username: "",
  password:"",
  confirmpassword:"",
  is_admin:0,
  active:0,
};

const UserForm = (props) => {

  const _data = props.data || initialFValues;
  //const [isVendor, setIsVendor] = useState(0);

 // const [isCustomer, setIsCustomer] = useState(0);

  const validate = (fieldValues=values) => {
    let temp = { ...errors }
    if ('username' in fieldValues)
    temp.username = fieldValues.username
    ?fieldValues.username.length<31
    ?fieldValues.username.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
      ? ""
        : "Invalid Data" 
       :"maximum 30 Characters"
    : "This field is required."

    if ('password' in fieldValues)
    temp.password = fieldValues.password
    ?fieldValues.password.length>5
    ?fieldValues.password.match(/^[a-zA-Z0-9 !\$%\^\&\)\(+=._]+$/g)
      ? ""
        : "Invalid Data" 
       :"minimun 6 Characters"
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
          label={label}
        />
      </FormGroup>
    );
  };
  
  const handleSubmission = e => {
    e.preventDefault()
    if (validate()) {
      let req_value = {
        id:values.id,
        name: values.name,
        password:values.password,
        is_admin:1,
        active:0,
      };

      props.handleSubmit(req_value);
    }
 
  }



  return (
    <Form  onSubmit={handleSubmission}>
        <Grid container>
      <Grid container item xs={6}>
        <Controls.Input
         name="username"
         label="Name"
         value={values.username}
         onChange={handleInputChange} 
         error={errors.username}
        required={true}
        />
      </Grid>
      
      <Grid container item xs={6}> 
      <Controls.Input
         name="password"
    
         label="Password"
         value={values.password}
         onChange={handleInputChange} 
         error={errors.password}
         
        
        />
 <Controls.Input
         name="confirmpassword"
    
         label="Password"
         value={values.confirmpassword}
         onChange={handleInputChange} 
         error={errors.confirmpassword}
         
        
        />

      </Grid>
      <Grid item xs={5}>
      {getSwitch(values.is_admin, handleInputChange, "Is Admin")}
            </Grid>
            <Grid item xs={5}>
              {getSwitch(values.active, handleInputChange, "Is Active")}
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

