import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";
import axios from "axios";
import config from "../../utils/config";
import UserSessionContext from "../../contexts/UserSessionContext";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";

const initialFValues = {
  category_Id: "",
  name:"",
  description: "",
  product_image_location:"",
  quantity_measure_unit:"",

 
};
const qtyList=[
  {id:1,"name":"gram"},
  {id:2,"name":"kg"},
  {id:3,"name":"litre"},
  {id:4,"name":"ml"},
]
export default function InventoryCategoryForm(props) {
  const userSessionContext = React.useContext(UserSessionContext);

  const validate = (fieldValues=values) => {
    let temp = { ...errors }
    if ('name' in fieldValues)
    temp.name = fieldValues.name 
    ? fieldValues.name.length<61 
    ?fieldValues.name.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
    ? ""
      : "Invalid Data"
       :"Maximum 60 Characters"
    : "This field is required.";

    // if ('description' in fieldValues)
    // temp.description = fieldValues.description 
    // ?fieldValues.description.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
    // ? ""
    //   : "Invalid Data" 
    // : "This field is required.";
   if('category_id' in fieldValues){
      temp.category_id = fieldValues.category_id ? "" : "This field is required."
    }
    if('quantity_measure_unit' in fieldValues){
      temp.quantity_measure_unit = fieldValues.quantity_measure_unit ? "" : "This field is required."
    }
    setErrors({
      ...temp
    })
    if (fieldValues == values)
    return Object.values(temp).every(x => x == "")
  }
  const _data = props.data || initialFValues;
 
  const { values,  setValues, handleInputChange, ResetForm, errors,  setErrors } = useForm(_data, true, validate);
  const onInputChange = (_key, _value) => {
   
  
     setValues({ ...values, [_key]: _value });
   };
  const handleSubmission = (e) => {
    e.preventDefault();
    if (validate()) {
      let req_value = { 
        id: values.id,
        name:values.name,
        category_id: values.category_id,
        description: values.description,
        product_image_location:"nophoto",
       quantity_measure_unit: values.quantity_measure_unit,
      };

      props.handleSubmit(req_value);
      ResetForm();
    }
  };

  const [categoryList, setCategoryList] = useState();


 
  if (categoryList === undefined) {
    return <Spinner />;
  }

  return (
    <Form onSubmit={handleSubmission}>
    
      <Grid container>
        <Grid item xs={6}>
         <Controls.Select
            label="CategoryName"
            name="category_id"
            value={values.category_id}
            onChange={handleInputChange}
            options={categoryList}
            // error={errors.parentId}
            required={true}
          />

        <Controls.Input
            name="productName"
            label="Product Name"
            value={values.productName}
            onChange={handleInputChange}
            error={errors.productName}
            required={true}
          />
          
          <Controls.Input
            label="Description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
            required={true}
          />

        </Grid>
        <Grid item xs={6}>
       
 
          <Controls.Select
            label="Product Qty Unit"
            name="quantity_measure_unit"
            value={values.quantity_measure_unit}
            onChange={handleInputChange}
            options={qtyList}
        
            required={true}
          />
  <Controls.Input
            label="Product_image"
            name="product_image_location"
            value={values.product_image_location}
            onChange={handleInputChange}
           
          
          />

           
  </Grid>
  

        <div>
          {_data.id ? 
          <Controls.Button
          type="submit"
          text="Update"
       
        />
       
          : 
          <div>
        <Controls.Button
          type="submit"
          text="Submit"
       
        />
        <Controls.Button text="Reset" color="default" onClick={ResetForm} />
          </div>
          
          }
        </div>
      </Grid>
    </Form>
  );
}
