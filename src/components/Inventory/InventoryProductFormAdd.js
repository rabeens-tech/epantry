
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
  console.log(_data)
  const [allProducts, setAllproducts] = React.useState()
  
  const [product, setProduct] = React.useState(()=>{
    if(_data === undefined){
      return
    }
    if(Object.keys(_data).length === 0){
      return
    }
    return {
      value:_data.inventory.id,
      label:_data.inventory.inventoryName

    }
  })
  // const [selectedFile, setSelectedFile] = React.useState(null);
  // const [unit, setUnit] = React.useState({});
  // const [inv, setInv] = React.useState([])
 


  React.useEffect(() => {
    load_product();
  }, []);

  const load_product = () => {
    axios.get(`${config.APP_CONFIG}inventory/getall`)
    .then((res) => {
  
      // console.log(res)
      if (res.status === 200) {
        // console.log(res.data)
        setAllproducts(res.data);
         
         // console.log(_res);
        // setProducts(_res)  ;  
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
  const validate = (fieldValues = values) => {
    // return true
    let temp = { ...errors }
    if ('inventoryName' in fieldValues)
      temp.inventoryName = fieldValues.inventoryName
        ? fieldValues.inventoryName.length < 51
          ? fieldValues.inventoryName.match(/^[a-zA-Z0-9 !@#\$%\^\&*\)\(+=]+$/g)
            ? ""
            : "Invalid Data"
          : "maximum 50 Characters"
        : "This field is required."
        if ('newAdded' in fieldValues)
        temp.newAdded = fieldValues.newAdded?"" : "This field is required."
    setErrors({
      ...temp
    })
    if (fieldValues == values)
      return Object.values(temp).every(x => x == "")
  }


  
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
    console.log(product)
    e.preventDefault()
    if (validate()) {
      let req_value = {
        inventoryId: product.value,
        newAdded:values.newAdded,
       
      
      //unitName: curr_unit[0]["title"],
        //inventoryImgUrl: "http://placekitten.com/g/150/150",
      };

      props.handleSubmit(req_value);
    }
  }


  if(allProducts==undefined){
    return <Spinner />
  }


  return (
    <Form onSubmit={handleSubmission}>
      <Grid container>
        <Grid container xs={8}>
       
        <div style={{width: '469px'}}> 
       <Select
          type="text"
          placeholder={"Search product...."}
          options={allProducts.map((x,i)=>{
              return {
                value:x["inventoryId"],
                label:x["inventoryName"]
              }
            })
          }
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
          value={product}
          
          onChange={(e) => {
            // console.log(e)
            setProduct(e)
          }}
        
        />
        </div>
      
        <div style={{
          width:"500px",paddingTop:'20px'
        }}>
           {product!==undefined?
        <Controls.Input
         
          type="number"
          name="newAdded"
          label="Quantity"
          value={values.newAdded}
          onChange={handleInputChange}
          required={true}
        />
        :null
      }
      </div>
        </Grid>

        
        <Grid container item xs={4}>
          {
            product!==undefined?
          
            <div>
              <span>Unit Name :{allProducts.filter(x=>(x["inventoryId"]===product["value"]) )[0]["unitName"] || "--"}</span>
            </div>
            :null
          }
        </Grid>

        <div style={{ width: "90%", textAlign: "left" }}>
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

