
import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";

const initialFValues = {
  
  name: "",
  description:"",
};

const CategoryForm = (props) => {

  const _data = props.data || initialFValues;

  const validate = (fieldValues=values) => {
    let temp = { ...errors }
    if ('name' in fieldValues)
    temp.name = fieldValues.name
    ?fieldValues.name.length<16
    ?fieldValues.name.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
      ? ""
        : "Invalid Data" 
       :"maximum 16 Characters"
    : "This field is required."

    if ('description' in fieldValues)
    temp.description = fieldValues.description 
    ?fieldValues.description.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
    ? ""
      : "Invalid Data" 
    : "This field is required."
    setErrors({
      ...temp
    })
    if (fieldValues == values)
    return Object.values(temp).every(x => x == "")
  }
  const { values, handleInputChange, errors, setErrors } =useForm(_data,true,validate);
  
  const handleSubmission = e => {
    e.preventDefault()
    if (validate()) {
      let req_value = {
        id:values.id,
        name: values.name,
        description:values.description
      };

      props.handleSubmit(req_value);
    }
 
  }



  return (
    <Form  onSubmit={handleSubmission}>
        <Grid container>
      <Grid container item xs={6}>
        <Controls.Input
         name="name"
         label="Name"
         value={values.name}
         onChange={handleInputChange} 
         error={errors.name}
        required={true}
        />
      </Grid>
      
      <Grid container item xs={6}> 
      <Controls.Input
         name="description"
         multiline
         row={5}
         label="Description"
         value={values.description}
         onChange={handleInputChange} 
         error={errors.description}
         
        
        />

      </Grid>
      <div>
      {_data.id ? (
            <Controls.Button
              type="submit" 
              text="Update" 
            />
          ):
          (
              <Controls.Button
                type="submit"
                text="Add"       
              />
      )}
      </div>
      </Grid>
    </Form>
   
  );
};
export default CategoryForm;

