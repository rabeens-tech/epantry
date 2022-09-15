
import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";

const initialFValues = {
  category_id:"",
  name: "",
  depletion_rate:"",
  unit:"",
  frequency:"",
};
const category=[
    {
      "id":1,
    "name":"MOMOS",
   
  },
  {
    "id":2,
    "name":"pizza",
   
  },
  {
    "id":3,
    "name":"Coke",
  
  },
]

const units=[
    {
      "id":1,
    "name":"kg",
    
  },
  {
    "id":2,
    "name":"gram",
   
  },
  {
    "id":3,
    "name":"ml",
 
  },
  {
    "id":4,
  "name":"litre",
  
},
{
  "id":5,
  "name":"piece",
 
},
{
  "id":6,
  "name":"packet",

},
]
const ConsumeForm = (props) => {

  const _data = props.data || initialFValues;

  const validate = (fieldValues=values) => {
    let temp = { ...errors }
    if ('name' in fieldValues)
    temp.name = fieldValues.name
    ?fieldValues.name.length<26
    ?fieldValues.name.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=_-]+$/g)
      ? ""
        : "Invalid Data" 
       :"maximum 25 Characters"
    : "This field is required."

    if ('frequency' in fieldValues)
    temp.frequency = fieldValues.frequency 
    ?fieldValues.frequency.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=.]+$/g)
    ? ""
      : "Invalid Data" 
    : "This field is required."
    if ('depletion_rate' in fieldValues)
    temp.depletion_rate = fieldValues.depletion_rate 
    ?fieldValues.depletion_rate.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=]+$/g)
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
        category_id: values.category_id,
        name: values.name,
   frequency:values.frequency,
        depletion_rate:values.depletion_rate,
        unit:values.unit,
       
      };

      props.handleSubmit(req_value);
    }
 
  }



  return (
    <Form  onSubmit={handleSubmission}>
        <Grid container>
      <Grid container item xs={6}>
      <Controls.Select
            label="CategoryName"
            name="category_id"
            value={values.category_id}
            onChange={handleInputChange}
            options={loadCategory}
           
          />
        <Controls.Input
         name="name"
         label="Name"
         value={values.name}
         onChange={handleInputChange} 
      
        required={true}
        />
              <Controls.Input
         name="frequency"
        
         label="Frequency"
         value={values.frequency}
         onChange={handleInputChange} 
         required={true}
   
         
        
        />
      </Grid>
      
      <Grid container item xs={6}> 
      <Controls.Input
         name="depletion_rate"
       
         label="Avg Qty"
         value={values.depletion_rate}
         onChange={handleInputChange} 
         required={true}
         
        
        />
      <Controls.Select
            label="unit"
            name="unit"
            value={values.unit}
            onChange={handleInputChange}
            options={units}
            required={true}
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
export default ConsumeForm;

