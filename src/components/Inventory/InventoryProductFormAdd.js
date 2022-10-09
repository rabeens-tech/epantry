
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
 

  const [allproducts, setAllproducts] = React.useState()
  const [Products, setProducts] = React.useState()
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [unit, setUnit] = React.useState({});
  const [inv, setInv] = React.useState();
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
        setProducts(_res) ;  
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
    e.preventDefault()
    if (validate()) {
      let req_value = {
        id: values.id,
        inventoryAdded:"",
      
        quantity:values.quantity,
       
      
      //unitName: curr_unit[0]["title"],
        inventoryImgUrl: "http://placekitten.com/g/150/150",
      };

      props.handleSubmit(req_value);
    }
  }



  return (
    <Form onSubmit={handleSubmission}>
      <Grid container>
        <Grid container item xs={8}>
       
        <div style={{width: '469px'}}> 
       <Select
          type="text"
          placeholder={"Search product...."}
          options={Products}
          styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
          menuPortalTarget={document.body}
          value={inv}
          
          onChange={(e) => {
          setInv(e.value)
          }}
        
        />
         </div>
         {inv?
        <div style={{paddingTop:"20px",width: '502px'}}>
        <Controls.Input
            type="number"
            name="quantity"
            label="Quantity"
            value={values.quantity}
            onChange={handleInputChange}
            required={true}
          />
        </div>
         
         :null}
         
        </Grid>

        <Grid container item xs={3}>
        {inv?
        <div>
          <span>{"value"}</span>
        </div> 
        :null}
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

