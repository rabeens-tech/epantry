
import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";

const initialFValues = {
  category_id:"",
  name: "",
  description:"",
  unit:"",
  image:""
};
const category=[
    {
      "id":1,
    "title":"MOMOS",
    "description":"mitho Momos",
  },
  {
    "id":2,
    "title":"pizza",
    "description":"mitho pizzass",
  },
  {
    "id":3,
    "title":"Coke",
    "description":"mitho Coke",
  },
]

const units=[
    {
      "id":1,
    "title":"kg",
    
  },
  {
    "id":2,
    "title":"gram",
   
  },
  {
    "id":3,
    "title":"ml",
 
  },
  {
    "id":4,
  "title":"litre",
  
},
{
  "id":5,
  "title":"piece",
 
},
{
  "id":6,
  "title":"packet",

},
]

const ProductForm = (props) => {

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

    if ('description' in fieldValues)
    temp.description = fieldValues.description 
    ?fieldValues.description.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=.]+$/g)
    ? ""
      : "Invalid Data" 
    : "This field is required."
    if ('image' in fieldValues)
    temp.image = fieldValues.image 
    ?fieldValues.image.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
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
        description:values.description,
        category_id:values.category_id,
        unit:values.unit,
        image:"local",
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
            options={category}
           
          />
        <Controls.Input
         name="name"
         label="Name"
         value={values.name}
         onChange={handleInputChange} 
      
        required={true}
        />
              <Controls.Input
         name="description"
         multiline
         row={5}
         label="Description"
         value={values.description}
         onChange={handleInputChange} 
   
         
        
        />
      </Grid>
      
      <Grid container item xs={6}> 
      <Controls.Select
            label="unit"
            name="unit"
            value={values.unit}
            onChange={handleInputChange}
            options={units}
           
          />
      <Controls.Input
         name="image"
       
         label="Image"
         value={values.image}
         onChange={handleInputChange} 
  
         
        
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
export default ProductForm;

