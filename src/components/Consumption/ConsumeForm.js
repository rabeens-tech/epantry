
import React from "react";
import { Grid } from "@material-ui/core";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";
import { right } from "@popperjs/core";
import { toast } from "react-toastify";
import Spinner from "../../utils/spinner";
import config from "../../utils/config";
import axios from 'axios';
import units from '../../utils/units'
// const initialFValues = {
//   id:"",
//   category_id:"",
//   name: "",
//   depletion_rate:"",
//   unit:"",
//   frequency:"",
// };


const frequency=[{
  "id":1,
"title":"Daily",

},
{
"id":2,
"title":"Weekly",

},
{
"id":3,
"title":"Monthly",

},
{
  "id":4,
  "title":"Yearly",

},

]
const ConsumeForm = (props) => {

  const [categories, setCategories] = React.useState()

  const _data = props.data || {};

  React.useEffect(()=>{
    load_inventory()
  },[])

  const load_inventory = () => {
    axios
    .get(`${config.APP_CONFIG}category/getall`)
    .then((res) => {
      if (res.status === 200) {
        let _data = res.data.map((_i, i)=>{
          return {
            id:_i["id"]|| i,
            title:_i["categoryName"] || i
          }
        })
        setCategories(_data)    
      } else if (res.status === 401) {
        // userSessionContext.handleLogout();
      } else if (res.status === 400) {
        toast.error(res.data);
        setCategories([]);
      }
    })
    .catch((err) => {
      toast.error("Something Went Wrong");
      setCategories([]);
    });
};
   



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
        categoryId: values.categoryId,
        name: values.name,
   frequency:values.frequency,
        depletion_rate:values.depletion_rate,
        unit:values.unit,
       
      };

      props.handleSubmit(req_value);
    }
 
  }

  if(categories == undefined){
    return <Spinner />
  }

  console.log(values)

  return (
    <Form  onSubmit={handleSubmission}>
        <Grid container>
      <Grid container item xs={6}>
      
        <Controls.Input
         name="name"
         label="Name"
         value={values.inventoryName}
         onChange={handleInputChange} 
          disabled={props.actionType&&props.actionType==="new"?false:true}
        required={props.actionType&&props.actionType==="new"?true:false}
        />
              <Controls.Select
            label="Consumption Frequency"
            name="frequency"
            value={values.consumptionType}
            onChange={handleInputChange}
            options={frequency}
        />
      </Grid>
      
      <Grid container item xs={6}> 
      <Controls.Input
          type="number"
         name="depletion_rate"     
         label="Avg Qty"
         value={values.consumptionRate || 0}
         onChange={handleInputChange} 
         required={true}
         
        
        />
      <Controls.Input
            label="unit"
            name="unit"
            value={values.unit}
            onChange={handleInputChange}
            options={units}
            required={props.actionType&&props.actionType==="new"?true:false}
            disabled={props.actionType&&props.actionType==="new"?false:true}
          />
     

      </Grid>
      <div style ={{alignItems:right}}>
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

