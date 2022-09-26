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
  categoryId: "",
  InventoryName:"",
  description: "",
  inventoryImgUrl:"",
  quantity:"",
  daysToDeplete:"",
  consumptionRate:"",
  consumptionType:"",
};
const qtyList=[
  {id:1,"name":"gram"},
  {id:2,"name":"kg"},
  {id:3,"name":"litre"},
  {id:4,"name":"ml"},
]
const categoryList=[
  {
    "id":1,
  "name":"MOMOS",
  "description":"mitho Momos",
},
{
  "id":2,
  "name":"pizza",
  "description":"mitho pizzass",
},
{
  "id":3,
  "name":"Coke",
  "description":"mitho Coke",
},
]


export default function InventoryCategoryForm(props) {
  const userSessionContext = React.useContext(UserSessionContext);

  const [categoryList, setCategoryList] = useState(categoryList);
  const validate = (fieldValues=values) => {
    let temp = { ...errors }
    if ('inventoryName' in fieldValues)
    temp.inventoryName = fieldValues.inventoryName 
    ? fieldValues.inventoryName.length<61 
    ?fieldValues.inventoryName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=.]+$/g)
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
   if('categoryId' in fieldValues){
      temp.categoryId = fieldValues.categoryId ? "" : "This field is required."
    }

    if('consumptionType' in fieldValues){
      temp.consumptionType = fieldValues.consumptionType ? "" : "This field is required."
    }
    setErrors({
      ...temp
    })
    if (fieldValues == values)
    return Object.values(temp).every(x => x == "")
  }
  const _data = props.data || initialFValues;
 
  const { values,  setValues, handleInputChange, ResetForm, errors,  setErrors } = useForm(_data, true, validate);

  const handleSubmission = (e) => {
    e.preventDefault();
    if (validate()) {
      let req_value = { 
        id: values.id,
        inventoryName:values.inventoryName,
        categoryId: values. categoryId,
        quantity: values.quantity,
        unit: values.unit,
        consumptionType:values.consumptionType,
        inventoryImgUrl:"http://placekitten.com/g/150/150"
      };

      props.handleSubmit(req_value);
      ResetForm();
    }
  };



 
  if (categoryList === undefined) {
    return <Spinner />;
  }

  return (
    <Form onSubmit={handleSubmission}>
    
      <Grid container>
        <Grid item xs={6}>
         <Controls.Select
            label="CategoryName"
            name="categoryId"
            value={values.categoryId}
            onChange={handleInputChange}
            options={categoryList}
            // error={errors.parentId}
            required={true}
          />

        <Controls.Input
            name="inventoryName"
            label="Product Name"
            value={values.inventoryName}
            onChange={handleInputChange}
            error={errors.inventoryName}
            required={true}
          />
        </Grid>
        <Grid item xs={6}>
       
        <Controls.Input
            label="Qty"
            name="quantity"
            value={values.quantity}
            onChange={handleInputChange}
            error={errors.description}
            required={true}
          />
          <Controls.Select
            label="Unit"
            name="unit"
            value={values.unit}
            onChange={handleInputChange}
            options={qtyList}
        
            required={true}
          />
          <Controls.Input
            label="Consumption Rate"
            name="consumptionRate"
            value={values.consumptionRate}
            onChange={handleInputChange}
           
          
          />
  <Controls.Input
            label="ConsumptionType"
            name="consumptionType"
            value={values.consumptionType}
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
