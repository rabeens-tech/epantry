
import React from "react";
import { useForm, Form } from "../../components/home/useForm";
import Controls from "../controls/Controls";
import axios from "axios";
import Spinner from '../../utils/spinner'
import { toast } from "react-toastify";
import config from "../../utils/config";
import Select from "react-select";
import {
  Button, Divider, Paper, Typography,
  IconButton,
  Tooltip,
  makeStyles,
  Theme, Grid,
} from "@material-ui/core";
import { PhotoCamera } from "@material-ui/icons";

import units from '../../utils/units'


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  faceImage: {
    color: theme.palette.primary.light,
  },
}));




const InventoryProductFormAdd = (props) => {
  const classes = useStyles();

  const _data = props.data || {};
  if(_data.unitName!==undefined){
    let defaultUnit = units.filter(x=>x["title"].toUpperCase() === (_data.unitName|| "").toUpperCase())
    if(defaultUnit.length > 0){
      _data.unitId = defaultUnit[0]["id"]
    }
  }

  const [allproducts, setAllproducts] = React.useState()
  const [Products, setProducts] = React.useState()
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [unit, setUnit] = React.useState({});
  const [inv, setInv] = React.useState([])
  const validate = (fieldValues = values) => {
    // return true
    let temp = { ...errors }
    if ('inventoryName' in fieldValues)
      temp.inventoryName = fieldValues.inventoryName
        ? fieldValues.inventoryName.length < 51
          ? fieldValues.inventoryName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=_-]+$/g)
            ? ""
            : "Invalid Data"
          : "maximum 50 Characters"
        : "This field is required."

    // if ('description' in fieldValues)
    //   temp.description = fieldValues.description
    //     ? fieldValues.description.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=.]+$/g)
    //       ? ""
    //       : "Invalid Data"
    //     : "This field is required."
    // if ('image' in fieldValues)
    //   temp.image = fieldValues.image
    //     ? fieldValues.image.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=._-]+$/g)
    //       ? ""
    //       : "Invalid Data"
    //     : "This field is required."
    setErrors({
      ...temp
    })
    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }


  React.useEffect(() => {
    load_product();
  }, []);

  const load_product = () => {
    axios.get(`${config.APP_CONFIG}inventory/getall`)
    .then((res) => {
  
      console.log(res)
      if (res.status === 200) {
        console.log(res.data)
setAllproducts(res.data);
         let _res= res.data.map((x,i)=>{
          return {
            value:x["id"],
            label:x["inventoryName"]
          }
        })
         console.log(_res);
        setProducts(_res)  ;  
      } else if (res.status === 401) {
        // userSessionContext.handleLogout();
      } else if (res.status === 400) {
        toast.error(res.data);
       // setRecords([]);
      }
    })
    .catch((err) => {
      toast.error("Something Went Wrong");
     // setRecords([]);
    });
  //setIsNewPopup(false);
};
  // const handleCapture = (e) => {
  //   setSelectedFile(e.target.files[0]);
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // };
  // const handleCapture1 = (e) => {
   
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // };


  const { values, handleInputChange, errors, setErrors } = useForm(_data, true, validate);

  const handleSubmission = e => {
    // alert("handle")
    let curr_unit = units.filter(x=> (x["id"] === values.unitId))
    ////let curr_category = allCat.filter(x=>x["id"]===values.category_id)
    //console.log(values, units, curr_unit)
    if(curr_unit.length===0){
      toast.error("Invalid Unit type selected ")
      return
    }
    // if(curr_category.length===0){
    //   toast.error("Invalid Product Category selected")
    //   return
    // }
    
    e.preventDefault()
    if (validate()) {
      let req_value = {
        id: values.id,
        inventoryAdded:"",
       // consumptionRate:values.consumptionRate,
        quantity:values.quantity,
        inventoryName:inv.label,
        // values.inventoryName,
       // description: values.description,
        //categoryId: values.categoryId,
      //  unitName: values.unitName,
      unitName: curr_unit[0]["title"],
        inventoryImgUrl: "http://placekitten.com/g/150/150",
      };
// console.log(req_value)
      props.handleSubmit(req_value);
    }
  }



  return (
    <Form onSubmit={handleSubmission}>
      <Grid container>
        <Grid container item xs={6}>
       
        <div style={{width: '388px'}}> 
       <Select
          type="text"
          placeholder={"Search product...."}
          options={Products}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
          value={inv}
          
          onChange={(e) => {
            setInv(e);
            console.log(e.value)
            let temp=allproducts.filter((x) => {return x.id === parseInt(e.value)})
            console.log(temp);
            setUnit(temp)
            console.log(unit)
          }}
        
        />
        </div>
        {/* <div>
          <span>{unit}</span>
        </div> */}
      
          <Controls.Input
           Readonly
            label="unit"
            value={unit}
           
            disabled={true}
          
          />
      
     
      {/* } */}
         {/* {_data.id ? (
          <Controls.Select
            label="unit"
            name="unitId"
            initialValue={{
              id:units.filter(x=>{

              })
            }}
            value={values.unitId}
            onChange={handleInputChange}
            options={units}
            disabled={true}
          />
          ):<Controls.Select
          label="unit"
          name="unitId"
          initialValue={{
            id:units.filter(x=>{

            })
          }}
          value={values.unitId}
          onChange={handleInputChange}
          options={units}
          disabled={true}
        />} */}
        
        </Grid>

        <Grid container item xs={6}>
        <Controls.Input
            type="number"
            name="quantity"
            label="Quantity"
            value={values.quantity}
            onChange={handleInputChange}
            required={true}
          />
        </Grid>


        <div style={{ width: "100%", textAlign: "right" }}>
          {_data.id ? (
            <Controls.Button
              type="submit"
              text="Update"
            />
          ) :
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
export default InventoryProductFormAdd;

